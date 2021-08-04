import Link from 'next/link';
import UserImg from './UserImg';
import roby from '../public/roby.jpg'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="user-nav">
         <UserImg src={roby} />
      <Link href="/dashboard">
        <h1>Roberto Casero</h1>
      </Link>
       
        </div>
      
      <Link href="/AggiungiPrestazione">
        <a className="create">+</a>
      </Link>
    </nav>
  )
}

export default Navbar
