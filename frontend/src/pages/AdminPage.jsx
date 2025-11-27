import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuAdm from "../components/ScriptsAdminPage/MenuAdm";
import Usuarios from "../components/ScriptsAdminPage/Usuarios";
import Header from "../components/ScriptsAdminPage/Header";
import Administradores from "../components/ScriptsAdminPage/Administradores";
import Auditoria from "../components/ScriptsAdminPage/Auditoria";
import ControleInformacao from "../components/ScriptsAdminPage/Controleinformacao";
import Downloads from "../components/ScriptsAdminPage/Downloads";
import RegistrarDemandas from "../components/ScriptsAdminPage/RegistrarDemandas";
import ConsultarDemandas from "../components/ScriptsAdminPage/ConsultarDemandas";
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
          <Route path="administradores" element={<Administradores />} />
          <Route path="controle" element={<ControleInformacao />} />
          <Route path="auditoria" element={<Auditoria />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="registrardemanda" element={<RegistrarDemandas />} />
          <Route path="consultardemandas" element={<ConsultarDemandas />} />
        </Routes>
      </div>
    </>
  );
}
