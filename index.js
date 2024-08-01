require("dotenv").config()
const express =require("express");
const app=express();
const cors=require("cors");
const port=process.env.PORT || 4000

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://biswadebraj50:<password>@cluster0.gkua5x0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri="mongodb://localhost:27017";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database=client.db("UserData");
    const UserCollection=database.collection("user")

    app.post("/user", async(req, res)=>{
      const query= req.body;
      const result= await UserCollection.insertOne(query);
      res.send(result);
    })
    
    
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
 
    



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.get("/",(req, res)=>{
    res.send("welcome to express")
})

app.listen(port,()=>{
    console.log(`Server is running  http://localhost:${port}`)
})