import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Class from 'App/Models/Class'
import ClassValidator from 'App/Validators/ClassValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import ClassSchedule from 'App/Models/ClassSchedule'

const convertHoursToMinute = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  const timeInMinutes = hours * 60 + minutes
  return timeInMinutes
}

export default class ClassesController {
  public async index ({ response, request }: HttpContextContract) {
    try {
      const data = await request.only([
        'week_day',
        'subject',
        'time',
      ])
      const weekDay = data.week_day as string
      const subject = data.subject as string
      const time = data.time as string

      const hasMissingFilters = !weekDay || !subject || !time
      if (hasMissingFilters) {
        return response.status(406).json({
          error: 'Missing filter to search the classes.',
        })
      }

      const timeInMinutes = convertHoursToMinute(time)

      const classes = await Database.query()
        .select(['classes.*', 'users.*'])
        .from('classes')
        .where('classes.subject', '=', subject)
        .whereExists((db) => {
          db.select('classes_schedules.*')
            .from('classes_schedules')
            .whereRaw('classes_schedules.class_id = classes.id')
            .whereRaw('classes_schedules.week_day = ??', [Number(weekDay)])
            .whereRaw('classes_schedules.from <= ??', [timeInMinutes])
            .whereRaw('classes_schedules.to > ??', [timeInMinutes])
        })
        .join('users', 'classes.user_id', '=', 'users.id')

      return classes
    } catch (err) {
      return response.status(400).json({
        error: 'Unexpected error while listing the classes.',
      })
    }
  }

  public async store ({ response, request }: HttpContextContract) {
    const trx = await Database.transaction()
    try {
      const data = await request.validate(ClassValidator)

      const { name, avatar, whatsapp, bio, subject, cost, schedule } = data

      const user = new User()
      user.name = name
      user.avatar = avatar
      user.whatsapp = whatsapp
      user.bio = bio
      user.useTransaction(trx)
      await user.save()

      const lesson = new Class()
      lesson.subject = subject
      lesson.cost = cost
      lesson.userId = user.id
      lesson.useTransaction(trx)
      await lesson.save()

      const mappedSchedules = schedule.map(async (scheduleItem) => {
        const from = convertHoursToMinute(scheduleItem.from)
        const to = convertHoursToMinute(scheduleItem.to)

        const classSchedule = new ClassSchedule()
        classSchedule.classId = lesson.id
        classSchedule.weekDay = scheduleItem.week_day
        classSchedule.from = from
        classSchedule.to = to
        classSchedule.useTransaction(trx)
        await classSchedule.save()
      })

      await Promise.all(mappedSchedules)

      await trx.commit()

      return response.status(201).send('')
    } catch (err) {
      await trx.rollback()
      return response.status(422).json({
        error: 'Unexpected error while creating a new class.',
      })
    }
  }
}
