import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuAdm from "../components/ScriptsAdminPage/MenuAdm";
import Usuarios from "../components/ScriptsAdminPage/Usuarios";
import Header from "../components/ScriptsAdminPage/Header";
// Importado o componente Administradores com o caminho correto
import Administradores from "../components/ScriptsAdminPage/Administradores";
import Auditoria from "../components/ScriptsAdminPage/Auditoria";
/* import Auditoria from "../components/Auditoria";
import DownloadsGerais from "../components/DownloadsGerais";
import ControleInformacao from "../components/ControleInformacao"; */
import "../styles/StylesAdminPage/adminpage.css"; //

export default function AdminPage() {
  return (
    <>
      <Header />
      <div id="admin-container">
      <MenuAdm />
        <Routes>
          <Route path="/" element={<Usuarios />} />
          <Route path="usuarios" element={<Usuarios />} />
          {/* Rota de Administradores ativada, usando o componente importado */}
          <Route path="administradores" element={<Administradores />} />
          <Route path="auditoria" element={<Auditoria />}  />
          
          {/* <Route path="auditoria" element={<Auditoria />} />
          <Route path="downloads" element={<DownloadsGerais />} />
          <Route path="controle" element={<ControleInformacao />} /> */}
          
          {/* Rota padrão ao entrar no painel */}
          {/* <Route path="*" element={<Usuarios />} /> */}
        </Routes>
        </div>
    </>
  );
}