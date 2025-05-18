const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://espresso:BiSpGYHxThM75Yg3@remadb.w7lg8gq.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

let coffeeCollection;

async function run() {
  try {
    console.log("🔌 Attempting to connect to MongoDB...");
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    coffeeCollection = client.db('coffeeDB').collection('coffee');

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

run();

// Only one root route — report connection status
app.get('/', (req, res) => {
  if (coffeeCollection) {
    res.send('✅ MongoDB is connected, and API is running');
  } else {
    res.send('❌ MongoDB is NOT connected');
  }
});

app.get('/coffees', async (req, res) => {
  try {
    const result = await coffeeCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch coffees", detail: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
