import { useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import logo from '../assets/images/logo-full.svg';
import logoMark from '../assets/images/logo-mark.svg';
import gitLogo from '../assets/images/icon-github.svg';

const SuccessCard = ({ name, email, github, avatarPreview }) => {
  
  // 1. Generate a stable random number (won't change on re-renders)
  const ticketNum = useMemo(() => Math.floor(Math.random() * 100000), []);

  // 2. Setup Motion Values for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3. Create rotation transforms (Mouse move = Rotate card)
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    // Reset to center when mouse leaves
    x.set(0);
    y.set(0);
  }

  return (
    <div className='success-wrapper'>
      <img src={logo} alt="Logo" style={{ marginBottom: '2rem' }} />
      
      <header>
        <h1>Congrats, <span className='user-name'>{name}!</span></h1>
        <h2>Your ticket is ready.</h2>
      </header>
      
      <p>
        We've emailed your ticket to <span className='user-email'>{email}</span> and will send updates in the run up to event.
      </p>

      {/* 4. Motion Div Wrapper */}
      <motion.div 
        className="card-ticket"
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          perspective: 1000 
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* Left Side: Content */}
        <div className="ticket-content">
          <div className="top-info">
            <div><img src={logoMark} alt="" /></div>
            <div className='logo-title'>
              <h3>Coding Conf</h3>
              <p>Jan 31, 2025 / Austin, TX</p>
            </div>
          </div>

          <div className="buttom-info">
            <div><img className='avatar-preview' src={avatarPreview} alt="Avatar" /></div>
            <div>
              <h3>{name}</h3>
              <div className='git-info'>
                <img src={gitLogo} alt="" />
                <span>{github}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='ticket-num'>
            #0{ticketNum}
        </div>

      </motion.div>
    </div>
  )
}

export default SuccessCard;