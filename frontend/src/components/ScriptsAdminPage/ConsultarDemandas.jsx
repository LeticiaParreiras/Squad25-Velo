import React, { useState } from "react";
import "../../styles/StylesAdminPage/consultarDemandas.css";
import { FiTrash } from "react-icons/fi";

const API_URL = "http://127.0.0.1:8000";

export default function ConsultarDemandas() {
  const [filtros, setFiltros] = useState({
    status: "",
    prioridade: "",
    categoria: "",
  });

  const [resultado, setResultado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const buscarDemandas = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${API_URL}/demandas?skip=0&limit=100` +
        `&prioridade=${filtros.prioridade || ""}` +
        `&status=${filtros.status || ""}` +
        `&categoria=${filtros.categoria || ""}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar demandas");
      }

      const data = await response.json();
      setResultado(data);
    } catch (err) {
      setError(err.message);
      setResultado([]);
    } finally {
      setLoading(false);
    }
  };
  const deleteDemanda = async (id) => {
  try {
    const response = await fetch(`${API_URL}/demandas/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Erro ao deletar:", error);
      alert("Não foi possível deletar a demanda.");
      return;
    }

    alert("Demanda deletada com sucesso!");

    // atualiza a lista depois do delete
    buscarDemandas();
    
  } catch (error) {
    console.error("Erro inesperado:", error);
    alert("Erro inesperado ao tentar deletar.");
  }
};

  const limparFiltros = () => {
    setFiltros({
      status: "",
      prioridade: "",
      categoria: "",
    });
    setResultado([]);
    setError(null);
  };

  const traduzirStatus = (status) => {
    const traducoes = {
      pendente: "Pendente",
      em_analise: "Em Análise",
      aprovada: "Aprovada",
      em_execucao: "Em Execução",
      concluida: "Concluída",
      rejeitada: "Rejeitada",
    };
    return traducoes[status] || status;
  };

  const traduzirPrioridade = (prioridade) => {
    const traducoes = {
      baixa: "Baixa",
      media: "Média",
      alta: "Alta",
      critica: "Crítica",
    };
    return traducoes[prioridade] || prioridade;
  };

  const traduzirCategoria = (categoria) => {
    const traducoes = {
      infraestrutura: "Infraestrutura",
      recursos_humanos: "Recursos Humanos",
      materiais_didaticos: "Materiais Didáticos",
      transporte_escolar: "Transporte Escolar",
      outros: "Outros",
    };
    return traducoes[categoria] || categoria;
  };
  

  return (
    <div className="consultar-container">
      <h1 className="consultar-title">Consultar Demandas</h1>
      <p className="consultar-description">
        Filtre e encontre demandas cadastradas no sistema.
      </p>

      <div className="consultar-card">
        <div className="filters-grid">
          <div className="form-group-consulta">
            <label className="label-consulta">Status</label>
            <select
              name="status"
              value={filtros.status}
              onChange={handleChange}
              className="select-consulta"
            >
              <option value="">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="em_analise">Em Análise</option>
              <option value="aprovada">Aprovada</option>
              <option value="em_execucao">Em Execução</option>
              <option value="concluida">Concluída</option>
              <option value="rejeitada">Rejeitada</option>
            </select>
          </div>

          <div className="form-group-consulta">
            <label className="label-consulta">Prioridade</label>
            <select
              name="prioridade"
              value={filtros.prioridade}
              onChange={handleChange}
              className="select-consulta"
            >
              <option value="">Todas</option>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>

          <div className="form-group-consulta">
            <label className="label-consulta">Categoria</label>
            <select
              name="categoria"
              value={filtros.categoria}
              onChange={handleChange}
              className="select-consulta"
            >
              <option value="">Todas</option>
              <option value="infraestrutura">Infraestrutura</option>
              <option value="recursos_humanos">Recursos Humanos</option>
              <option value="materiais_didaticos">Materiais Didáticos</option>
              <option value="transporte_escolar">Transporte Escolar</option>
              <option value="outros">Outros</option>
            </select>
          </div>
        </div>

        <div className="button-group">
          <button className="btn-buscar" onClick={buscarDemandas} disabled={loading}>
            {loading ? "Buscando..." : "Buscar Demandas"}
          </button>
          <button className="btn-limpar" onClick={limparFiltros}>
            Limpar Filtros
          </button>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {!loading && resultado.length > 0 && (
          <div className="result-container">
            <h3 className="result-title">
              {resultado.length} demanda(s) encontrada(s)
            </h3>
            <div className="table-container">
              <table className="demandas-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.map((demanda) => (
                    <tr key={demanda.id}>
                      <td>{demanda.id}</td>
                      <td>{demanda.titulo}</td>
                      <td>{traduzirCategoria(demanda.categoria)}</td>
                      <td>
                        <span className={`badge badge-prioridade-${demanda.prioridade}`}>
                          {traduzirPrioridade(demanda.prioridade)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-status-${demanda.status}`}>
                          {traduzirStatus(demanda.status)}
                        </span>
                      </td>
                      <td>
                        <span>
                          <button onClick={() => deleteDemanda(demanda.id)} className="excluir">
                            <FiTrash/>
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && resultado.length === 0 && !error && 
         filtros.status === "" && filtros.prioridade === "" && filtros.categoria === "" && (
          <p className="no-results">
            Use os filtros acima para buscar demandas
          </p>
        )}

        {!loading && resultado.length === 0 && !error && 
         (filtros.status !== "" || filtros.prioridade !== "" || filtros.categoria !== "") && (
          <p className="no-results">
            Nenhuma demanda encontrada com os filtros selecionados
          </p>
        )}
      </div>
    </div>
  );
}

