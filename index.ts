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


// implement delete route 
const client = new MongoClient(process.env.MONGO_URI as string)
const db = client.db('recipe-app')
const recipe = db.collection('recipes')

app.delete('/:_id', async (req, res) => {
  const cleanId = new Object (req.params._id)
  console.log('req.params->', req.params)
  const recipeDeleted = await recipe.findOneAndDelete({ _id: cleanId })
  res.send(recipeDeleted)
})