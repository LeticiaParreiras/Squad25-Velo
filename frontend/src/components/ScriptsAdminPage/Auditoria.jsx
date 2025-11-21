import React, { useState, useMemo } from "react";
// Reutilizando o CSS de usuários para a estilização da tabela e container
import "../../styles/StylesAdminPage/usuarios.css"; 
// Importando ícones relevantes (Search para busca, Download e Eye para detalhes)
import { FiEye, FiSearch, FiDownload } from "react-icons/fi";

export default function Auditoria() {
  // --- Dados de Log de Auditoria Mockados (Separados por Tipo) ---
  const dadosIniciais = [
    // Logs de Usuários
    { id: 1, tipo: "USUARIO", acao: "Login", usuario: "gestor@siged.com", dataHora: "2025-11-19 10:00:00", status: "Sucesso", detalhes: "Acesso realizado." },
    { id: 2, tipo: "USUARIO", acao: "Visualização", usuario: "uadams@icloud.com", dataHora: "2025-11-19 10:05:30", status: "Sucesso", detalhes: "Visualizou relatório X." },
    { id: 3, tipo: "USUARIO", acao: "Logout", usuario: "uadams@icloud.com", dataHora: "2025-11-19 10:10:15", status: "Sucesso", detalhes: "Sessão encerrada." },
    // Logs de Administradores
    { id: 4, tipo: "ADMIN", acao: "Cadastro", usuario: "admin_principal@siged.com", dataHora: "2025-11-19 10:15:45", status: "Sucesso", detalhes: "Cadastrou novo admin." },
    { id: 5, tipo: "ADMIN", acao: "Suspender", usuario: "admin_principal@siged.com", dataHora: "2025-11-19 10:20:00", status: "Sucesso", detalhes: "Suspendeu usuário ID 5." },
    { id: 6, tipo: "ADMIN", acao: "Login", usuario: "admin_secundario@email.com", dataHora: "2025-11-19 10:25:00", status: "Falha", detalhes: "Tentativa de login falhou." },
  ];

  // Estados para busca, filtro e formato de download
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [downloadFormat, setDownloadFormat] = useState("xls"); // Estado para o formato

  // Lógica de Filtragem e Busca usando useMemo para otimização
  const logsFiltrados = useMemo(() => {
    return dadosIniciais.filter(log => {
      const matchSearch = log.acao.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.detalhes.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = filterStatus === "Todos" || 
                         (filterStatus === "Sucesso" && log.status === "Sucesso") ||
                         (filterStatus === "Falha" && log.status === "Falha");

      return matchSearch && matchStatus;
    });
  }, [searchTerm, filterStatus, dadosIniciais]);

  // Separação dos logs filtrados em duas categorias
  const logsUsuarios = logsFiltrados.filter(log => log.tipo === "USUARIO");
  const logsAdministradores = logsFiltrados.filter(log => log.tipo === "ADMIN");

  // Função auxiliar para renderizar o Status com cores
  const renderStatus = (status) => {
    let className = "status-badge";
    if (status === "Sucesso") {
      className += " status-ativa"; // Azul para Sucesso
    } else if (status === "Falha") {
      className += " status-suspensa"; // Cinza/Neutro para Falha
    }
    return <span className={className}>{status}</span>;
  };

  const handleVerDetalhes = (log) => {
    alert(`Detalhes da Ação ${log.id}:\nAção: ${log.acao}\nUsuário: ${log.usuario}\nData: ${log.dataHora}\nStatus: ${log.status}\nDescrição: ${log.detalhes}`);
  };

  const handleDownload = (tipo) => {
    const tipoTexto = tipo === "GERAL" ? "Geral" : tipo;
    alert(`Baixando histórico ${tipoTexto} no formato .${downloadFormat}...`);
  };

  const TableComponent = ({ title, logs }) => (
    <>
      <h2 className="table-title-adm" style={{ marginTop: '40px' }}>{title}</h2> 
      <table className="tabela-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>AÇÃO</th>
            <th>USUÁRIO</th>
            <th>DATA/HORA</th>
            <th>STATUS</th>
            <th>DETALHES</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td style={{ textAlign: 'left' }}>{log.acao}</td>
                <td>{log.usuario}</td>
                <td>{log.dataHora}</td>
                <td>{renderStatus(log.status)}</td> 
                <td className="acoes">
                  <button className="btn-editar" onClick={() => handleVerDetalhes(log)}>
                    <FiEye /> Detalhes
                  </button>
                </td>
              </tr>
            ))
          ) : (
             <tr>
               <td colSpan="6" className="no-results">
                 Nenhum log encontrado para {title.toLowerCase()} com os filtros aplicados.
               </td>
             </tr>
          )}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="usuarios-container"> 
      
      <h1>Auditoria</h1>
      
      <p className="page-description">
        Visualize e monitore todas as ações registradas no sistema. Utilize a busca para localizar logs específicos de usuários ou ações.
      </p>

      {/* CONTROLES DE BUSCA E FILTRO (MANTIDOS) */}
      <div className="controle-tabela">
        <div className="busca-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por ação, usuário ou detalhes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="busca-input"
          />
        </div>

        <div className="filtro-wrapper">
          <label htmlFor="filterStatus">Status:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filtro-select"
          >
            <option value="Todos">Todos</option>
            <option value="Sucesso">Sucesso</option>
            <option value="Falha">Falha</option>
          </select>
        </div>
      </div>
      
      {/* --- TABELAS SEPARADAS --- */}
      <TableComponent title="Histórico de Usuários" logs={logsUsuarios} />
      <TableComponent title="Histórico de Administradores" logs={logsAdministradores} />

      {/* --- BOTÕES DE DOWNLOAD COM SELETOR DE FORMATO (AJUSTADOS) --- */}
      <div style={downloadControlsContainerStyle}>
        
        {/* Seletor de Formato (Lado Esquerdo) */}
        <div className="filtro-wrapper">
          <label htmlFor="downloadFormat">Formato de Download:</label>
          <select
            id="downloadFormat"
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="filtro-select"
            style={{ minWidth: '80px' }}
          >
            <option value="xls">.XLS</option>
            <option value="pdf">.PDF</option>
          </select>
        </div>

        {/* Botões de Download (Lado Direito, Compactados) */}
        <div style={downloadButtonsGroupStyle}>
            <button 
                className="btn-download-audit" 
                onClick={() => handleDownload('Usuários')}
                style={downloadButtonStyle}
            >
                <FiDownload size={16} /> Histórico de Usuários
            </button>

            <button 
                className="btn-download-audit" 
                onClick={() => handleDownload('Administradores')}
                style={downloadButtonStyle}
            >
                <FiDownload size={16} /> Histórico de Administradores
            </button>

            <button 
                className="btn-download-audit" 
                onClick={() => handleDownload('GERAL')}
                style={downloadButtonStyle}
            >
                <FiDownload size={16} /> Histórico Geral
            </button>
        </div>
      </div>
      
      {/* --- INCLUSÃO DA NOVA CLASSE DE BOTÃO (Estilo Compacto) --- */}
      <style>{`
        .btn-download-audit {
          padding: 8px 15px; /* Reduz o padding */
          background: #3282B8;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem; /* Fonte um pouco menor */
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: 0.2s;
          box-shadow: 0 2px 4px rgba(50, 130, 184, 0.2);
        }
        
        .btn-download-audit:hover {
          background: #2974a4;
          box-shadow: 0 4px 8px rgba(50, 130, 184, 0.3);
        }
      `}</style>
    </div>
  );
}

// --- Estilos Inline para Organização ---

const downloadControlsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '50px',
    padding: '15px 0',
    borderTop: '1px solid #f0f0f0',
};

const downloadButtonsGroupStyle = {
    display: 'flex',
    gap: '10px', // Diminui o espaço entre os botões
    alignItems: 'center',
};

const downloadButtonStyle = {
  // Ajustes de margem e layout feitos na classe .btn-download-audit e no grupo acima
};