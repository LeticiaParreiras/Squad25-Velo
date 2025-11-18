import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuAdm from "../components/ScriptsAdminPage/MenuAdm";
import Usuarios from "../components/ScriptsAdminPage/Usuarios";
import Header from "../components/ScriptsAdminPage/Header";
/* import Administradores from "../components/Administradores";
import Auditoria from "../components/Auditoria";
import DownloadsGerais from "../components/DownloadsGerais";
import ControleInformacao from "../components/ControleInformacao"; */
import "../styles/StylesAdminPage/adminpage.css";

export default function AdminPage() {
  return (
    <>
      <Header />
      <div id="admin-container">
      <MenuAdm />
        <Routes>
          <Route path="/" element={<Usuarios />} />
          <Route path="usuarios" element={<Usuarios />} />
          {/* <Route path="administradores" element={<Administradores />} />
          <Route path="auditoria" element={<Auditoria />} />
          <Route path="downloads" element={<DownloadsGerais />} />
          <Route path="controle" element={<ControleInformacao />} /> */}

          {/* Rota padrão ao entrar no painel */}
          {/* <Route path="*" element={<Usuarios />} /> */}
        </Routes>
        </div>
    </>
  );
}
