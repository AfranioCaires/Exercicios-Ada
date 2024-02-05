import './header.css'
import logo from './../../assets/Film.svg'
import search from './../../assets/Search.svg'

export default function Header() {
  return (
    <header>
      <nav className='container'>
        <img src={logo} alt="logo da we love movies" />
      </nav>
    </header>
  )
}