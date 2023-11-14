import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'


const client = new MongoClient(process.env.MONGO_URI as string)
const db = client.db('recipe-app')
const app = express()
const recipe = db.collection('recipe')

client.connect()
// const PORT = process.env.PORT


app.use(express.json())
app.use(cors())
app.listen(process.env.PORT, () => console.log('Database listening on port',))

app.get('/', (req, res) => {
  res.json('Here is my API responding')
})