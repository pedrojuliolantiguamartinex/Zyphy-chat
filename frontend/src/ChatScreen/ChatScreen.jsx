import React, { useState, useEffect, useContext } from 'react';
import './ChatScreen.css';
import { UilTelegramAlt } from '@iconscout/react-unicons';
import io from 'socket.io-client';
import { UserContext } from '../UserContext';

const socket = io();

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    socket.on('Chat message', (msg) => {
      setMessages((prevMessages) => {
        if (prevMessages.some((message) => message.id === msg.id)) {
          return prevMessages;
        }
        return [...prevMessages, msg];
      });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const messageData = {
        id: Date.now(),
        text: inputMessage.trim(),
        username: user.username
      };
      socket.emit('Chat message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]); // Añadir el mensaje localmente también
      setInputMessage('');
    }
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const userMessage = document.querySelector('.chat-message-user');
    userMessage.style.color = getRandomColor();
});

  return (
    <div className="chat">
      <div className="chat-container">
        <div className="chat-screen">
          <div className="chat-header">
            <h1>ZyRoom</h1>
            <button className="exit-button">Exit</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.username === user.username ? 'my-message' : 'other-message'}`}
              >
                {/* <img src={`http://localhost:8800/uploads/${user.foto_perfil}`} alt="" /> */}
                <p className="chat-message-user">{msg.username}: </p> 
                <p className='chat-message-text'>{msg.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-input-container">
            <input
              type="text"
              placeholder="Type your message..."
              className="chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="send-button">
              <UilTelegramAlt className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
