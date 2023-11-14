import express from 'express'
import cors from 'cors'
import { Db, MongoClient } from 'mongodb'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI as string)
const db = client.db('recipe-app')
const recipes = db.collection('recipes')

client.connect()
console.log('connected to Mongo')


const PORT = process.env.PORT

app.listen(PORT , () => console.log('Database listening on port', PORT))

// 7. Implement getAllRecipes......
app.get('/',async (req, res) => {
  const AllRecipes = await recipes.find().toArray()
  res.send(AllRecipes)
})