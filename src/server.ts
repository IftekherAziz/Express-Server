import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Aziz!')
})

app.listen(port, () => {
  console.log(`This app is running on port ${port}`)
})