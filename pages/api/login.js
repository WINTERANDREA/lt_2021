
import { connectToDatabase } from "../../util/mongodb";
// import { ObjectID } from "mongodb";

export default async function handler(req,res){
  console.log(req.body.username)
  console.log(typeof req.body)
  const {db} = await connectToDatabase();

  const result = await db.collection("anagrafica_veterinario").findOne({username: req.body.username});
  if(result){
    console.log("Success")
     console.log(result)
  }else{
    console.log("Not Found")
  }
 res.json(result)
}
