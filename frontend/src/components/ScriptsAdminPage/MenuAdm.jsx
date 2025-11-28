import React, { useState } from "react";

// Definições de Ícones (Mantidas)
const IconDashboard = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    />
  </svg>
);
const IconBars = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);
const IconTimes = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);
const IconUsers = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);
const IconKey = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);
const IconClipboardList = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
    />
  </svg>
);
const IconDownload = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
    />
  </svg>
);
const IconCogs = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
    />
  </svg>
);

const IconLogout = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-3.75-3h12m0 0-3-3m3 3-3 3"
    />
  </svg>
);

export default function MenuAdm() {
  // 💡 ESTADO: Inicia fechado (false)
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const containerClass = isOpen
    ? "menu-container open"
    : "menu-container closed";

  return (
    <>
      <style>{`
        /* ------------------------------------- */
        /* --- ESTILOS PADRÃO (DESKTOP) --- */
        /* ------------------------------------- */
        
        .menu-container {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          padding-top: 50px; 
          background: #0B3C5D;
          color: #ecf0f1; 
          transition: width 0.3s ease, left 0.3s ease;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
          
          /* 💡 CRÍTICO: Define o contexto para o toggle-btn absoluto no desktop */
          position: relative; 
        }
        
        /* Estado Aberto (Largo) */
        .menu-container.open {
          width: 250px;
        }

        /* Estado Fechado (Estreito - apenas para ícones) */
        .menu-container.closed {
          width: 70px; 
        }

        /* Botão de Alternar (Toggle) - Estilos base */
        .toggle-btn {
          position: absolute; /* Padrão desktop: posicionado dentro do .menu-container */
          top: 20px; 
          background: #3282b8;
          color: white;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 1.3rem; 
          transition: right 0.3s ease, left 0.3s ease, border-radius 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5000;
        }
        
        .toggle-btn:hover {
          background: #2974a4;
        }

        /* Estilos de Conteúdo (Mantidos) */
        .menu-header {
          width: 100%;
          padding: 10px 0; 
          text-align: center;
          margin-bottom: 20px;
          overflow: hidden; 
        }

        .menu-title {
          font-size: 1.8rem;
          font-weight: 700; 
          color: #ffffff;
          white-space: nowrap;
        }

        .menu-buttons {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px; 
          padding: 0 15px; 
        }

        .menu-btn {
          display: flex;
          align-items: center; 
          gap: 15px; 
          width: 100%;
          background: none;
          color: #bdc3c7; 
          padding: 12px 15px;
          text-align: left;
          border-radius: 4px;
          font-size: 1rem;
          text-decoration: none;
          transition: 0.2s;
        }

        .menu-btn:hover {
          background: #0d5280ff;
          color: #ecf0f1; 
        }

        .menu-icon {
          stroke: currentColor; 
          fill: none;
          width: 1.3rem;
          height: 1.3rem;
          min-width: 25px;
          text-align: center; 
        }

        .menu-text {
          white-space: nowrap;
          overflow: hidden;
          opacity: 1;
          transition: opacity 0.3s ease;
          font-weight: 500;
        }

        /* Oculta o texto quando a sidebar está fechada (DESKTOP) */
        .menu-container.closed .menu-text {
          display: none;
        }

        /* Ajusta o alinhamento central para ícones quando fechado (DESKTOP) */
        .menu-container.closed .menu-btn {
          justify-content: center; 
          padding: 12px 0; 
        }

        /* Lógica do Toggle no Desktop */
        /* 1. Quando FECHADO (70px): Botão aparece à direita */
        .menu-container.closed .toggle-btn {
            right: 15px;
            left: auto;
            border-radius: 5px;
        }
        
        /* 2. Quando ABERTO (250px): Botão fica escondido */
        .menu-container.open .toggle-btn {
            right: -49px; 
            left: auto;
            border-radius: 0 5px 5px 0;
        }


        /* ------------------------------------- */
        /* --- RESPONSIVIDADE (MOBILE: <= 768px) --- */
        /* ------------------------------------- */
        @media (max-width: 768px) {
            
            /* 1. Sidebar Oculta (Usando fixed para cobrir a tela) */
            .menu-container {
                left: -250px; 
                width: 250px !important; 
                padding-top: 80px; 
                
                /* Volta para Fixed em mobile para cobrir a tela */
                position: fixed !important; 
            }

            /* 2. Mostra a sidebar (transição) quando está 'open' */
            .menu-container.open {
                left: 0; 
                box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2); 
            }
            
            /* 3. Botão Toggle: Fixo no canto superior esquerdo (Escondido DENTRO da aside) */
            /* CRÍTICO: Movemos o botão para DENTRO da ASIDE. No mobile, a aside está escondida.
               Se o botão ficar dentro, ele some. Precisamos tirá-lo de dentro
               da aside *apenas visualmente* para que fique fixo na tela.
            */
            .menu-container .toggle-btn {
                position: fixed !important; /* Volta a ser fixed na tela do navegador */
                top: 15px; 
                left: 15px; 
                right: auto !important; 
                border-radius: 5px;
                
                /* Garante que o ícone de 'X' apareça corretamente */
                display: flex;
            }
            
            /* Garante que o texto e o alinhamento estejam corretos em mobile */
            .menu-container .menu-text {
                display: initial; 
            }
            
            .menu-container.closed .menu-btn {
                justify-content: flex-start; 
                padding: 12px 15px; 
            }
        }
        
        /* ------------------------------------- */
        /* --- RESPONSIVIDADE (DESKTOP: > 768px) --- */
        /* ------------------------------------- */
        @media (min-width: 769px) {
             /* 1. Reseta o posicionamento da sidebar para fixed no desktop */
            .menu-container {
                left: 0 !important; 
                position: fixed !important; 
                width: 70px; /* Começa fechado */
            }
        }
      `}</style>

      {/* 🚀 BOTÃO TOGGLE (MOVIDO PARA DENTRO DA <aside> - ESSENCIAL PARA O DESKTOP) */}
      <aside className={containerClass}>
        
        <button
          className="toggle-btn"
          onClick={toggleMenu}
          title={isOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isOpen ? (
            <IconTimes className="menu-icon" /> // Ícone X quando Aberto
          ) : (
            <IconBars className="menu-icon" /> // Ícone Hambúrguer quando Fechado
          )}
        </button>

        <div className="menu-header">
          {/* O título só aparece quando o menu está aberto */}
          {isOpen && <h2 className="menu-title">Menu</h2>}
        </div>

        <nav className="menu-buttons">
          {/* 🚀 Dashboard */}
          <a href="/adminpage/dashboard" className="menu-btn" title="Dashboard">
            <IconDashboard className="menu-icon" />
            <span className="menu-text">Dashboard</span>
          </a>

          {/* Usuários */}
          <a href="/adminpage/usuarios" className="menu-btn" title="Usuários">
            <IconUsers className="menu-icon" />
            <span className="menu-text">Usuários</span>
          </a>

          {/* Administradores */}
          <a
            href="/adminpage/administradores"
            className="menu-btn"
            title="Administradores"
          >
            <IconKey className="menu-icon" />
            <span className="menu-text">Administradores</span>
          </a>

          {/* Auditoria */}
          <a href="/adminpage/auditoria" className="menu-btn" title="Auditoria">
            <IconClipboardList className="menu-icon" />
            <span className="menu-text">Auditoria</span>
          </a>

          {/* Downloads gerais */}
          <a
            href="/adminpage/downloads"
            className="menu-btn"
            title="Downloads gerais"
          >
            <IconDownload className="menu-icon" />
            <span className="menu-text">Downloads gerais</span>
          </a>

          {/* Controle de Informação */}
          <a
            href="/adminpage/controle"
            className="menu-btn"
            title="Controle de Informação"
          >
            <IconCogs className="menu-icon" />
            <span className="menu-text">Controle de Informação</span>
          </a>

          {/* ➕ Registrar Demanda */}
          <a
            href="/adminpage/registrardemanda"
            className="menu-btn"
            title="Registrar demanda"
          >
            <svg
              className="menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="menu-text">Registrar demanda</span>
          </a>

          {/* 🔍 Consultar Demandas */}
          <a
            href="/adminpage/consultardemandas"
            className="menu-btn"
            title="Consultar demandas"
          >
            <svg
              className="menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm6.75-1.5L21 21"
              />
            </svg>
            <span className="menu-text">Consultar demandas</span>
          </a>

          {/* Sair */}
          <a
            href="/logout"
            className="menu-btn"
            title="Sair do sistema"
            style={{ color: "#e74c3c" }}
          >
            <IconLogout className="menu-icon" />
            <span className="menu-text">Sair</span>
          </a>
        </nav>
      </aside>
    </>
  );
}