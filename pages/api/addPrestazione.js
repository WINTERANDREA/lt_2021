import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req,res){
  
  const {db} = await connectToDatabase();
  const rawData = await req.body;
  const data = await JSON.parse(rawData)

  const result = await db.collection("2021").insertOne({
    data: data.data,
    allevatore: data.allevatore,
    qt: data.quantità,
    prestazione: data.prestazione,
    importo: data.importo,
    veterinario: data.veterinario,
    sconto: data.sconto
    })

  console.log("data added succesfully", result)

res.json(result)

}