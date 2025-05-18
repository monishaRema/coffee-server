const { MongoClient, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@remadb.w7lg8gq.mongodb.net/?retryWrites=true&w=majority&appName=remaDb`;

let cachedClient = null;

async function handler(req, res) {
  const id = req.query.id;

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri);
      await cachedClient.connect();
    }
    const db = cachedClient.db('coffeeDB');
    const collection = db.collection('coffee');

    if (req.method === 'GET') {
      const result = await collection.findOne({ _id: new ObjectId(id) });
      res.status(200).json(result);
    } else if (req.method === 'DELETE') {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json(result);
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
}

module.exports = handler;
