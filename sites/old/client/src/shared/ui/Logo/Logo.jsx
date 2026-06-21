import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'


export const Logo = () => {
  return (
    <Link to='/' className="logo">
      <img src={logo} alt="Академія Мій Комп'ютер" />
    </Link>
  )
}