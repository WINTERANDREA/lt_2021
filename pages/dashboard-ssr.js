import { connectToDatabase } from "../util/mongodb";
export default function Dashboard({ data }) {
  console.log(data)
  return (
    <div>
      <h1>LT LISTA</h1>
    
      <ul>
        {data.map((data, i) => (
          <li key={i}>
            <h2 >{data.veterinario}</h2>
            <h3 >{data.allevatore}</h3>
            <h2 >{data.importo}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("2021")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
  console.log(data)
}