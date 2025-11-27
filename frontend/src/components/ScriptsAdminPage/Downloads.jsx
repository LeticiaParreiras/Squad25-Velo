import React, { useState, useEffect } from "react";
import { FiDownload, FiRefreshCw, FiDatabase, FiCheckCircle, FiClock } from "react-icons/fi";
import "../../styles/StylesAdminPage/downloads.css";

// URL Base da API
const API_URL = "http://127.0.0.1:8000";

export default function Downloads() {
  // --- Estados do CENSO ---
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [statusCensoList, setStatusCensoList] = useState([]);
  const [loadingCenso, setLoadingCenso] = useState(false);

  // --- Estados do SIMEC ---
  const [statusSimec, setStatusSimec] = useState(null);
  const [loadingSimec, setLoadingSimec] = useState(false);

  // Gera anos de 2024 até 2000
  const anosDisponiveis = Array.from({ length: 25 }, (_, i) => String(2024 - i));

  // --- EFEITO DE POLLING (Atualização em tempo real) ---
  useEffect(() => {
    // Busca inicial
    fetchCensoStatus();
    fetchSimecStatus();

    // Cria um intervalo para atualizar os dados a cada 3 segundos
    // Isso faz a barra de progresso (MB baixados) atualizar na tela
    const intervalo = setInterval(() => {
      fetchCensoStatus();
      fetchSimecStatus();
    }, 3000);

    // Limpa o intervalo ao sair da página
    return () => clearInterval(intervalo);
  }, []);

  // --- Funções Auxiliares de Fetch ---
  const fetchCensoStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/censo/status`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include" // IMPORTANTE: Permite passar os cookies de Auth
      });
      if (response.ok) {
        const data = await response.json();
        setStatusCensoList(data);
      }
    } catch (error) {
      console.error("Erro ao buscar status do Censo:", error);
    }
  };

  const fetchSimecStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/simec/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.situacao) setStatusSimec(data);
      }
    } catch (error) {
      console.error("Erro ao buscar status do Simec:", error);
    }
  };

  // --- Ações ---

  const handleDownloadCenso = async () => {
    if (!anoSelecionado) return alert("Selecione um ano.");
    
    setLoadingCenso(true);
    try {
      const response = await fetch(`${API_URL}/censo/baixar/${anoSelecionado}`, {
        method: "POST",
        credentials: "include"
      });
      
      if (response.ok) {
        alert(`Download do Censo ${anoSelecionado} iniciado em segundo plano.`);
        fetchCensoStatus(); // Atualiza imediatamente
      } else {
        alert("Erro ao iniciar download. Verifique se o backend está rodando.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setLoadingCenso(false);
    }
  };

  const handleUpdateSimec = async () => {
    setLoadingSimec(true);
    try {
      const response = await fetch(`${API_URL}/simec/atualizar`, {
        method: "POST",
        credentials: "include"
      });
      
      if (response.ok) {
        const msg = await response.json();
        alert(msg.message);
        fetchSimecStatus();
      } else {
        alert("Erro ao solicitar atualização.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setLoadingSimec(false);
    }
  };

  // --- Helpers de Renderização ---
  const getStatusAno = (ano) => {
    const registro = statusCensoList.find(item => item.ano === String(ano));
    if (!registro) return null;
    return registro;
  };

  const renderBadge = (registro) => {
    if (!registro) return <span className="status-badge-dl status-pendente">Disponível</span>;
    
    if (registro.situacao === "Concluido") 
        return <span className="status-badge-dl status-concluido">Baixado <FiCheckCircle style={{marginLeft: 4, marginBottom: -2}}/></span>;
    
    if (registro.situacao === "Baixando") 
        return <span className="status-badge-dl status-baixando">Baixando ({Math.round(registro.progresso)} MB)</span>;
    
    return <span className="status-badge-dl status-erro">{registro.situacao}</span>;
  };

  return (
    <div className="downloads-container">
      <h1>Central de Downloads</h1>
      <p className="downloads-description">
        Mantenha as bases de dados do sistema atualizadas. O sistema monitora o progresso automaticamente.
      </p>

      <div className="downloads-grid">
        
        {/* === CARD DO CENSO === */}
        <div className="download-card">
          <div className="card-header-dl">
            <FiDatabase /> Dados do Censo Escolar
          </div>
          <div className="card-body-dl">
            <p style={{color: '#666', fontSize: '0.9rem'}}>
              Selecione o ano de referência para baixar os microdados.
            </p>

            <div className="form-group-dl">
              <label>Ano de Referência:</label>
              <select 
                className="select-ano" 
                value={anoSelecionado} 
                onChange={(e) => setAnoSelecionado(e.target.value)}
              >
                <option value="">Selecione um ano...</option>
                {anosDisponiveis.map(ano => {
                    const status = getStatusAno(ano);
                    const labelExtra = status && status.situacao === 'Concluido' ? ' (Baixado)' : '';
                    return (
                        <option key={ano} value={ano}>{ano}{labelExtra}</option>
                    )
                })}
              </select>
            </div>

            {anoSelecionado && (
                <div className="status-info" style={{marginTop: '15px'}}>
                    Status: {renderBadge(getStatusAno(anoSelecionado))}
                </div>
            )}

            <button 
                className="btn-action btn-primary" 
                onClick={handleDownloadCenso}
                disabled={loadingCenso || (getStatusAno(anoSelecionado)?.situacao === 'Baixando')}
            >
                {loadingCenso ? <FiRefreshCw className="spin" /> : <FiDownload />}
                {getStatusAno(anoSelecionado)?.situacao === 'Concluido' ? 'Baixar Novamente' : 'Iniciar Download'}
            </button>
          </div>
        </div>

        {/* === CARD DO SIMEC === */}
        <div className="download-card">
          <div className="card-header-dl">
            <FiRefreshCw /> Dados do SIMEC
          </div>
          <div className="card-body-dl">
             <p style={{color: '#666', fontSize: '0.9rem'}}>
              Sincronize os dados de obras e planejamento do MEC.
            </p>

            <div className="status-info" style={{marginTop: '20px'}}>
                <div style={{display:'flex', alignItems:'center', gap: '10px', marginBottom: '5px'}}>
                    <FiClock size={18} color="#0b3c5d"/> <strong>Última Atualização:</strong>
                </div>
                <div>
                    {statusSimec?.atualizado_em 
                        ? new Date(statusSimec.atualizado_em).toLocaleString('pt-BR') 
                        : "Nunca atualizado"}
                </div>
                <div style={{marginTop: '10px'}}>
                   <strong>Situação: </strong> 
                   {statusSimec?.situacao || "Pendente"}
                   {statusSimec?.situacao === 'Baixando' && ` (${Math.round(statusSimec.progresso || 0)} MB)`}
                </div>
            </div>

            <button 
                className="btn-action btn-primary" 
                onClick={handleUpdateSimec}
                disabled={loadingSimec || statusSimec?.situacao === 'Baixando'}
            >
                {loadingSimec || statusSimec?.situacao === 'Baixando' ? <FiRefreshCw className="spin" /> : <FiRefreshCw />}
                {statusSimec?.situacao === 'Baixando' ? 'Atualizando...' : 'Atualizar Base Agora'}
            </button>
          </div>
        </div>

      </div>
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}