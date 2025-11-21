import React, { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsPersonLinesFill } from "react-icons/bs";
import "../../styles/StylesAdminPage/controleinformacoes.css";

export default function ControleInformacao() {
  const [config, setConfig] = useState({
    widgets: {
      ControlarItem1: true,
      ControlarItem2: true,
      ControlarItem3: false,
      ControlarItem4: true,
      ControlarItem5: false,
    },
    filtros: {
      FiltrarDado1: true,
      FiltrarDado2: true,
      FiltrarDado3: false,
      FiltrarDado4: false,
    },
    permissoes: {
      Usuários: ["graficoVendas", "tabelaClientes"],
      Administradores: ["graficoVendas", "tabelaClientes", "rankingProdutos"],
      Gestores: [
        "graficoVendas",
        "tabelaClientes",
        "rankingProdutos",
        "indicadoresFinanceiros",
      ],
    },
  });

  // Atualiza switches
  const toggleValue = (section, key) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  return (
    <>
      <div className="controle-container">
        <h1 >⚙ Controle de Informação</h1>
        <p className="controle-description">
          Gerencie e monitore todos os usuários cadastrados. Utilize os campos
          de busca e filtro para localizar e modificar rapidamente as contas, ou
          adicione um novo registro.
        </p>
        <div className="controle-cards-container">
          {/* ============================
            1. Widgets
        ============================ */}
          <div className="section-box">
            <h2 className="controle-section-title"><AiOutlineSchedule /> Módulos da Dashboard</h2>

            {Object.keys(config.widgets).map((key) => (
              <div className="list-item" key={key}>
                <span>{key.replace(/([A-Z])/g, " $1")}</span>

                <div
                  className={`switch ${config.widgets[key] ? "active" : ""}`}
                  onClick={() => toggleValue("widgets", key)}
                >
                  <div className="switch-circle"></div>
                </div>
              </div>
            ))}
          </div>

          {/* ============================
            2. Filtros Globais
        ============================ */}
          <div className="section-box">
            <h2 className="controle-section-title"><FaMagnifyingGlass /> Filtros Globais Disponíveis</h2>

            {Object.keys(config.filtros).map((key) => (
              <div className="list-item" key={key}>
                <span>{key.replace(/([A-Z])/g, " $1")}</span>

                <div
                  className={`switch ${config.filtros[key] ? "active" : ""}`}
                  onClick={() => toggleValue("filtros", key)}
                >
                  <div className="switch-circle"></div>
                </div>
              </div>
            ))}
          </div>

          {/* ============================
            3. Permissões por perfil
        ============================ */}
          <div className="section-box full">
            <h2 className="controle-section-title"><BsPersonLinesFill /> Permissões por Perfil</h2>

            {Object.keys(config.permissoes).map((perfil) => (
              <div key={perfil} style={{ marginBottom: "20px" }}>
                <h3 style={{ marginBottom: "10px" }}>{perfil.toUpperCase()}</h3>

                {Object.keys(config.widgets).map((widget) => {
                  const hasPermission =
                    config.permissoes[perfil].includes(widget);

                  return (
                    <div className="list-item" key={widget}>
                      <span>{widget.replace(/([A-Z])/g, " $1")}</span>

                      <div
                        className={`switch ${hasPermission ? "active" : ""}`}
                        onClick={() => {
                          setConfig((prev) => {
                            const atual = prev.permissoes[perfil];
                            const novo = hasPermission
                              ? atual.filter((w) => w !== widget)
                              : [...atual, widget];

                            return {
                              ...prev,
                              permissoes: {
                                ...prev.permissoes,
                                [perfil]: novo,
                              },
                            };
                          });
                        }}
                      >
                        <div className="switch-circle"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
