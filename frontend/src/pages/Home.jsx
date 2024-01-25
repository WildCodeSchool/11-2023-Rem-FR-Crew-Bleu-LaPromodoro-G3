import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Presentateur from "../components/Presentateur";
import ThemePage from "../components/ThemePage";
import Navbar1 from "../components/Navbar1";
import backgroundMusicFile from "../assets/8-bit-arcade-138828.mp3";
import BackgroundMusic from "../components/BackgroundMusic";
import Footer from "../components/Footer";
import ThemeChangeProvider from "../Context/ThemeContext";
import "../styles/Home.css";

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleCategorySelected = (category) => {
    setSelectedCategory(category);
    navigate("/quiz", { state: { selectedCategory: category } });
    console.info("Catégorie sélectionnée :", category);
  };

  return (
    <ThemeChangeProvider>
      <div id="accueil">
        <div className="header-flex">
          <Navbar1 />
          <BackgroundMusic musicUrl={backgroundMusicFile} volume={0.02} />
        </div>
        <ThemePage onCategorySelected={handleCategorySelected} />
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

export default Home;
