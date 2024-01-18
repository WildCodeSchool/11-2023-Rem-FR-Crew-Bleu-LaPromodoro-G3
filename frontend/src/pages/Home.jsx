import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Presentateur from "../components/Presentateur";
import ThemePage from "../components/ThemePage";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
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
    <div id="accueil">
      <Navbar1 />
      <ThemePage onCategorySelected={handleCategorySelected} />
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
