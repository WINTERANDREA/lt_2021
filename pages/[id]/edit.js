import React, {useState} from 'react'
import { connectToDatabase } from "../../util/mongodb";
import { ObjectID } from "mongodb";
import Layout from '../../components/Layout'
import Link from 'next/link'
import styles from '../../styles/Dashboard.module.css'
import DatePickers from '../../components/datePicker'
import Input from '../../components/input'
import Select from '../../components/select'
import {Loader, Button, Form} from 'semantic-ui-react'
import router, {useRouter} from 'next/router'

const vet = "Roberto Casero"


const EditPrestazione = ({ dati, prestazioni, allevatori}) => {
  const [isSubmitting, setIsSubmitting] =useState(false);
  const [values, setValues] = useState({
    data: dati.data,
    allevatore: dati.allevatore,
    qt: dati.qt,
    prestazione: dati.prestazione,
    importo: dati.importo,
    veterinario: vet,
    percorso: dati.percorso,
  })

 const set = name => {
    return e => {
      setValues(oldValues => ({...oldValues, [name]: e.target.value }));
    }
  };



  const updateFormData = async () => {
    const response = await fetch(`/api/updatePrestazione/${router.query.id}`, {
      method: 'PUT',
      body: JSON.stringify(values)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    setIsSubmitting(true)
    try{
      await updateFormData();
      router.push("/dashboard")
      setValues({
        data: "",
        allevatore: "",
        quantità: "",
        prestazione: "",
        importo: "",
        veterinario: vet,
        percorso: "",
      })
      form.reset()
      setIsSubmitting(false)
    } catch (e) {
      alert(`Non inviato! ${e.message}`);
    }
  }


  return (
    <Layout>
    <div className="form-container">
      <h1>Modifica Prestazione</h1>
      
      {isSubmitting ? <Loader active inline="centered" /> :
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input type="date" value={values.data} onChange={set('data')}/>
        </Form.Field>
        <Form.Field>
          <Select name="allevatore" value={values.allevatore} onChange={set('allevatore')} >
            <option value="{values.allevatore}" selected disabled hidden>{values.allevatore}</option> 
            {allevatori.map((data, i) => (
              <option key={i} value={data.allevatore.nome + " " + data.allevatore.cognome}>{data.allevatore.nome} {data.allevatore.cognome}</option>
            ))}
          
          </Select>
        </Form.Field>
        <Form.Field>
          <Input label="Quantità" value={values.qt} type="number" name="quantità" min="0"  onChange={set('qt')}/>
        </Form.Field>
        <Form.Field>
          <Select name="prestazione" value={values.prestazione} onChange={set('prestazione')}>
            <option value="{values.prestazione}" selected disabled hidden>{values.prestazione}</option>
            {prestazioni.map((data, i) => (
              <option key={i} value={data.data.prestazione} >{data.data.prestazione}</option>
            ))}
          </Select>
        </Form.Field>
        <Form.Field>
          <Input label="Importo" value={values.importo} type="number" name="importo" min="0"  onChange={set('importo')}></Input>
        </Form.Field>
        <Form.Field>
          <Input label="Percorso (Km)" value={values.percorso} type="number" name="quantità" min="0"  onChange={set('percorso')}></Input>
        </Form.Field>
        <Button color='green' inverted fluid width="100%" type="submit" >Aggiorna</Button>
      </Form>}
      
    </div>
    </Layout>
  )
}


// export async function getStaticProps() {
//   const { db } = await connectToDatabase();
//   const prestazioni = await db
//     .collection("prestazioni")
//     .find({})
//     .sort({ metacritic: -1 })
//     .limit(1000)
//     .toArray();

//    const allevatori = await db
//     .collection("allevatori")
//     .find({})
//     .sort({ metacritic: -1 })
//     .limit(1000)
//     .toArray();

//   return {
//     props: {
//       prestazioni: JSON.parse(JSON.stringify(prestazioni)),
//       allevatori: JSON.parse(JSON.stringify(allevatori)),
//     },
//   };
// }

export async function getServerSideProps(req) {
const { db } = await connectToDatabase();
 const data = await db.collection("2021").findOne({"_id": ObjectID(req.query.id)});
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
      dati: JSON.parse(JSON.stringify(data)),
      prestazioni: JSON.parse(JSON.stringify(prestazioni)),
      allevatori: JSON.parse(JSON.stringify(allevatori))
    },
  };
}



export default EditPrestazione
