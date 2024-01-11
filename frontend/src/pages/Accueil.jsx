/* eslint-disable prettier/prettier */
import Presentateur from "../components/Presentateur";
import "../styles/Accueil.css";
import Navbar1 from "../components/Navbar1";

function Accueil() {
  return (
    <div id="accueil">
      <Navbar1 />
      <Presentateur
        goodTexts="Accueil"
        idContainer="accueilPresPosition"
        idSpeech="accueilSpeechPosition"
      />
    </div>
  );
}

export default Accueil;
