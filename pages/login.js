import {useState, useEffect} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import CustomHead from '../components/Head'
import { useRouter } from "next/router"

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const router = useRouter();

  const  handleSubmit = async () => {
   const response = await fetch('/api/login', {
      method: "POST",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({username, b: 'Textual content'})
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
    const data = await response.json()
    router.push(`/dashboard/${data._id}`)
}

   useEffect(() => {
    // Update the document title using the browser API
    console.log(username)
  }, [username])
  
  return (
  <>
  <CustomHead></CustomHead>
  <Grid className="login-background" >
    <Grid.Column className="custom-width">
      
        <Image className="logo" src='/loghi/ell-et_logo_scritta_2.svg' alt="ell-et" /> 
 
      <Form onSubmit={handleSubmit} size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(e)=> setUsername(e.target.value)} />
          {/* <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          /> */}
            <Button type="submit" color='black' fluid size='large'>
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

export default LoginForm