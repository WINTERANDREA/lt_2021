import Link from 'next/link'
import {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import CustomHead from '../components/Head'

export default function Index ({dati}){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async ()=> {
    console.log(username, password)
    const resp = await fetch('/api/login', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  const json = await resp.json()
  console.log(json)
  }
  return (
  <>
  <CustomHead></CustomHead>
  <Grid className="login-background" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      
        <Image className="logo" src='/loghi/ell-et_logo_scritta_2.svg' alt="ell-et" /> 
 
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(e)=> setUsername(e.target.value)} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={(e)=> setPassword(e.target.value)}
          />
            <Button color='black' type="submit" fluid size='large'>
              Accedi
            </Button>
        </Segment>
      </Form>
      {/* <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message> */}
    </Grid.Column>
  </Grid>
  </>
  )
}
