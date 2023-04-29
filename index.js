import express from "express";
import * as dotenv from 'dotenv';
import { MongoClient } from "mongodb";
import cors from "cors";
dotenv.config();
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const PORT=process.env.PORT;
const app=express();

app.use(express.json());

app.use(cors({
  origin: '*'
}));
app.use(express.json());

  //Mongodb connection
 //const MONGO_URL="mongodb://127.0.0.1";
 const MONGO_URL=process.env.MONGO_URL;
 async function createConnection(){
  const client=new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected😃");
  return client;
 }
 const client= await createConnection();
app.get("/",function(request,response){
    response.send("Movies details");
});  
 

//get data from db
app.get("/movies", async function(request, response) {
    try{
    const movies=await client
                        .db("b38wd")
                        .collection("movies")
                        .find({})
                        .toArray();
                        
    console.log(movies);
    response.send(movies);
    }catch(err){
      console.log(err);
    }
  });
app.listen(PORT,()=>console.log(`Server started in:${PORT}`));
