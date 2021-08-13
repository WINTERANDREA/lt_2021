import { sendData } from "next/dist/next-server/server/api-utils";
import { connectToDatabase } from "../../util/mongodb";
import {authenticated} from "../../middleware/authorization"
// import {verify} from 'jsonwebtoken';

// const secret = process.env.JWT_SECRET

// const authenticated = fn => async (req,res) => {
//   verify(req.headers.authorization, secret, async function(err, decoded){
//     if(!err && decoded) {
//       return await fn(req,res)
//     }

//     res.status(500).json({message: 'Sorry you are not authenticated'})
//   })
// }

export default authenticated( async function handler(req,res){
const { db } = await connectToDatabase();
  const data = await db
    .collection("anagrafica_veterinario")
    .find({})
    .limit(1000)
    .toArray();

    res.json(data)
})