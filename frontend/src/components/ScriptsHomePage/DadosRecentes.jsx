import React from 'react';
import { MdOutlineDataObject } from "react-icons/md";
import "../../styles/StylesHomePage/dadosrecentes.css"; 

const dadosRecentes = [
    {
        title: "Desempenho Médio ENEM",
        value: "675 pontos",
        description: "Crescimento de 4%",
        iconType: "up",
    },
    {
        title: "Participação PAS",
        value: "820 alunos",
        description: "+ 120 alunos em comparação ao último ciclo",
        iconType: "up-num",
    },
    {
        title: "Taxa de conclusão do Ensino Médio",
        value: "78%",
        description: "Aumento de 7%",
        iconType: "up", 
    },
    {
        title: "Horas Semanais de Estudo",
        value: "14h",
        description: "Constante",
        iconType: "const",
    },
    {
        title: "Livros Distribuídos",
        value: "230",
        description: "+30 desde o último entrega",
        iconType: "up-num-yellow",
    },
    {
        title: "Taxa de aprovações nas universidades desejadas",
        value: "64%",
        description: "Crescimento de 7% em comparação ao último ano",
        iconType: "up",
    },
];

const RecentDataCard = ({ title, value, description, iconType }) => {
    
    const getIconAndClass = (type) => {
        switch (type) {
            case 'up':
                return { icon: "↗", className: "growth-up" };
            case 'up-num':
                return { icon: "↑", className: "growth-up" };
            case 'const':
                return { icon: "⚡", className: "growth-const" };
            case 'up-num-yellow':
                return { icon: "⬆", className: "growth-warning" };
            default:
                return { icon: "", className: "" };
        }
    };

    const { icon, className } = getIconAndClass(iconType);

    return (
        <div className="recent-data-card">
            <h3 className="card-title">{title}</h3>
            
            <div className="card-value">{value}</div>
            
            <div className={`card-description ${className}`}>
                <span className="description-icon">{icon}</span>
                {description}
            </div>
        </div>
    );
};

const DadosRecentes = () => {
    return (
        <div className="recent-data-container">
            <h1 className="section-title">
                <span className="section-title-icon"><MdOutlineDataObject /></span>Dados Recentes
            </h1>

            <div className="data-cards-grid">
                {dadosRecentes.map((data, index) => (
                    <RecentDataCard 
                        key={index}
                        title={data.title}
                        value={data.value}
                        description={data.description}
                        iconType={data.iconType}
                    />
                ))}
            </div>
        </div>
    );
};

export default DadosRecentes;