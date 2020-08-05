import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'

export default class ClassSchedule extends BaseModel {
  public static table = 'classes_schedules'

  @column({ isPrimary: true })
  public id: number

  @column()
  public classId: number

  @column()
  public weekDay: number

  @column()
  public from: number

  @column()
  public to: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Class)
  public 'class': BelongsTo<typeof Class>
}

