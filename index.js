const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



const user = encodeURIComponent(process.env.DB_USER);
const pass = encodeURIComponent(process.env.DB_PASS);
const uri = `mongodb+srv://${user}:${pass}@remadb.w7lg8gq.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected successfully!");

    // Routes after successful connection
    app.get('/', (req, res) => {
      res.send('Connected to MongoDB!');
    });

    const coffeeCollection = client.db('coffeeDB').collection('coffee');

    app.get('/coffees', async (req, res) => {
      const result = await coffeeCollection.find().toArray();
      res.send(result);
    });

    // ... rest of routes

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
run()





app.get('/', (req, res)=> {
  res.send('Coffee is getting hotter')
})



app.listen(port, () => {
  console.log("server is running");
});
