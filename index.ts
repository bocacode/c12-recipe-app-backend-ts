import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT , () => console.log('Database listening on port', PORT))

app.get('/', (req, res) => {
  res.json('Here is my API responding')
})