import { connectToDatabase } from "../util/mongodb";
import Link from 'next/link'
import styles from '../styles/Dashboard.module.css'
import DatePickers from "../components/datePicker";

export default function Top({ data}) {
  console.log(data)
  return (
    <div className={styles.container}>
      <div className={styles.title}>
       <div className={styles.vet}>
        {/* <img src="/robisvg.jpg" alt="logo" className={styles.imgUser} /> */}
        <div className={styles.imgUser}></div>
        <h1>Roberto Casero</h1>
      </div>
        <div> 
          <p>Nuova Prestazione</p>
          <Link href="/aggiungiPrestazione">+</Link>
        </div>
      </div>
      
      
      
     <ul className={styles.dataHead}>
        <li>DATA</li>
        <li>ALLEVATORE</li>
        <li>PRESTAZIONE</li>
        <li>QUANTITA'</li>
        <li>IMPORTO</li>
        <li>SCONTO</li>
      </ul>
      <ul className={styles.dataBody}>
        {data.map((data, i) => (
           <li className={styles.dataBody} key={i}>
            <p >{data.data}</p>
            <p >{data.allevatore}</p>
            <p >{data.prestazione}</p>
            <p >{data.qt}</p>
            <p >{data.importo}</p>
            <p >{data.sconto}</p>
            <p><button>modifica</button></p>
            <p><button>elimina</button></p>
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
      data: JSON.parse(JSON.stringify(data))
    },
  };
}

