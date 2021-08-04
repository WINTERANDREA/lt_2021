import '../styles/globals.css'
import '../css/style.css'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Component {...pageProps} />
  </> )
}

export default MyApp
