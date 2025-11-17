import React from "react";
import "../../styles/StylesAdminPage/usuarios.css";
import { FiEdit, FiTrash2, FiMoon, FiPlus } from "react-icons/fi";

export default function Usuarios() {
  const usuarios = [
    { id: 1, nome: "Alena", email: "uadams@icloud.com", status: "Ativa" },
    { id: 2, nome: "Tiana", email: "bgreen@hotmail.com", status: "Ativa" },
    { id: 3, nome: "Jakob", email: "mgreen@yahoo.com", status: "Suspensa" },
    { id: 4, nome: "Lincoln", email: "qrodriguez@aol.com", status: "Ativa" },
    { id: 5, nome: "Alfonso", email: "plewis@gmail.com", status: "Suspensa" },
  ];

  return (
    <div className="usuarios-container">
      
      <h1>Usuários</h1>

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
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td className="acoes">
                <button className="btn-editar">
                  <FiEdit /> Editar
                </button>

                <button className="btn-suspender">
                  <FiMoon /> Suspender
                </button>

                <button className="btn-excluir">
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn-add">
        <FiPlus /> Adicionar usuário
      </button>
    </div>
  );
}
