/* eslint-disable prettier/prettier */
import Presentateur from "../components/Presentateur";
import ThemePage from "../components/ThemePage";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import "../styles/Accueil.css";
import ThemeChangeProvider from "../Context/ThemeContext";


function Accueil() {

  return (
    <ThemeChangeProvider> 
    <div id="accueil">
      <Navbar1 />
      <ThemePage/>
      <Presentateur
        goodTexts="Accueil"
        idContainer="accueilPresPosition"
        idSpeech="accueilSpeechPosition"
      />
      <Footer />
    </div>
    </ThemeChangeProvider>
  );
}

export default Accueil;
