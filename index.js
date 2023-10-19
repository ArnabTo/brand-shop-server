const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const port = process.env.PORT || 5003;

//middleware
app.use(cors());
app.use(express.json());


//brandshopuser
//dPOdP2k0uTgMQVLu


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hiylnp2.mongodb.net/?retryWrites=true&w=majority`;

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

    const productCollection = client.db('productDB').collection('products');
    const brandCollection = client.db('brandDB').collection('brandcollection');
    const cartProduct = [];
    app.get('/storedItem', async(req, res)=>{
        const cursor = brandCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    app.post('/products', async(req, res)=>{
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct);
        res.send(result)  
    })
    app.get('/products', async(req,res)=>{
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    //apple products api
    app.get('/products/apple', async(req, res)=>{
        const cursor = productCollection.find({brand_name :"Apple"});
        const result = await cursor.toArray();
        res.send(result);
    })
    //samsung products api
    app.get('/products/samsung', async(req, res)=>{
        const cursor = productCollection.find({brand_name :"Samsung"});
        const result = await cursor.toArray();
        res.send(result);
    })
    //intel products api
    app.get('/products/intel', async(req, res)=>{
        const cursor = productCollection.find({brand_name :"Intel"});
        const result = await cursor.toArray();
        res.send(result);
    })
    //ryzen products api
    app.get('/products/ryzen', async(req, res)=>{
        const cursor = productCollection.find({brand_name :"Ryzen"});
        const result = await cursor.toArray();
        res.send(result);
    })
    //nvidia products api
    app.get('/products/nvidia', async(req, res)=>{
        const cursor = productCollection.find({brand_name :"Nvidia"});
        const result = await cursor.toArray();
        res.send(result);
    })
    //get api for sepecefic product
    app.get('/products/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const product = await productCollection.findOne(query);
       res.send(product)
    })
    //update products
    app.put('/products/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const product = req.body;
      const options = {upsert : true};
      const updatedProduct = {
        $set:{
          name: product.name,
          brand_name: product.brand_name,
          brand_image: product.brand_image,
          type: product.type,
          price: product.price,
          rate: product.rate
        }
      }
      const result = await productCollection.updateOne(filter, updatedProduct, options)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('my crud server is running')
})
app.listen(port, ()=>{
    console.log('crud server is running on 5000')
})