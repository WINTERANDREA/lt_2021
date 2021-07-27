import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req,res){
  const {db} = await connectToDatabase();

  const data = await db.collection("2021")
    .find({})
    .sort({ metacritic: -1 })
    .limit(1000)
    .toArray();

    console.log(data)
    res.json(data)
}