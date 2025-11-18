import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import "../../styles/StylesHomePage/header.css";

export default function Header() {
  return (
    <>
      <div id="header">
        <nav id="navbar">
          <i id="navlogo">SIGED - Velo</i>
          <div className="navbar-list-container">
            <a href="#contacts">
              <button className="btn-perfil">Perfil <IoPersonSharp /></button>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
