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