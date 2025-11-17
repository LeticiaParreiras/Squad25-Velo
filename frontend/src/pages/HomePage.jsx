import DadosRecentes from "../components/ScriptsHomePage/DadosRecentes";
import Desempenho from "../components/ScriptsHomePage/Desempenho";
import Header from "../components/ScriptsHomePage/Header";
import VisaoGeral from "../components/ScriptsHomePage/VisaoGeral";

export default function HomePage() {
  return (
    <>
      <Header />
      <VisaoGeral />
      <DadosRecentes />
      {/* <Desempenho /> */}
    </>
  );
}
