import React, { useState } from "react";
import "../../styles/StylesAdminPage/registrarDemandas.css";
const API_URL = "http://127.0.0.1:8000";
export default function RegistrarDemandas() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    prioridade: "baixa",
    status: "pendente",
    categoria: "infraestrutura",
    estimativa_custo: undefined,
    responsavel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch(`${API_URL}/demandas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(form),
  });

  alert("Demanda criada!")
};
  return (
    <div className="registrar-container">
      <h1>Registrar Demanda</h1>
      <p className="registrar-description">
        Preencha as informações abaixo para registrar uma nova demanda.
      </p>

      <form className="registrar-card" onSubmit={handleSubmit}>
        <div className="form-group-rg">
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            required
            value={form.titulo}
            onChange={handleChange}
            placeholder="Digite o título"
          />
        </div>

        <div className="form-group-rg">
          <label>Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descreva a demanda (opcional)"
          ></textarea>
        </div>

        <div className="form-group-rg">
          <label>Prioridade (selecione)</label>
          <select name="prioridade" value={form.prioridade} onChange={handleChange}>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
            <option value="crítica">Crítica</option>
          </select>
        </div>

        <div className="form-group-rg">
          <label>Status (selecione)</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="pendente">Pendente</option>
            <option value="em_análise">Em análise</option>
            <option value="aprovada">Aprovada</option>
            <option value="em_execução">Em execução</option>
            <option value="concluida">Concluída</option>
            <option value="rejeitada">Rejeitada</option>
          </select>
        </div>

        <div className="form-group-rg">
          <label>Categoria (selecione)</label>
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            <option value="infraestrutura">Infraestrutura</option>
            <option value="recursos_humanos">Recursos Humanos</option>
            <option value="materiais_didáticos">Materiais Didáticos</option>
            <option value="transporte_escolar">Transporte Escolar</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="form-group-rg">
          <label>Estimativa de custo</label>
          <input
            type="number"
            step="0.01"
            name="estimativa_custo"
            value={form.estimativa_custo}
            onChange={handleChange}
            placeholder="Digite o valor (opcional)"
          />
        </div>

        <div className="form-group-rg">
          <label>Responsável</label>
          <input
            type="text"
            name="responsavel"
            value={form.responsavel}
            onChange={handleChange}
            placeholder="Nome do responsável (opcional)"
          />
        </div>

        <button className="btn-submit" type="submit">Registrar Demanda</button>
      </form>
    </div>
  );
}