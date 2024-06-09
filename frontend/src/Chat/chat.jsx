import React, { useState, useEffect } from 'react';
import './chat.css';
import Lochat from "./well.png";
import logo2 from "./well2.png"
import holachat from "./chat.png";
import { UilAsterisk } from '@iconscout/react-unicons'
import { FaThumbsDown, FaExclamationTriangle, FaBan } from 'react-icons/fa';
import { UilArrowRight } from '@iconscout/react-unicons'
import ChatScreen from '../ChatScreen/ChatScreen';

function Chat() { // Cambia 'chat' a 'Chat'
  const [currentScreen, setCurrentScreen] = useState('splash');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('welcome');
    }, 6000); // Duración de la pantalla de splash más tiempo de animación

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentScreen === 'welcome') {
      setCurrentScreen('rules');
    } else if (currentScreen === 'rules') {
      setCurrentScreen('chat');
    }
  };

  return (
    <div className="conteiner-chat">
    <div className="app">
      {currentScreen === 'splash' && (
        <div className="splash-screen">
          <div className="splash-logo-container">
            <img src={Lochat} alt="Logo" className="splash-logo" />
            <h1 className="splash-text">yphy</h1>
          </div>
        </div>
      )}

      {currentScreen === 'welcome' && (
        <div className="welcome-screen">
          <img src={holachat} alt="Logo" className="logo" />
          <h1>Welcome to ZyRoom</h1>
          <p>Únete a la conversación en<br/> ZyRoom donde todos tienen<br/> algo que compartir.</p>
          <button onClick={handleNext} className="next-button">
          Let's Chat<UilArrowRight className="uil"/>
          </button>
        </div>
      )}

      {currentScreen === 'rules' && (
        <div className="rules-screen">
        <img src={holachat} alt="Rules" className="rules-image" />
        <h1>Reglas</h1>
        <ul>
          <li>
            <span className="icon"><UilAsterisk /></span> No utilizar lenguaje obsceno
          </li>
          <li>
            <span className="icon"><UilAsterisk /></span> No información personal.
          </li>
          <li>
            <span className="icon"><UilAsterisk /></span> No spam o publicidad no deseada.
          </li>
        </ul>
        <button onClick={handleNext} className='next-button'>Next<UilArrowRight className="uil"/></button>
      </div>
      )}
      {currentScreen === 'chat' && <ChatScreen/>}
    </div>
    </div>
  );
}

export default Chat;
