import React, { useState } from "react";
// Removida a importação de Link, pois a tag <a> será usada.

// Componentes de Ícones SVG Inline (Heroicons style)
// Nota: Substituídos os ícones originais (Font Awesome) por equivalentes modernos (Heroicons)

// Icone Dashboard (Adicionado o caminho para um ícone de Dashboard típico - Grid)
const IconDashboard = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        {/* Usando um ícone de 'quadrados' (grid) para representar o Dashboard */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />   
    </svg>
);
// Icone original: IconBars (Menu) -> IconBars3 (Heroicons: Menu 3-barras)
const IconBars = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
// Icone original: IconTimes (Fechar) -> IconX (Heroicons: X)
const IconTimes = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);
// Icone original: IconUsers (Usuários) -> IconUsers (Heroicons)
const IconUsers = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);
// Icone original: IconUserShield (Administradores) -> IconKey (Heroicons: Chave) ou IconUserGroup
const IconKey = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);
// Icone original: IconClipboardList (Auditoria) -> IconClipboardDocumentList (Heroicons: Lista de documentos)
const IconClipboardList = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
    </svg>
);
// Icone original: IconDownload (Downloads gerais) -> IconCloudArrowDown (Heroicons: Nuvem com seta para baixo)
const IconDownload = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);
// Icone original: IconCogs (Controle de Informação) -> IconCog6Tooth (Heroicons: Engrenagem 6-dentes)
const IconCogs = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);


export default function MenuAdm() {
  // Estado para controlar se a sidebar está aberta (true) ou fechada (false)
  const [isOpen, setIsOpen] = useState(true); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Define a classe CSS com base no estado para controlar a largura
  const containerClass = isOpen ? "menu-container open" : "menu-container closed";

  return (
    <>
      <style>{`
        /* Container da Sidebar */
        .menu-container {
          /* Posicionamento Fixo na lateral esquerda */
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          padding-top: 50px; 
          background: #2c3e50; /* Azul escuro/cinza moderno para contraste */
          color: #ecf0f1; 
          transition: width 0.3s ease; /* Transição suave na abertura/fechamento */
          z-index: 1000;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
        }

        /* Estado Aberto (Largo) */
        .menu-container.open {
          width: 250px;
        }

        /* Estado Fechado (Estreito - apenas para ícones) */
        .menu-container.closed {
          width: 70px; 
        }

        /* Botão de Alternar (Toggle) */
        .toggle-btn {
          position: absolute;
          top: 20px; 
          right: -40px; /* Posiciona fora da sidebar */
          background: #3282b8; /* Cor original */
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 0 5px 5px 0;
          cursor: pointer;
          font-size: 1.3rem; 
          transition: right 0.3s ease, background-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Reposiciona o botão de toggle para dentro da sidebar quando fechada */
        .menu-container.closed .toggle-btn {
          right: 15px;
          border-radius: 5px;
        }

        .toggle-btn:hover {
          background: #2974a4; /* Tom mais escuro da cor original */
        }

        /* Título e Cabeçalho */
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

        /* Container de Botões */
        .menu-buttons {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px; 
          padding: 0 15px; 
        }

        /* Estilo do Botão (Link) */
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
          background: #34495e; /* Fundo levemente mais claro no hover */
          color: #ecf0f1; 
        }

        /* Estilo do Ícone */
        .menu-icon {
          /* Para ícones Heroicons, usamos 'stroke' para a cor */
          stroke: currentColor; 
          fill: none; /* Heroicons são geralmente ícones de linha */
          width: 1.3rem; /* Tamanho do ícone */
          height: 1.3rem;
          min-width: 25px;
          text-align: center; 
        }

        /* Estilo do Texto do Menu */
        .menu-text {
          white-space: nowrap;
          overflow: hidden;
          opacity: 1;
          transition: opacity 0.3s ease;
          font-weight: 500;
        }

        /* Oculta o texto quando a sidebar está fechada */
        .menu-container.closed .menu-text {
          display: none;
        }

        /* Ajusta o alinhamento central para ícones quando fechado */
        .menu-container.closed .menu-btn {
          justify-content: center; 
          padding: 12px 0; 
        }
      `}</style>
      <aside className={containerClass}>
        
        {/* Botão de Toggle para abrir/fechar a sidebar */}
        <button 
          className="toggle-btn" 
          onClick={toggleMenu} 
          title={isOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isOpen ? <IconTimes className="menu-icon" /> : <IconBars className="menu-icon" />}
        </button>

        <div className="menu-header">
          {/* O título só aparece quando o menu está aberto */}
          {isOpen && <h2 className="menu-title">Menu</h2>}
        </div>

        <nav className="menu-buttons">
          
          {/* 🚀 Dashboard (NOVO) */}
          <a href="/adminpage/dashboard" className="menu-btn" title="Dashboard">
            <IconDashboard className="menu-icon" />
            {isOpen && <span className="menu-text">Dashboard</span>}
          </a>

          {/* Usuários */}
          <a href="/adminpage/usuarios" className="menu-btn" title="Usuários">
            <IconUsers className="menu-icon" />
            {isOpen && <span className="menu-text">Usuários</span>}
          </a>
          
          {/* Administradores (usando IconKey para representar acesso/permissão) */}
          <a href="/adminpage/administradores" className="menu-btn" title="Administradores">
            <IconKey className="menu-icon" /> 
            {isOpen && <span className="menu-text">Administradores</span>}
          </a>
          
          {/* Auditoria */}
          <a href="/adminpage/auditoria" className="menu-btn" title="Auditoria">
            <IconClipboardList className="menu-icon" />
            {isOpen && <span className="menu-text">Auditoria</span>}
          </a>
          
          {/* Downloads gerais */}
          <a href="/adminpage/downloads" className="menu-btn" title="Downloads gerais">
            <IconDownload className="menu-icon" />
            {isOpen && <span className="menu-text">Downloads gerais</span>}
          </a>
          
          {/* Controle de Informação */}
          <a href="/adminpage/controle" className="menu-btn" title="Controle de Informação">
            <IconCogs className="menu-icon" />
            {isOpen && <span className="menu-text">Controle de Informação</span>}
          </a>
        </nav>
      </aside>
    </>
  );
}