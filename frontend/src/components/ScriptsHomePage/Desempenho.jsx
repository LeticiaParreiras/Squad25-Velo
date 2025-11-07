import React, { useState } from "react";
import { TbMobiledata } from "react-icons/tb";
import { TbReload } from "react-icons/tb";
import "../../assets/styles/desempenho.css";

const dadosDesempenho = [
  { label: "Matemática", percent: 37, color: "#3682be" },
  { label: "Ciências Humanas", percent: 30, color: "#0A436D" },
  { label: "Ciências da Natureza", percent: 18, color: "#D2E9FF" },
  { label: "Linguagens", percent: 41, color: "#FFC72C" },
];

const LegendItem = ({ label, color }) => (
  <div className="desempenho-legend-item">
    <div className="legend-color-box" style={{ backgroundColor: color }}></div>
    <span className="legend-label">{label}</span>
  </div>
);

const DonutChart = ({ data }) => {
  const totalPercent = data.reduce((sum, item) => sum + item.percent, 0);
  const percentages = {
    Matemática: "37%",
    Linguagens: "41%",
    "Ciências Humanas": "30%",
    "Ciências da Natureza": "18%",
  };

  return (
    <div className="donut-chart-container">
      <span className="percent-37">{percentages["Matemática"]}</span>
      <span className="percent-41">{percentages["Linguagens"]}</span>
      <span className="percent-30">{percentages["Ciências Humanas"]}</span>
      <span className="percent-18">{percentages["Ciências da Natureza"]}</span>

      <div className="donut-chart-simulation">
        <div className="donut-circle" />
      </div>
    </div>
  );
};

const Desempenho = () => {
  const [escola, setEscola] = useState("Definir escola");
  const [avaliacao, setAvaliacao] = useState("Avaliações");
  const ultimaAtualizacao = "25/06/2025";
  const handleEscolaSelect = (e) => setEscola(e.target.value);
  const handleAvaliacaoSelect = (e) => setAvaliacao(e.target.value);

  const handleUpdate = () => {
    alert("Dashboard atualizado com os filtros selecionados!");
  };

  return (
    <div className="desempenho-container">
      <h1 className="section-title">
        <span className="section-title-icon">
          <TbMobiledata />
        </span>
        Distribuição de Desempenho
      </h1>

      <div className="desempenho-content-card">
        <div className="desempenho-filters">
          <div className="filter-group">
            <label className="filter-label">Instituição</label>
            <button className="filter-dropdown-button">{escola} ▼</button>
          </div>

          <div className="filter-group">
            <label className="filter-label">Prova</label>
            <button className="filter-dropdown-button">{avaliacao} ▼</button>
          </div>

          <button className="update-button" onClick={handleUpdate}>
            <span className="update-icon">
              <TbReload />
            </span>{" "}
            Atualizar
          </button>
        </div>

        <div className="chart-legend-area">
          <div className="chart-wrapper">
            <DonutChart data={dadosDesempenho} />
          </div>

          <div className="legend-wrapper">
            {dadosDesempenho.map((item, index) => (
              <LegendItem key={index} label={item.label} color={item.color} />
            ))}
          </div>
        </div>
      </div>

      <div className="last-update-footer">
        Última atualização: {ultimaAtualizacao}
      </div>
    </div>
  );
};

export default Desempenho;
