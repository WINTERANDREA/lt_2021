import { connectToDatabase } from "../util/mongodb";
export default function Top({ data }) {
  return (
    <div>
      <h1>Dashboard static</h1>
    
      <ul>
        {data.map((data, i) => (
           <li key={i}>
            <h2 >{data.allevatore}</h2>
            <h3 >{data.veterinario}</h3>
            <h2 >{data.importo}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("2021")
    .find({})
    .sort({ metacritic: -1 })
    .limit(1000)
    .toArray();
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
}