import _ from 'lodash'
import { connectToDatabase } from "../util/mongodb";
import React, {useState} from 'react'
import Layout from '../components/Layout'
import { Table } from 'semantic-ui-react'
import Link from 'next/link';
import {  Image } from 'semantic-ui-react'



export default function TableExampleSortable({dati}) {
   const [column, setColumn] = useState(null);
    const [data, setData] = useState(dati);
    const [direction, setDirection] = useState(null);

    const handleSort = (clickedColumn) => () => {

        if (column !== clickedColumn) {

            setColumn(clickedColumn)
            setData(_.sortBy(data, [clickedColumn]))
            setDirection('ascending')
            return
        }
        setData(dati.reverse())
        setDirection(direction === 'ascending' ? 'descending' : 'ascending')
    }

  return (
    <Layout>
    <Table sortable striped celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'data' ? direction : null}
            onClick={handleSort('data')}
          >
            Data
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'allevatore' ? direction : null}
            onClick={handleSort('allevatore')}
          >
            Allevatore
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'prestazione' ? direction : null}
            onClick={handleSort('prestazione')}
          >
            Prestazione
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'quantità' ? direction : null}
            onClick={handleSort('quantità')}
          >
            Quantità
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'importo' ? direction : null}
            onClick={handleSort('importo')}
          >
            Importo
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'sconto' ? direction : null}
            onClick={handleSort('sconto')}
          >
            Percorso (Km)
          </Table.HeaderCell>
           <Table.HeaderCell width={1}>
            Modifica
          </Table.HeaderCell>
           <Table.HeaderCell width={1}>
            Elimina
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {dati.map((data, i) => (
          <Table.Row key={i}>
           <Table.Cell><p className="customthead">Data</p><p className="customData">{data.data}</p></Table.Cell>
            <Table.Cell><p className="customthead">Allevatore</p><p className="customData">{data.allevatore}</p> </Table.Cell>
            <Table.Cell><p className="customthead">Prestazione</p><p className="customData">{data.prestazione}</p></Table.Cell>
            <Table.Cell><p className="customthead">Quantità</p><p className="customData">{data.qt}</p></Table.Cell>
            <Table.Cell><p className="customthead">Importo</p><p className="customData">€ {data.importo}</p></Table.Cell>
            <Table.Cell><p className="customthead">Percorso</p><p className="customData">{data.percorso}</p></Table.Cell>
            <Table.Cell><p className="customthead">Modifica</p><Link href={`/${data._id}/edit`}><button ><Image width={18} className="icon-table edit" src="edit-regular.svg" alt="modifica"/></button></Link></Table.Cell>
            <Table.Cell><p className="customthead">Elimina</p><Link  href={`/${data._id}`} ><button ><Image  width={15}  className="icon-table" src="trash-alt-regular.svg" alt="elimina"/></button></Link></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    </Layout>
  )
}

//  href={`/${prestazione._id/edit}`}


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
      dati: JSON.parse(JSON.stringify(data))
    },
  };
}
