// src/components/ScriptsHomePage/MenuUser.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Componentes de Ícones SVG Inline (Heroicons style)
const IconDashboard = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />   
    </svg>
);
const IconBars = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const IconTimes = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);
const IconDownload = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);


export default function MenuUser() {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const containerClass = isOpen ? "menu-container open" : "menu-container closed";

  return (
    <>
      <style>{`
        /* --- ESTILOS INLINE PARA O MENU SIDEBAR --- */
        .menu-container {
          position: fixed; top: 0; left: 0; height: 100%; padding-top: 50px; 
          background: #0B3C5D; color: #ecf0f1; transition: width 0.3s ease; 
          z-index: 1000; display: flex; flex-direction: column; box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
        }
        .menu-container.open { width: 250px; }
        .menu-container.closed { width: 70px; }
        .toggle-btn {
          position: absolute; top: 20px; right: -40px; background: #3282b8; color: white;
          border: none; padding: 8px 12px; border-radius: 0 5px 5px 0; cursor: pointer;
          font-size: 1.3rem; transition: right 0.3s ease, background-color 0.2s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .menu-container.closed .toggle-btn { right: 15px; border-radius: 5px; }
        .toggle-btn:hover { background: #2974a4; }
        .menu-header { width: 100%; padding: 10px 0; text-align: center; margin-bottom: 20px; overflow: hidden; }
        .menu-title { font-size: 1.8rem; font-weight: 700; color: #ffffff; white-space: nowrap; }
        .menu-buttons { width: 100%; display: flex; flex-direction: column; gap: 8px; padding: 0 15px; }
        .menu-btn {
          display: flex; align-items: center; gap: 15px; width: 100%; background: none;
          color: #bdc3c7; padding: 12px 15px; text-align: left; border-radius: 4px;
          font-size: 1rem; text-decoration: none; transition: 0.2s;
        }
        .menu-btn:hover { background: #0d5280ff; color: #ecf0f1; }
        .menu-icon { stroke: currentColor; fill: none; width: 1.3rem; height: 1.3rem; min-width: 25px; text-align: center; }
        .menu-text { white-space: nowrap; overflow: hidden; opacity: 1; transition: opacity 0.3s ease; font-weight: 500; }
        .menu-container.closed .menu-text { display: none; }
        .menu-container.closed .menu-btn { justify-content: center; padding: 12px 0; }
      `}</style>
      
      <aside className={containerClass}>
        
        <button 
          className="toggle-btn" 
          onClick={toggleMenu} 
          title={isOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isOpen ? <IconTimes className="menu-icon" /> : <IconBars className="menu-icon" />}
        </button>

        <div className="menu-header">
          {isOpen && <h2 className="menu-title">Menu</h2>}
        </div>

        <nav className="menu-buttons">
          
          {/* Dashboard (Rota padrão /homepage) */}
          <Link to="/homepage" className="menu-btn" title="Dashboard">
            <IconDashboard className="menu-icon" />
            {isOpen && <span className="menu-text">Dashboard</span>}
          </Link>
          
          {/* Downloads gerais (NOVA ROTA /homepage/downloads) */}
          <Link to="/homepage/downloads" className="menu-btn" title="Downloads gerais">
            <IconDownload className="menu-icon" />
            {isOpen && <span className="menu-text">Downloads gerais</span>}
          </Link>
          
        </nav>
      </aside>
    </>
  );
}