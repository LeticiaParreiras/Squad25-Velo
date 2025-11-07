import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiPersonArmsSpread } from "react-icons/pi";
import { LuSchool } from "react-icons/lu";
import { BsClipboardData } from "react-icons/bs";
import "../../assets/styles/visaogeral.css";

const anosEnem = Array.from({ length: 25 }, (_, i) => 2024 - i);

const capitais = [
  "Distrito Federal (Brasília)",
  "Acre (Rio Branco)",
  "Alagoas (Maceió)",
  "Amapá (Macapá)",
  "Amazonas (Manaus)",
  "Bahia (Salvador)",
  "Ceará (Fortaleza)",
  "Espírito Santo (Vitória)",
  "Goiás (Goiânia)",
  "Maranhão (São Luís)",
  "Mato Grosso (Cuiabá)",
  "Mato Grosso do Sul (Campo Grande)",
  "Minas Gerais (Belo Horizonte)",
  "Pará (Belém)",
  "Paraíba (João Pessoa)",
  "Paraná (Curitiba)",
  "Pernambuco (Recife)",
  "Piauí (Teresina)",
  "Rio de Janeiro (Rio de Janeiro)",
  "Rio Grande do Norte (Natal)",
  "Rio Grande do Sul (Porto Alegre)",
  "Rondônia (Porto Velho)",
  "Roraima (Boa Vista)",
  "Santa Catarina (Florianópolis)",
  "São Paulo (São Paulo)",
  "Sergipe (Aracaju)",
  "Tocantins (Palmas)",
].sort();

const DropdownFilter = ({
  label,
  items,
  selectedValue,
  onSelect,
  initialText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  const buttonText = selectedValue || initialText;

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className={`filter-button dropdown ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText}{" "}
        <span className="arrow">
          <MdKeyboardArrowDown />
        </span>
      </button>

      <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        {items.map((item) => (
          <div
            key={item}
            className={`dropdown-item ${
              item === selectedValue ? "selected" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon }) => (
  <div className="metric-card">
    <div className="metric-icon-title">
      {icon === "alunos" ? (
        <span className="icon">
          <PiPersonArmsSpread />
        </span>
      ) : (
        <span className="icon">
          <LuSchool />
        </span>
      )}
      <span className="metric-title">{title}</span>
    </div>
    <div className="metric-value">{value}</div>
  </div>
);

const UpdateCard = ({ date }) => (
  <div className="update-card">
    <div className="update-title">Última Atualização</div>
    <div className="update-date">{date}</div>
  </div>
);

const VisaoGeral = () => {
  const [selectedEnemYear, setSelectedEnemYear] = useState("ENEM 2024");
  const [selectedCapital, setSelectedCapital] = useState("Distrito Federal");
  const totalAlunos = 1240;
  const escolasAtivas = 20;
  const ultimaAtualizacao = "25/09/2025";
  const handleEnemSelect = (year) => {
    setSelectedEnemYear(year);
    console.log(`Filtro de ENEM aplicado: ${year}`);
  };

  const handleCapitalSelect = (capital) => {
    const buttonDisplay = capital.split("(")[0].trim();
    setSelectedCapital(buttonDisplay);
    console.log(`Filtro de Capital aplicado: ${capital}`);
  };

  return (
    <div className="dashboard-container">
      <h1 className="section-title">
        <span className="section-title-icon">
          <BsClipboardData />
        </span>
        Dashboard - Visão Geral
      </h1>

      <div className="dashboard-filters">
        <DropdownFilter
          initialText="ENEM 2024"
          items={anosEnem.map(String)}
          selectedValue={selectedEnemYear}
          onSelect={handleEnemSelect}
        />

        <DropdownFilter
          initialText="Distrito Federal"
          items={capitais}
          selectedValue={selectedCapital}
          onSelect={handleCapitalSelect}
        />
        <button className="filter-button primary">Aplicar filtro</button>
      </div>

      <div className="dashboard-metrics-grid">
        <MetricCard title="Total de Alunos" value={totalAlunos} icon="alunos" />
        <MetricCard
          title="Escolas ativas"
          value={escolasAtivas}
          icon="escolas"
        />
        <UpdateCard date={ultimaAtualizacao} />
      </div>
    </div>
  );
};

export default VisaoGeral;
