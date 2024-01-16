/* eslint-disable prettier/prettier */
import Presentateur from "../components/Presentateur";
import ThemePage from "../components/ThemePage";
import Navbar1 from "../components/Navbar1";
import backgroundMusicFile from "../assets/8-bit-arcade-138828.mp3";
import BackgroundMusic from "../components/BackgroundMusic";

import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  return (
    <div id="accueil">
      <div className="header-flex">
      <Navbar1 />
      <BackgroundMusic musicUrl={backgroundMusicFile} volume={0.5}/>
      </div>
      <ThemePage />
      <Presentateur
        goodTexts="Accueil"
        idContainer="accueilPresPosition"
        idSpeech="accueilSpeechPosition"
      />
      <Footer />
    </div>
  );
}

export default Home;
