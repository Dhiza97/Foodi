const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080
require('dotenv').config()

// Middleware
app.use(cors())
app.use(express.json())

// Mongodb config
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-cluster.c9d435w.mongodb.net/?retryWrites=true&w=majority&appName=foodi-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    // Database & Collections
    const menuCollections = client.db("foodi-client").collection("menus")
    const cartCollections = client.db("foodi-client").collection("cartItems")

    // All menu items operations
    app.get('/menu', async(req, res) => {
      const result = await menuCollections.find().toArray()
      res.json(result)
    })

    // All cart operations

    // Posting cart to db
    app.post('/carts', async(req, res) => {
      const cartItem = req.body
      const result = await cartCollections.insertOne(cartItem)
      res.send(result)
    })

    // Get carts using email
    app.get('/carts', async(req, res) => {
      const email = req.query.email
      const filter = {email: email}
      const result = await cartCollections.find(filter).toArray()
      res.send(result)
    })

    // Get specific cart
    app.get('/carts/:id', async(req, res) => {
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await cartCollections.findOne(filter)
      res.send(result)
    })

    // Delete items from cart
    app.delete('/carts/:id', async(req, res) => {
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await cartCollections.deleteOne(filter)
      res.send(result)
    })

    // Update cart quantity
    app.put('/carts/:id', async(req, res) => {
      const id = req.params.id
      const {quantity} = req.body
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}

      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10)
        },
      }
      const result = await cartCollections.updateOne(filter, updateDoc, options)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})