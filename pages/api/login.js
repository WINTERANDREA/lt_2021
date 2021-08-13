import { connectToDatabase } from "../../util/mongodb";
import {compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import cookie from 'cookie'

export default async function handler(req,res){
const { db } = await connectToDatabase();
const secret = process.env.JWT_SECRET


if (req.method === "POST"){
   const database = await db;
   const veterinario = await database.collection("anagrafica_veterinario").findOne({username: req.body.username})

    //add validation if person is defined 
    console.log(req.body.password)
    compare(req.body.password, veterinario.password, function(err,result){
      if(!err && result) {
        const payload = {
          id: veterinario._id,
          name: veterinario.anagrafica.nome,
          surname: veterinario.anagrafica.cognome
        }
        const jwt = sign(payload, secret, {expiresIn: '1h'})
        
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600, //60 * 60 * 24 * 365 -> 1year
          path: '/'
        }))
        res.json({message: 'Welcome back to the app!'})
      }else{
        res.json({messsage: 'Ups, something went wrong'})
      }
    });
}else {
  res.status(405).json({ message: 'We only support POST'})
}
}