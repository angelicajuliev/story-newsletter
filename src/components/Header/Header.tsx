import { Link } from 'react-router-dom'
import './Header.scss'
import Logo from 'src/assets/images/logo.svg'

const Header = () => {
  return (
    <header className='Header'>
      <Link to='/home'>
        <img src={Logo} alt='Stori newsletter logo' />
      </Link>

      <nav>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/emails'>Emails</Link>
        </li>
        <li>
          <Link to='/newsletters'>Newsletters</Link>
        </li>
      </nav>
    </header>
  )
}

export default Header
