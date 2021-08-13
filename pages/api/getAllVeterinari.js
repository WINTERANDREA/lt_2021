import { sendData } from "next/dist/next-server/server/api-utils";
import { connectToDatabase } from "../../util/mongodb";
import {authenticated} from "../../middleware/authorization"


export default authenticated( async function handler(req,res){
const { db } = await connectToDatabase();
  const data = await db
    .collection("anagrafica_veterinario")
    .find({})
    .limit(1000)
    .toArray();

    res.json(data)
})