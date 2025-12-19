import ticketCard from '../assets/images/pattern-ticket.svg';
import logo from '../assets/images/logo-full.svg';
import logoMark from '../assets/images/logo-mark.svg';
import gitLogo from '../assets/images/icon-github.svg';

const SuccessCard = ({name, email, github, avatarPreview}) => {

    const ticketNum = Math.floor(Math.random() * 100000);
  return (
    <div className='success-wrapper'>
        <img src={logo} alt="" />
      <header>
        <h1>Congrats, <span className='user-name'>{name}!</span></h1>
        <h1>Your ticket is ready.</h1>
      </header>
      <p>
        We've emailed your ticket to <span className='user-email'>{email}</span> and will send
        updates in the run up to event.
      </p>

      <div className="card-ticket">
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '200px'}}>
        <div className="top-info">
            <div><img src={logoMark} alt="" /></div>
            <div className='logo-title'>
                <h3>Coding Conf</h3>
                <p>Jan 31, 2025 / Austin, TX</p>
            </div>
        </div>

        <div className="buttom-info">
            <div><img className='avatar-preview' src={avatarPreview} alt="" /></div>
            <div>
                <h3>{name}</h3>
                <div className='git-info'>
                    <img src={gitLogo} alt="" />
                    <span>{github}</span>
                </div>
            </div>
        </div>
      </div>
      <div className='ticket-num'>#0{ticketNum}</div>
      </div>
    </div>
  )
}

export default SuccessCard
