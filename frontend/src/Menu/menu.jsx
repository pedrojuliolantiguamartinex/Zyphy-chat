import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router
import './menu.css'; 
import { UilSearch } from '@iconscout/react-unicons';
import { UilHouseUser } from '@iconscout/react-unicons';
import { UilChatBubbleUser } from '@iconscout/react-unicons';
import { UilSetting } from '@iconscout/react-unicons';
import { UilUserCircle } from '@iconscout/react-unicons';
import BuscarPersonas from '../Buscar/buscar';
import Perfil from '../Perfil/Perfi';
import Post from '../Post/post';
import FeedList from '../Card/CardList';
import CalendarioB from '../Calendario/calendarioB';
import Chat from '../Chat/chat';
import Setting from '../setting/setting';

function Menu() {
    const [activeMenuItem, setActiveMenuItem] = useState('Home');
    const [showSearchModal, setShowSearchModal] = useState(false);

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };

    const toggleSearchModal = () => {
        setShowSearchModal(!showSearchModal);
    };

    const closeSearchModal = () => {
        setShowSearchModal(false);
    };

    const preventClosingModal = (e) => {
        e.stopPropagation();
    };

    // Renderiza el componente correspondiente según el menú seleccionado
    const renderComponent = () => {
        switch (activeMenuItem) {
            case 'Perfil':
                return <Perfil />;
            case 'ZyRoom':
                return <Chat />;
            case 'Settings':
                return <Setting />;
            default:
                return (
                    <div className="post-and-feed">
                        <Post />
                        <FeedList />
                    </div>
                );
        }
    };

    return (
        <main>
            <div className="container">
                <div className="left">
                    <div className="sidebar">
                        <a 
                            className={`menu-item ${activeMenuItem === 'Home' ? 'active' : ''}`} 
                            onClick={() => handleMenuItemClick('Home')}
                        >
                            <span className='i'><UilHouseUser /></span><h3>Inicio</h3>
                        </a>
                        <a 
                            className={`menu-item ${activeMenuItem === 'Perfil' ? 'active' : ''}`} 
                            onClick={() => handleMenuItemClick('Perfil')}
                        >
                            <span className='i'><UilUserCircle /></span><h3>Perfil</h3>
                        </a>
                        <a 
                            className={`menu-item ${activeMenuItem === 'Explore' ? 'active' : ''}`} 
                            onClick={toggleSearchModal}
                        >
                            <span className='i'><UilSearch /></span><h3>Explorar</h3>
                        </a>
                        <a 
                            className={`menu-item ${activeMenuItem === 'ZyRoom' ? 'active' : ''}`} 
                            onClick={() => handleMenuItemClick('ZyRoom')}
                        >
                            <span className='i'><UilChatBubbleUser /></span><h3>ZyRoom</h3>
                        </a>
                        <a 
                            className={`menu-item ${activeMenuItem === 'Settings' ? 'active' : ''}`} 
                            onClick={() => handleMenuItemClick('Settings')}
                        >
                            <span className='i'><UilSetting /></span><h3>Ajustes</h3>
                        </a>
                    </div>
                </div>
            </div>
            {showSearchModal && (
                <div className="modal-background" onClick={closeSearchModal}>
                    <div className={`modal ${showSearchModal ? 'show' : ''}`} onClick={preventClosingModal}>
                        <BuscarPersonas />
                    </div>
                </div>
            )}
            {/* Renderiza el componente correspondiente */}
            {renderComponent()}
        </main>
    );
}

export default Menu;
