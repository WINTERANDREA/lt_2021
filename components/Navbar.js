import Link from 'next/link';
import UserImg from './UserImg';
import user from '../public/user.jpg'
import { useRouter } from 'next/router'



const Navbar = ({vet}) => {
  const router = useRouter();

  const handleLogout = async ()=> {
  console.log("logout clicked")
    await fetch('/api/logout', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: 'static_key'
    })
  })
  await router.push("/")
}
  return (
    <nav className="navbar">
      <div className="user-nav">
         <UserImg src={user} />
      <Link href="/dashboard">
        <h1>{vet}</h1>
      </Link>
      <button className="logout" onClick={handleLogout}>Logout</button> 
       
        </div>
      
      <Link href="/aggiungiPrestazione">
        <a className="create">+</a>
      </Link>
    </nav>
  )
}

export default Navbar
