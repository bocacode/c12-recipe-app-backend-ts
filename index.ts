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
const recipe = db.collection('Recipes')
const users = db.collection('Users')


app.listen(PORT , () => console.log('Database listening on port', PORT))

app.get('/', (req, res) => {
  res.json('Here is my API responding')
})

//signup
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const newUser = await users.insertOne( { firstName: firstName, lastName: lastName, email: email, password: password })
  res.status(201).send(newUser)
})

//update recipe
app.patch('/:_id', async (req, res) => {
  const cleanId = new ObjectId(req.params._id)
  const updatedRecipe = await recipe.findOneAndUpdate( {_id: cleanId}, {$set: req.body})
  res.send(updatedRecipe)
})