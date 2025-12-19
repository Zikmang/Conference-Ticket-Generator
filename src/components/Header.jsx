import fullLogo from '../assets/images/logo-full.svg';
import '../App.css'

const Header = () => {
  return (
    <div className="header-img">
      <header>
        <img src={fullLogo} alt="" />
        <h1>
            Your Journey to Coding Conf 
        </h1>
        <h1>2025 Starts Here!</h1>
        <p>
            Secure your spot at next year's biggest coding conference.
        </p>
      </header>
    </div>
  )
}

export default Header
