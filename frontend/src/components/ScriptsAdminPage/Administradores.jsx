import React, { useState } from "react";
// Importamos FiMoon, mantendo a consistência dos ícones da tela de Usuários.
import { FiEdit, FiTrash2, FiPlus, FiMoon } from "react-icons/fi";
// Importamos o CSS de estilos globais/reutilizáveis
import "../../styles/StylesAdminPage/usuarios.css"; 

// --- Dados Mockados para a Tela de Administradores ---
const dadosAdministradores = {
  // Tabela 1: Perfil Principal
  principal: [
    { id: 1, nome: "Gestor", email: "uadams@icloud.com", status: "Ativa" },
  ],
  // Tabela 2: Demais Administradores
  demais: [
    { id: 1, nome: "Gestor", email: "gestor@siged.com", status: "Ativa" },
    { id: 2, nome: "Carla", email: "carla@empresa.com", status: "Ativa" },
    { id: 3, nome: "Roberto", email: "roberto@empresa.com", status: "Suspensa" },
  ],
};

export default function Administradores() {
  // Função auxiliar para renderizar o Status com cores (reutiliza classes do CSS de usuários)
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
      
      <h1>Administradores</h1>
      
      <p className="page-description">
        Gerencie e defina as permissões de acesso dos administradores do sistema. O Perfil Principal não pode ser editado ou suspenso diretamente.
      </p>

      {/* --- TABELA 1: PERFIL PRINCIPAL --- */}
      <h2 className="table-title-adm">Perfil Principal</h2>
      <table className="tabela-usuarios tabela-administradores-principal">
        <thead>
          <tr className="header-principal"> 
            <th>ID</th>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>STATUS</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {dadosAdministradores.principal.map((adm) => (
            <tr key={`principal-${adm.id}`}>
              <td>{adm.id}</td>
              <td>{adm.nome}</td>
              <td>{adm.email}</td>
              <td>{renderStatus(adm.status)}</td>
              <td className="acoes">
                {/* Ação específica para o Perfil Principal (Link azul) */}
                <a href={`/adminpage/perfil/${adm.id}`} className="link-perfil-principal">
                    Perfil principal
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- TABELA 2: DEMAIS ADMINISTRADORES --- */}
      <h2 className="table-title-adm">Demais Administradores</h2>
      <table className="tabela-usuarios tabela-administradores-demais">
        <thead>
          <tr className="header-demais">
            <th>ID</th>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>STATUS</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {dadosAdministradores.demais.map((adm) => (
            <tr key={`demais-${adm.id}`}>
              <td>{adm.id}</td>
              <td>{adm.nome}</td>
              <td>{adm.email}</td>
              <td>{renderStatus(adm.status)}</td>
              <td className="acoes acoes-demais">
                {/* Botão Editar (usa FiEdit como na tela de Usuários) */}
                <button className="btn-editar">
                  <FiEdit /> Editar
                </button>
                
                {/* Botão Suspender/Reativar: Usa FiMoon como na tela de Usuários */}
                <button className="btn-suspender-adm">
                  <FiMoon />
                  {adm.status === "Suspensa" ? "Reativar" : "Suspender"}
                </button>

                {/* Botão Excluir (usa FiTrash2 como na tela de Usuários) */}
                <button className="btn-excluir btn-icon-only" title="Excluir">
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- BOTÃO CADASTRAR NOVO ADMINISTRADOR --- */}
      <button className="btn-add btn-add-admin">
        <FiPlus /> Cadastrar novo administrador
      </button>
    </div>
  );
}