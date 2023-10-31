import express from 'express';
const app = express()
import cors from 'cors';
import {
    MongoClient,
    ObjectId,
    ServerApiVersion
} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config()

const port = process.env.PORT || 5001

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oibe727.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // >====> collections <====<
        const servicesCollection = client.db('carDoctor').collection('services')
        const ordersCollection = client.db('carDoctor').collection('orders')


        // >====> get many services <====<
        app.get('/services', async (req, res) => {
            const result = await servicesCollection.find().toArray()
            res.send(result)
        })


        // >====> get many orders <====<
        app.get('/orders', async (req, res) => {
            const result = await ordersCollection.find().toArray()
            res.send(result)
        })


        // >====> post one orders <====<
        app.post('/orders', async (req, res) => {
            const newOrder = req.body
            const result = await ordersCollection.insertOne(newOrder)
            res.send(result)
        })


        // >====> patch one orders <====<
        app.patch('/orders/:id', async (req, res) => {
            const id = req.params.id
            const updatedOrder = req.body
            const filter = {
                _id: new ObjectId(id)
            }
            const updateItems = {}
            const result = await ordersCollection.updateOne(filter, updateItems)
            res.send(result)
        })


        // >====> delete one order <====<
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id
            const filter = {
                _id: new ObjectId(id)
            }
            const result = await ordersCollection.deleteOne(filter)
            res.send(result)

        })

        // >====> delete many orders <====<
        app.delete('/orders', async (req, res) => {
            const result = await ordersCollection.deleteMany()
            res.send(result)

        })

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {}
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('car-doctor server is running')
})

app.listen(port, () => {
    console.log('car doctor running on port', port);
})