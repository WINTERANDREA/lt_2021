
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from "mongodb";

export default async function handler(req,res){
  
  const {db} = await connectToDatabase();
  const rawData = await req.body;
  const data = await JSON.parse(rawData)
  const id = new ObjectID(req.query.id)
  
  const result = await db.collection("2021").updateOne({_id: id}, {$set: data})
  console.log("data updated succesfully", result)
  res.json(result)
}

