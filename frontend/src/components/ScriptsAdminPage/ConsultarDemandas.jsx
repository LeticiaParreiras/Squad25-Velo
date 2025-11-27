import React, { useState } from "react";
import "../../styles/StylesAdminPage/consultarDemandas.css";

export default function ConsultarDemandas() {
  const [filtros, setFiltros] = useState({
    status: "",
    prioridade: "",
    categoria: "",
    data: "",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const buscarDemandas = () => {
    setResultado("Nenhuma demanda encontrada.");
  };

  return (
    <div className="registrar-container">
      <h1>Consultar Demandas</h1>
      <p className="registrar-description">Filtre e encontre demandas cadastradas no sistema.</p>

      <div className="registrar-card">
        <div className="form-group-rg">
          <label>Status</label>
          <select name="status" onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="pendente">Pendente</option>
            <option value="em_analise">Em Análise</option>
            <option value="aprovada">Aprovada</option>
            <option value="em_execucao">Em Execução</option>
            <option value="concluida">Concluída</option>
            <option value="rejeitada">Rejeitada</option>
          </select>
        </div>

        <div className="form-group-rg">
          <label>Prioridade</label>
          <select name="prioridade" onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </select>
        </div>

        <div className="form-group-rg">
          <label>Categoria</label>
          <select name="categoria" onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="infraestrutura">Infraestrutura</option>
            <option value="recursos_humanos">Recursos Humanos</option>
            <option value="materiais_didaticos">Materiais Didáticos</option>
            <option value="transporte_escolar">Transporte Escolar</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="form-group-rg">
          <label>Data</label>
          <input type="date" name="data" onChange={handleChange} />
        </div>

        <button className="btn-submit" onClick={buscarDemandas}>Buscar demandas</button>

        {resultado && (
          <p style={{ marginTop: "15px", fontWeight: "600", color: "#0b3c5d" }}>{resultado}</p>
        )}
      </div>
    </div>
  );
}
