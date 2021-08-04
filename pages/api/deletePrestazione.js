
import { connectToDatabase } from "../../util/mongodb";
import { ObjectID } from "mongodb";

export default async function handler(req,res){
  
  const {db} = await connectToDatabase();
  const rawData = await req.body;
  const data = await JSON.parse(rawData)
  const id = new ObjectID(data)
  
  const result = await db.collection("2021").deleteOne({_id: id})

  console.log("data deleted succesfully", result)
  res.json(result)
}

