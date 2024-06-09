import React from 'react';
import Nav from './Nav/nav';
import Menu from './Menu/menu';
import CalendarioB from './Calendario/calendarioB';

function AuthenticatedComponent() {
  return (
    <div>
      <Nav/> 
      <div className="container">
        <main>
          <Menu/>
          <CalendarioB/>
        </main>
      </div>
    </div>
  );
}

export default AuthenticatedComponent;
