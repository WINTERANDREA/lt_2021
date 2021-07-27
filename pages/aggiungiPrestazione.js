import React, {useState} from 'react'
import { connectToDatabase } from "../util/mongodb";
import Link from 'next/link'
import styles from '../styles/Dashboard.module.css'
import DatePickers from '../components/datePicker'
import Input from '../components/input'
import Select from '../components/select'


const vet = "Casero"


const aggiungiPrestazione = ({prestazioni, allevatori}) => {
  const [values, setValues] = useState({
    data: "",
    allevatore: "",
    quantità: "",
    prestazione: "",
    importo: "",
    veterinario: vet,
    sconto: "",
  })

 const set = name => {
    return e => {
      setValues(oldValues => ({...oldValues, [name]: e.target.value }));
    }
  };



  const saveFormData = async () => {
    const response = await fetch('http://localhost:3000/api/addPrestazione', {
      method: 'POST',
      body: JSON.stringify(values)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    try{
      await saveFormData();
      alert('Prestazione aggiunta con successo')
      setValues({
        data: "",
        allevatore: "",
        quantità: "",
        prestazione: "",
        importo: "",
        veterinario: vet,
        sconto: "",
      })
      form.reset()
    } catch (e) {
      alert(`Non inviato! ${e.message}`);
    }
  }


  return (
    <div className={styles.container}>
       
      <div  className={styles.title}>
        
      <h1>Aggiungi Prestazione</h1>
     
      <Link href="/">Indietro </Link>
      
      </div>
      <div className={styles.vet}>
        <div className={styles.imgUser}></div>
        <h1>Roberto Casero</h1>
      </div>
      <form  className={styles.form} onSubmit={onSubmit}>
        <DatePickers name="data" value={values.data} onChange={set('data')}  ></DatePickers>
        <Select name="allevatore" value={values.allevatore} onChange={set('allevatore')} >
           <option value="" selected disabled hidden>Seleziona allevatore</option> 
          {allevatori.map((data, i) => (
            <option key={i} value={data.allevatore.nome + " " + data.allevatore.cognome}>{data.allevatore.nome} {data.allevatore.cognome}</option>
          ))}
         
        </Select>
        <Input label="Quantità" value={values.quantità} type="number" name="quantità" min="0"  onChange={set('quantità')}></Input>
        <Select name="prestazione" value={values.prestazione} onChange={set('prestazione')}>
          <option value="" selected disabled hidden>Seleziona prestazione</option>
          {prestazioni.map((data, i) => (
            
            <option key={i} value={data.data.prestazione} >{data.data.prestazione}</option>
          ))}
        </Select>
        <Input label="Importo" value={values.importo} type="number" name="importo" min="0"  onChange={set('importo')}></Input>
        <Select name="sconto" value={values.sconto} onChange={set('sconto')}>
          <option value="" selected disabled hidden>---</option>
          <option value="si" >Si</option>
          <option value="no" >No</option>
        </Select>
        <button type="submit" style={{background:'#fff', marginTop: 20}}>Aggiungi</button>
      </form>
      
    </div>
    
  )
}

// const AggiungiPrestazione = async (e)=>{
//   e.preventDefault()
//   console.log('pino')
//   const data = await fetch("http://localhost:3000/api/addPrestazione")
//   const res = await data.json()
//   console.log(res)
 
// }

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const prestazioni = await db
    .collection("prestazioni")
    .find({})
    .sort({ metacritic: -1 })
    .limit(1000)
    .toArray();

   const allevatori = await db
    .collection("allevatori")
    .find({})
    .sort({ metacritic: -1 })
    .limit(1000)
    .toArray();

  return {
    props: {
      prestazioni: JSON.parse(JSON.stringify(prestazioni)),
      allevatori: JSON.parse(JSON.stringify(allevatori)),
    },
  };
}

// export async function getServerSideProps(context) {
//   const { client } = await connectToDatabase()

//   const isConnected = await client.isConnected()

//   return {
//     props: { isConnected },
//   }
// }



export default aggiungiPrestazione
