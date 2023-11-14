import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

const client = new MongoClient(process.env.MONGO_URI as string)
const db = client.db('recipe-app')
const coll = db.collection('Recipes')


app.listen(PORT , () => console.log('Database listening on port', PORT))

app.get('/', (req, res) => {
  res.json('Here is my API responding')
})

app.patch('/:_id', async (req, res) => {
  const cleanId = new ObjectId(req.params._id)
  const updatedRecipe = await coll.findOneAndUpdate( {_id: cleanId}, {$set: req.body})
  res.send(updatedRecipe)
})