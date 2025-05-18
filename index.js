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
        app.get('/c',(req, res)=> {
        res.send(' i am from try block')
    })
    await client.connect();
    app.get('/',(req, res)=> {
        res.send(' i am from  after connection')
    })

    const coffeeCollection = client.db('coffeeDB').collection('coffee')


    app.get('/coffees',async(req,res)=>{
      const result = await coffeeCollection.find().toArray();
      res.send(result)
    })
    
    app.get('/coffees/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await coffeeCollection.findOne(query);
      res.send(result)
    })

    app.delete('/coffees/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await coffeeCollection.deleteOne(query)
      res.send(result)
    })
    
  } 
  finally {
  }
  app.get('/coffeee',(req, res)=> {
      res.send('Coffee is extreamly hot')
})


}
run().catch(  app.get('/',(req, res)=> {
      res.send('I am from catch block')
}));





app.get('/', (req, res)=> {
  res.send('Coffee is getting hotter')
})



app.listen(port, () => {
  console.log("server is running");
});
