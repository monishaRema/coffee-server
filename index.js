const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@remadb.w7lg8gq.mongodb.net/?retryWrites=true&w=majority&appName=remaDb`;

let cachedClient = null;

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri);
      await cachedClient.connect();
    }
    const db = cachedClient.db('coffeeDB');
    const coffees = await db.collection('coffee').find().toArray();
    res.status(200).json(coffees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

module.exports = handler;
