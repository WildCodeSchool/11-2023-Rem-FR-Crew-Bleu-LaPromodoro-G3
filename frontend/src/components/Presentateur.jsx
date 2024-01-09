/* eslint-disable prettier/prettier */
import presentateur from "../assets/Presentateur/pres1light.png";
import "../styles/Presentateur.css";

function Presentateur() {
return (
    <div id="presenterContainer">
    <p id="speech">
        Bienvenue dans QuizCraft ! Le jeu qui te permet d'affronter tes amis
        lors de quiz personnalisés
    </p>
    <img src={presentateur} alt="presentateur" id="presenter" />
    </div>
);
}

export default Presentateur;
