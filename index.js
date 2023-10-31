import express from 'express';
import cors from 'cors';
import {
    MongoClient,
    ServerApiVersion
} from 'mongodb';
import dotenv from 'dotenv';

const app = express()
const port = process.env.PORT || 5001

// middleware
app.use(cors())
app.use(express.json())
dotenv.config()

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
        // await client.connect();

        await client.db("admin").command({
            ping: 1
        });
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