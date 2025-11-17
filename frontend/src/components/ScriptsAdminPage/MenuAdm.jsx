import React from "react";
import { Link } from "react-router-dom";
import "../../styles/StylesAdminPage/menuadm.css";

export default function MenuAdm() {
  return (
    <aside className="menu-container">
      <h2 className="menu-title">Menu</h2>

      <div className="menu-buttons">
        <Link to="/adminpage/usuarios" className="menu-btn">Usuários</Link>
        <Link to="/adminpage/administradores" className="menu-btn">Administradores</Link>
        <Link to="/adminpage/auditoria" className="menu-btn">Auditoria</Link>
        <Link to="/adminpage/downloads" className="menu-btn">Downloads gerais</Link>
        <Link to="/adminpage/controle" className="menu-btn">Controle de Informação</Link>
      </div>
    </aside>
  );
}
