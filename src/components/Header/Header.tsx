import './Header.scss'
import Logo from 'src/assets/images/logo.svg'

const Header = () => {
  return (
    <header className='Header'>
      <img src={Logo} alt='Stori newsletter logo' />

      <nav>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/'>Email List</a>
        </li>
        <li>
          <a href='/'>Newsletter</a>
        </li>
      </nav>
    </header>
  )
}

export default Header
