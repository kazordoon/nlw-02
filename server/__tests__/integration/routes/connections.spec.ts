import test from 'japa'
import request from 'supertest'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Connections', () => {
  const defaultUserId = 199
  const defaultConnectionBodyParams = {
    user_id: defaultUserId,
  }

  const defaultUser = {
    id: defaultUserId,
    name: 'Default Name',
    avatar: 'Default avatar',
    whatsapp: '+5521999999999',
    bio: 'Default biography',
  }

  test.group('GET /connections', () => {
    test('should the connections page exists', async (assert) => {
      const { body } = await request(BASE_URL).get('/connections').expect(200)

      assert.isDefined(body.total)
    })

    test('should return the status code 500 when the database is down', async () => {
      await Database.manager.close('pg')
      const databaseState = Database.manager.get('pg')?.state

      let intervalWhileDatabaseIsNotClosed = setInterval(async () => {
        if (databaseState === 'closed') {
          await request(BASE_URL).get('/connections').expect(500)
          clearInterval(intervalWhileDatabaseIsNotClosed)
        }
      }, 100)

      await Database.manager.connect('pg')
    })
  })

  test.group('POST /connections', () => {
    test('should create a new connection and return the status code 201', async () => {
      await User.create(defaultUser)
      await request(BASE_URL)
        .post('/connections')
        .send(defaultConnectionBodyParams)
        .expect(201)
    })

    test('should return the status code 422 when the data input validation fails', async () => {
      await request(BASE_URL)
        .post('/connections')
        .expect(422)
    })

    test('should return the status code 422 when an invalid user_id is provided', async () => {
      const invalidUserId = 'Invalid user ID'
      await request(BASE_URL)
        .post('/connections')
        .send({
          user_id: invalidUserId,
        })
        .expect(422)
    })
  })
})
