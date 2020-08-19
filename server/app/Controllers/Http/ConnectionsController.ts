import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConnectionValidator from 'App/Validators/ConnectionValidator'
import Connection from 'App/Models/Connection'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ConnectionsController {
  public async index ({ response }: HttpContextContract) {
    try {
      const [connectionsCount] = await Database.query()
        .count('* as total')
        .from('connections')

      const { total } = connectionsCount

      return { total: Number(total) }
    } catch (err) {
      return response.status(500).json({
        error: 'Unexpected error while listing the connections.',
      })
    }
  }

  public async store ({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(ConnectionValidator)

      await Connection.create({ userId: data.user_id })

      return response.status(201).send('')
    } catch (err) {
      return response.status(422).json({
        error: 'Unexpected error while creating a new connection.',
      })
    }
  }
}
