import test from 'japa'
import request from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Classes', () => {
  const defaultClassQueryParams = {
    week_day: 1,
    subject: 'Default subject',
    time: '00:00',
  }

  const defaultClassBodyParams = {
    name: 'Default Name',
    avatar: 'Default avatar',
    whatsapp: '+5521999999999',
    bio: 'Default biography',
    subject: 'Default subject',
    cost: 301,
    schedule: [
      {
        week_day: 1,
        from: '00:00',
        to: '12:00',
      },
    ],
  }

  test.group('GET /classes', () => {
    test('should get the classes by filtering', async () => {
      await request(BASE_URL)
        .get('/classes')
        .query(defaultClassQueryParams)
        .expect(200)
    })

    test('should return the status code 400 when the data input validation fails', async () => {
      const invalidClassQueryParams = {
        week_day: 'Invalid week_day',
        subject: 0,
        time: 0,
      }
      await request(BASE_URL)
        .get('/classes')
        .query(invalidClassQueryParams)
        .expect(400)
    })
  })

  test.group('POST /classes', () => {
    test('should create a new class and return the status code 201', async () => {
      await request(BASE_URL)
        .post('/classes')
        .send(defaultClassBodyParams)
        .expect(201)
    })

    test('should return the status code 422 when an invalid schedule is provided', async () => {
      const invalidSchedule = {
        week_day: 1,
        from: 'Invalid from',
        to: 'Invalid to',
      }
      await request(BASE_URL)
        .post('/classes')
        .query({
          ...defaultClassBodyParams,
          schedule: invalidSchedule,
        })
        .expect(422)
    })
  })
})
