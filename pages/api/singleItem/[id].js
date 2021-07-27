// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
 
//   res.status(200).json({ name: req.query.id })
//    console.log(req.query)
// }

import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const _id = new ObjectId(req.query.id)
  const data = await db
    .collection("2021")
    .find({"_id":_id})
    .limit(20)
    .toArray();
  res.json(data);
};
