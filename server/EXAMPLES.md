# Examples

The URI that will be used as an example is http://localhost:3333

## Curl

### Classes

#### Create a new class
```bash
curl http://localhost:3333/classes -H 'Content-Type: application/json' -d '{
  "name": "Kazordoon", 
  "avatar": "https://avatars2.githubusercontent.com/u/43660078?s=460&u=841b6026562690915d9726a90cd79e0edb9c9c9b&v=4",
  "whatsapp": "+55 (21) 9 8002-8922",
  "bio": "Oi meu chapa",
  "subject": "math",
  "cost": 80,
  "schedule": [
    {
      "week_day": 1,
      "from": "08:00",
      "to": "19:00"
    }
  ]
}'
```

**Output**: There's not any output.

#### Get the classes by filtering
```bash
curl 'http://localhost:3333/classes?week_day=1&subject=math&time=08:00'
```

Output: 
```JSON
[{"id":1,"user_id":1,"subject":"math","cost":"80.00","created_at":"2020-08-19T19:59:02.727Z","updated_at":"2020-08-19T19:59:02.734Z","name":"Kazordoon","avatar":"https://avatars2.githubusercontent.com/u/43660078?s=460&u=841b6026562690915d9726a90cd79e0edb9c9c9b&v=4","whatsapp":"+55 (21) 9 8002-8922","bio":"Oi meu chapa"}]
```

### Connections

#### Create a new connection
```bash
curl http://localhost:3333/connections -H 'Content-Type: application/json' -d '{ "user_id": 1 }'
```

**Output**: There's not any output.

#### Get the total connections
```bash
curl 'http://localhost:3333/connections'
```

**Output**:
```JSON
{"total":1}
```

