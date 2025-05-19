const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@remadb.w7lg8gq.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const coffeeCollection = client.db("coffeeDB").collection("coffee");

    app.get("/coffees", async (req, res) => {
      const result = coffeeCollection.find().toArray();
      res.send(result);
      console.log(result);
    });
  } finally {

  }
}

run();

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
