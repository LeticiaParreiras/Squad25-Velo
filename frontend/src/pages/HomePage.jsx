import DadosRecentes from "../components/ScriptsHomePage/DadosRecentes";
import Desempenho from "../components/ScriptsHomePage/Desempenho";
import Header from "../components/ScriptsHomePage/header";
import VisaoGeral from "../components/ScriptsHomePage/VisaoGeral";

export default function HomePage() {
  return (
    <>
      <Header />
      <VisaoGeral />
      <DadosRecentes />
      <Desempenho />
    </>
  );
}
