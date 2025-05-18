const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://espresso:BiSpGYHxThM75Yg3@remadb.w7lg8gq.mongodb.net/?retryWrites=true&w=majority&appName=remaDb`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



async function run() {
  try {
        app.get('/',(req, res)=> {
        res.send('Coffee is extreamly hot')
    })
    await client.connect();
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


}
run().catch(console.dir);





app.get('/', (req, res)=> {
  res.send('Coffee is getting hotter')
})

app.get('/coffeee',(req, res)=> {
      res.send('Coffee is extreamly hot')
})

app.listen(port, () => {
  console.log("server is running");
});
