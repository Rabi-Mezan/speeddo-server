const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId


app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.krqaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




async function run() {

    try {
        client.connect();

        const database = client.db('speeddo')
        const bikeCollection = database.collection('bikes');
        const ordersCollection = database.collection('orders')


        // get bikes a[i]
        app.get('/bikes', async (req, res) => {
            const result = await bikeCollection.find({}).toArray()
            res.send(result)
        })

        // get bike details api

        app.get('/details/:id', async (req, res) => {

            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await bikeCollection.findOne(query)
            res.send(result)
        })

        // orders post api
        app.post('/orders', async (req, res) => {
            const data = req.body;
            const result = await ordersCollection.insertOne(data)
            console.log(result);
            res.send(result)

        })


    }
    finally {

    }

}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello fron speeddo server!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})