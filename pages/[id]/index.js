import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Layout from '../../components/Layout'
import { Confirm, Button, Loader } from 'semantic-ui-react';
import { ObjectID } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";
import { Table } from 'semantic-ui-react'



export default function Prestazione ({dati}) {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter();

  useEffect(()=>{
    if(isDeleting){
      eliminaPrestazione()
    }
  }, [isDeleting])

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const eliminaPrestazione = async () => {
    const prestazioneId = router.query.id
    try{
      const deleted = await fetch('/api/deletePrestazione', {
      method: 'DELETE',
      body: JSON.stringify(prestazioneId)
    });

    router.push("/dashboard")
    }catch(err){
      console.log(err)
    }
  }
  
  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  }
  return (
    <Layout>
    <div>
      {isDeleting ? <Loader/>:
    <Table celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Data
          </Table.HeaderCell>
          <Table.HeaderCell>
            Allevatore
          </Table.HeaderCell>
          <Table.HeaderCell>
            Prestazione
          </Table.HeaderCell>
          <Table.HeaderCell>
            Quantità
          </Table.HeaderCell>
          <Table.HeaderCell>
            Importo
          </Table.HeaderCell>
          <Table.HeaderCell>
            Percorso (Km)
          </Table.HeaderCell>
          <Table.HeaderCell>
            Elimina
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
          <Table.Row >
            <Table.Cell><p className="customthead">Data</p>{dati.data}</Table.Cell>
            <Table.Cell><p className="customthead">Allevatore</p>{dati.allevatore}</Table.Cell>
            <Table.Cell><p className="customthead">Prestazione</p>{dati.prestazione}</Table.Cell>
            <Table.Cell><p className="customthead">Quantità</p>{dati.qt}</Table.Cell>
            <Table.Cell><p className="customthead">Importo</p>€ {dati.importo}</Table.Cell>
            <Table.Cell><p className="customthead">Percorso</p>{dati.percorso} Km</Table.Cell>
            <Table.Cell><Button color="red" onClick={open}>Elimina</Button></Table.Cell>
          </Table.Row>
     
      </Table.Body>
    </Table>
}

    <Confirm content='Sei sicuro di voler eliminare questa prestazione?'cancelButton='Indietro' open={confirm} onCancel={close} onConfirm={handleDelete} />
     </div>
     </Layout>
  )
}


export async function getServerSideProps(req) {
const { db } = await connectToDatabase();
 const data = await db.collection("2021").findOne({"_id": ObjectID(req.query.id)});

  return {
    props: {
      dati: JSON.parse(JSON.stringify(data))
    },
  };
}
 

