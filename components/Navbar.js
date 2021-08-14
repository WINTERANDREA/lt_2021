import Link from 'next/link';
import UserImg from './UserImg';
import user from '../public/user.jpg'

const Navbar = ({vet}) => {
  return (
    <nav className="navbar">
      <div className="user-nav">
         <UserImg src={user} />
      <Link href="/dashboard">
        <h1>{vet}</h1>
      </Link>
       
        </div>
      
      <Link href="/aggiungiPrestazione">
        <a className="create">+</a>
      </Link>
    </nav>
  )
}

export default Navbar
