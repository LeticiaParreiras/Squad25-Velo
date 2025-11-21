import React, { useState } from "react";
// Reusing icons for visual appeal
import { BsClipboardData } from "react-icons/bs";
import { PiPersonArmsSpread, PiTargetLight } from "react-icons/pi";
import { LuSchool, LuAlertTriangle } from "react-icons/lu";

// Mock Data
const totalAlunos = 1240;
const escolasAtivas = 20;
const mediaEnem = "675 pts";
const ultimaAtualizacao = "2025-11-19 13:30";

const dadosDesempenho = [
  { label: "Matemática", percent: 37, color: "#3682be" },
  { label: "Linguagens", percent: 41, color: "#FFC72C" },
  { label: "Ciências Humanas", percent: 30, color: "#0A436D" },
  { label: "Ciências Natureza", percent: 18, color: "#D2E9FF" },
];

// Reusable Metric Card (modified to fit 3 columns)
const MetricCard = ({ title, value, icon, color }) => (
    <div className="metric-card" style={{minHeight: '150px', backgroundColor: color, padding: '20px'}}>
      <div className="metric-icon-title" style={{color: 'white', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px', marginBottom: '10px'}}>
        {icon}
        <span className="metric-title" style={{fontWeight: 600}}>{title}</span>
      </div>
      <div className="metric-value" style={{fontSize: '34px', color: 'white'}}>{value}</div>
    </div>
);

// Donut Chart logic simulation
const DonutChart = ({ data }) => {
    const conicGradientStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: '0.5px solid #777777',
        // Valores fixos do Desempenho.jsx para simular a aparência
        background: 'conic-gradient(#3682be 0% 30%, #FFC72C 30% 65%, #0A436D 65% 90%, #D2E9FF 90% 100%)',
        boxShadow: '0 0 0 35px #fff inset',
        position: 'relative',
    };
    const percentages = {
        Matemática: "37%",
        Linguagens: "41%",
        "Ciências Humanas": "30%",
        "Ciências Natureza": "18%",
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3 style={{marginBottom: '10px', color: '#0B3C5D'}}>Desempenho por Área</h3>
            <div style={{position: 'relative', width: '200px', height: '200px'}}>
                <div style={conicGradientStyle} />
                {/* Labels de Porcentagem Simulados */}
                <span style={{position: 'absolute', top: '10px', right: '110px', fontWeight: '600', color: '#333'}}>{percentages["Matemática"]}</span>
                <span style={{position: 'absolute', top: '80px', left: '-30px', fontWeight: '600', color: '#333'}}>{percentages["Linguagens"]}</span>
                <span style={{position: 'absolute', bottom: '10px', left: '100px', fontWeight: '600', color: '#333'}}>{percentages["Ciências Humanas"]}</span>
            </div>
            <p style={{fontSize: '0.85rem', color: '#7f8c8d', marginTop: '15px'}}>Última avaliação de simulação ENEM</p>
        </div>
    );
};

// Simple Bar Chart Simulation
const BarChartSimulation = () => {
    const data = [
        { label: 'Jan', value: 80, color: '#3682be' },
        { label: 'Fev', value: 90, color: '#0A436D' },
        { label: 'Mar', value: 70, color: '#3682be' },
        { label: 'Abr', value: 100, color: '#FFC72C' },
        { label: 'Mai', value: 85, color: '#3682be' },
        { label: 'Jun', value: 95, color: '#0A436D' },
    ];
    const maxValue = 100;
    
    const chartStyle = {
        display: 'flex',
        alignItems: 'flex-end',
        height: '150px',
        gap: '10px',
        padding: '10px',
        borderLeft: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
    };
    
    const barStyle = (value, color) => ({
        width: '20px',
        height: `${(value / maxValue) * 100}%`,
        backgroundColor: color,
        borderRadius: '3px 3px 0 0',
        transition: 'height 0.5s ease',
        position: 'relative',
    });
    
    const labelStyle = {
        textAlign: 'center',
        fontSize: '0.75rem',
        color: '#555',
        marginTop: '5px',
    };
    
    return (
        <div style={{padding: '15px'}}>
            <h3 style={{marginBottom: '10px', color: '#0B3C5D'}}>Tendência Mensal (Score Médio)</h3>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <div style={chartStyle}>
                    {data.map((item, index) => (
                        <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div style={barStyle(item.value, item.color)} title={`${item.value}`}></div>
                            <span style={labelStyle}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
             <p style={{fontSize: '0.85rem', color: '#7f8c8d', marginTop: '15px'}}>Comparação do score médio do 1º semestre</p>
        </div>
    );
};

// Alerts/Insights Panel
const InsightPanel = () => {
    const insights = [
        { text: "75% dos administradores completaram o treinamento de segurança.", type: "success" },
        { text: "34 logins falhos detectados na última hora.", type: "warning" },
        { text: "Taxa de suspensão de usuários aumentou 5% este mês.", type: "info" },
    ];
    
    const panelStyle = {
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        padding: '25px',
        gridColumn: 'span 3', 
        marginTop: '30px',
    };
    
    const insightItemStyle = (type) => {
        let color = '#3498db'; 
        if (type === 'warning') color = '#e74c3c'; 
        if (type === 'success') color = '#27ae60'; 
        
        return {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 0',
            borderBottom: '1px solid #f0f0f0',
            color: color,
            fontWeight: 500,
        };
    };
    
    return (
        <div style={panelStyle}>
            <h2 style={{fontSize: '1.5rem', color: '#0B3C5D', marginBottom: '15px', borderBottom: '2px solid #ddd', paddingBottom: '10px'}}>Insights e Alertas de Administração</h2>
            {insights.map((insight, index) => (
                <div key={index} style={insightItemStyle(insight.type)}>
                    <LuAlertTriangle size={20} />
                    <span>{insight.text}</span>
                </div>
            ))}
        </div>
    );
};


// Estilos de Layout para o Dashboard
const dashboardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '20px',
    marginTop: '25px',
};

const chartGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr', 
    gap: '30px',
    marginTop: '40px',
};

const chartCardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    padding: '20px',
};


export default function Dashboard() {
    const anosEnem = ["2025", "2024", "2023"];
    const [selectedYear, setSelectedYear] = useState("2025");
    
    const handleYearSelect = (e) => {
        setSelectedYear(e.target.value);
    };

    return (
        <div className="dashboard-container"> 
            
            <h1 className="section-title">
                <span className="section-title-icon">
                    <BsClipboardData />
                </span>
                Dashboard Inteligente
            </h1>
            
            <p className="page-description" style={{marginBottom: '20px'}}>
                Análise em tempo real do desempenho e segurança do sistema.
            </p>

            {/* CONTROLES E FILTROS (Reutiliza classes da tabela de Usuários) */}
            <div className="controle-tabela" style={{justifyContent: 'flex-start', gap: '20px'}}>
                <div className="filtro-wrapper">
                    <label htmlFor="filterYear">Ano de Referência:</label>
                    <select
                        id="filterYear"
                        value={selectedYear}
                        onChange={handleYearSelect}
                        className="filtro-select"
                        style={{minWidth: '100px'}}
                    >
                        {anosEnem.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
                <button className="btn-add" style={{marginTop: 0, padding: '10px 15px'}}>
                    Aplicar Filtro
                </button>
                <span style={{color: '#7f8c8d', marginLeft: '20px', fontSize: '0.9rem'}}>
                    Última Atualização: {ultimaAtualizacao}
                </span>
            </div>
            
            {/* 1. KPIs / MÉTRICAS DE TOPO */}
            <div style={dashboardGridStyle}>
                <MetricCard 
                    title="Total de Alunos (Ativos)" 
                    value={totalAlunos} 
                    icon={<PiPersonArmsSpread size={24}/>}
                    color="#0B3C5D" 
                />
                <MetricCard 
                    title="Média ENEM Anual" 
                    value={mediaEnem} 
                    icon={<PiTargetLight size={24}/>}
                    color="#3282B8" 
                />
                <MetricCard 
                    title="Escolas Ativas Monitoradas" 
                    value={escolasAtivas} 
                    icon={<LuSchool size={24}/>}
                    color="#FFC72C" 
                />
            </div>
            
            {/* 2. GRÁFICOS */}
            <div style={chartGridStyle}>
                <div style={chartCardStyle}>
                    <DonutChart data={dadosDesempenho} />
                </div>
                <div style={chartCardStyle}>
                    <BarChartSimulation />
                </div>
            </div>
            
            {/* 3. PAINEL DE INSIGHTS E ALERTAS */}
            <InsightPanel />

            {/* Adicionando estilos de container para que os estilos de home page funcionem no dashboard-container */}
             <style>{`
                .dashboard-container {
                    padding-left: 50px;
                    margin-right: 12%;
                    width: 1400px;
                    margin-top: 100px; 
                    margin-bottom: 100px;
                    margin-left: 10%;
                    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
                    background-color: #f7f9fc; 
                }
                .metric-card {
                    background-color: #fff;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    padding: 25px;
                    min-height: 120px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            `}</style>

        </div>
    );
}