import Link from 'next/link';
import UserImg from './UserImg';
import roby from '../public/roby.jpg'

const Navbar = ({href, vet_name}) => {
  return (
    <nav className="navbar">
      <div className="user-nav">
         <UserImg src={roby} />
      <Link href="/dashboard">
        <h1>{vet_name}</h1>
      </Link>
       
        </div>
      
      {/* <Link >
        <a className="create">+</a>
      </Link> */}
    </nav>
  )
}

export default Navbar
