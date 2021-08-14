import { connectToDatabase } from "../../util/mongodb";
import {authenticated} from "../../middleware/authorization"
import { ObjectID } from "mongodb";


export default authenticated( async function handler(req,res){
const { db } = await connectToDatabase();
  const data = await db
    .collection("2021")
    .find({})
    .limit(1000)
    .toArray();

    res.json(data)
})

// {veterinario_id: ObjectID(vet_id)}