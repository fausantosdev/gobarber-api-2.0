import express from 'express'

const app = express()

app.get('/', (request, response): any => {
  return response.json({ message: 'Hello World' })
})

app.listen(3333, () => {
  console.log(`~ server running on port ${3333}`)
})
