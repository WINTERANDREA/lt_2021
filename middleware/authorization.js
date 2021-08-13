import {verify} from 'jsonwebtoken';

const secret = process.env.JWT_SECRET

export const authenticated = fn => async (req,res) => {
  verify(req.headers.authorization, secret, async function(err, decoded){
    if(!err && decoded) {
      return await fn(req,res)
    }

    res.status(401).json({message: 'Sorry you are not authenticated'})
  })
}