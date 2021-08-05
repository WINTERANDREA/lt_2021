import React, {useState} from 'react'
import { connectToDatabase } from "../util/mongodb";
import Layout from '../components/Layout'
import Link from 'next/link'
import styles from '../styles/Dashboard.module.css'
import DatePickers from '../components/datePicker'
import Input from '../components/input'
import Select from '../components/select'
import {Loader, Button, Form} from 'semantic-ui-react'
import router, {useRouter} from 'next/router'


const vet = "Roberto Casero"


export default function CreatePrestazione ({prestazioni, allevatori}) {
  const [isSubmitting, setIsSubmitting] =useState(false);
  const [values, setValues] = useState({
    data: "",
    allevatore: "",
    quantità: "",
    prestazione: "",
    importo: "",
    veterinario: vet,
    percorso: "",
  })

 const set = name => {
    return e => {
      setValues(oldValues => ({...oldValues, [name]: e.target.value }));
    }
  };



  const saveFormData = async () => {
    const response = await fetch('/api/addPrestazione', {
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
    setIsSubmitting(true)
    try{
      await saveFormData();
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
      <h1>Aggiungi Prestazione</h1>
      
      {isSubmitting ? <Loader active inline="centered" /> :
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <DatePickers name="data" value={values.data} onChange={set('data')}  ></DatePickers>
        </Form.Field>
        <Form.Field>
          <Select name="allevatore" value={values.allevatore} onChange={set('allevatore')} >
            <option value="" selected disabled hidden>Seleziona allevatore</option> 
            {allevatori.map((data, i) => (
              <option key={i} value={data.allevatore.nome + " " + data.allevatore.cognome}>{data.allevatore.nome} {data.allevatore.cognome}</option>
            ))}
          
          </Select>
        </Form.Field>
        <Form.Field>
          <Input label="Quantità" value={values.quantità} type="number" name="quantità" min="0"  onChange={set('quantità')}></Input>
        </Form.Field>
        <Form.Field>
          <Select name="prestazione" value={values.prestazione} onChange={set('prestazione')}>
            <option value="" selected disabled hidden>Seleziona prestazione</option>
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
        <Button color='green' inverted fluid width="100%" type="submit" >Aggiungi</Button>
      </Form>}
      
    </div>
    </Layout>
  )
}


export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const prestazioni = await db
    .collection("prestazioni")
    .find({})
    .limit(1000)
    .toArray();

   const allevatori = await db
    .collection("allevatori")
    .find({})
    .limit(1000)
    .toArray();

  return {
    props: {
      prestazioni: JSON.parse(JSON.stringify(prestazioni)),
      allevatori: JSON.parse(JSON.stringify(allevatori)),
    },
  };
}


