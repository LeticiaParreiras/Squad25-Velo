import React, { useState, useMemo } from "react";
import "../../styles/StylesAdminPage/usuarios.css";
// Importado FiSearch para o campo de busca
import { FiEdit, FiTrash2, FiMoon, FiPlus, FiSearch } from "react-icons/fi";

export default function Usuarios() {
  // Lista de usuários estática (adicionado um usuário "Inativa" para teste do filtro)
  const dadosIniciais = [
    { id: 1, nome: "Alena", email: "uadams@icloud.com", status: "Ativa" },
    { id: 2, nome: "Tiana", email: "bgreen@hotmail.com", status: "Ativa" },
    { id: 3, nome: "Jakob", email: "mgreen@yahoo.com", status: "Suspensa" },
    { id: 4, nome: "Lincoln", email: "qrodriguez@aol.com", status: "Ativa" },
    { id: 5, nome: "Alfonso", email: "plewis@gmail.com", status: "Suspensa" },
    { id: 6, nome: "Jéssica", email: "jessica@email.com", status: "Inativa" },
  ];

  // Estados para busca e filtro
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  // Lógica de Filtragem e Busca usando useMemo para otimização
  const usuariosFiltrados = useMemo(() => {
    return dadosIniciais.filter(user => {
      // 1. Lógica de Busca: Verifica se o termo está no nome OU no email (case-insensitive)
      const matchSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Lógica de Filtro: Verifica o status
      const matchStatus = filterStatus === "Todos" || user.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [searchTerm, filterStatus]);

  // Função auxiliar para renderizar o Status com cores (classes definidas no CSS)
  const renderStatus = (status) => {
    let className = "status-badge";
    if (status === "Ativa") {
      className += " status-ativa";
    } else if (status === "Suspensa") {
      className += " status-suspensa";
    } else if (status === "Inativa") {
      className += " status-inativa";
    }
    return <span className={className}>{status}</span>;
  };

  return (
    <div className="usuarios-container">
      
      <h1>Usuários</h1>
      
      {/* DESCRIÇÃO DISCRETA DA PÁGINA - NOVO ELEMENTO */}
      <p className="page-description">
        Gerencie e monitore todos os usuários cadastrados. Utilize os campos de busca e filtro para localizar e modificar rapidamente as contas, ou adicione um novo registro.
      </p>

      {/* CONTROLES DE BUSCA E FILTRO */}
      <div className="controle-tabela">
        {/* Campo de Busca */}
        <div className="busca-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="busca-input"
          />
        </div>

        {/* Filtro por Status */}
        <div className="filtro-wrapper">
          <label htmlFor="filterStatus">Status:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filtro-select"
          >
            <option value="Todos">Todos</option>
            <option value="Ativa">Ativa</option>
            <option value="Suspensa">Suspensa</option>
            <option value="Inativa">Inativa</option>
          </select>
        </div>
      </div>
      
      <table className="tabela-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>STATUS</th>
            <th>AÇÕES</th>
          </tr>
        </thead>

        <tbody>
          {/* Mapeia usuários filtrados */}
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{renderStatus(user.status)}</td> {/* Aplica a função de renderização de status */}
                <td className="acoes">
                  <button className="btn-editar">
                    <FiEdit /> Editar
                  </button>
                  {/* Alterna texto do botão de suspender/reativar */}
                  <button className="btn-suspender">
                    <FiMoon /> {user.status === "Suspensa" ? "Reativar" : "Suspender"}
                  </button>

                  <button className="btn-excluir">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
             <tr>
               <td colSpan="5" className="no-results">
                 Nenhum usuário encontrado com os filtros aplicados.
               </td>
             </tr>
          )}
        </tbody>
      </table>

      <button className="btn-add">
        <FiPlus /> Adicionar usuário
      </button>
    </div>
  );
}