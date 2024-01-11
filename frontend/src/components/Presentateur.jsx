import React, { useState, useEffect } from "react";
import { useSpring, config, animated } from "react-spring";
import PropTypes from "prop-types";
import presentateur1 from "../assets/Presentateur/pres1light.png";
import presentateur2 from "../assets/Presentateur/pres2light.png";
import presentateur3 from "../assets/Presentateur/pres3light.png";
import presentateur4 from "../assets/Presentateur/pres4light.png";
import presentateur5 from "../assets/Presentateur/pres5light.png";
import presentateur6 from "../assets/Presentateur/pres6light.png";
import presentateur7 from "../assets/Presentateur/pres7light.png";
import "../styles/Presentateur.css";

const expressions = [
  presentateur2,
  presentateur3,
  presentateur4,
  presentateur5,
  presentateur6,
  presentateur7,
];

function Presentateur({ goodTexts }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentExpressionIndex, setCurrentExpressionIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [isTextAnimating, setIsTextAnimating] = useState(false);

  const animateText = (textToAnimate, index = 0) => {
    if (index < textToAnimate.length) {
      setTimeout(() => {
        setVisibleText(() => textToAnimate.slice(0, index + 1));
        animateText(textToAnimate, index + 1);
      }, 50);
    } else {
      setIsTextAnimating(false);
    }
  };

  const { opacity: textOpacity } = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    config: config.default,
  });

  const { opacity: imageOpacity } = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    config: config.default,
  });

  // le texte 2 doit également appraitre a la fin du tableau pour une meilleure transition de l'animation.
  const texts = {
    Accueil: [
      "Bienvenue dans QuizCraft! Cliquez sur moi pour en savoir plus et découvrir les défis qui vous attendent. Prêt pour l'aventure ? ",
      "Texte 2 correspondant à l'expression 2",
      "Texte 3 correspondant à l'expression 3",
      "Texte 2 correspondant à l'expression 2",
    ],
    Creation: [
      "Bienvenue dans l'espace creation ",
      "Texte 2 correspondant à l'expression 2",
      "Texte 3 correspondant à l'expression 3",
      "Texte 2 correspondant à l'expression 2",
    ],
  };

  const selectedTexts = texts[goodTexts];

  useEffect(() => {
    if (!isTextAnimating) {
      setVisibleText(selectedTexts[currentTextIndex]);
    } else {
      animateText(selectedTexts[currentTextIndex]);
    }
  }, [currentTextIndex, isTextAnimating]);

  useEffect(() => {
    let expressionChangeInterval;

    if (isTextAnimating) {
      expressionChangeInterval = setInterval(() => {
        const newIndex = (currentExpressionIndex + 1) % expressions.length;
        setCurrentExpressionIndex(newIndex);
      }, 150);
    }

    return () => clearInterval(expressionChangeInterval);
  }, [isTextAnimating, currentExpressionIndex]);

  const changeText = () => {
    const newIndex = (currentTextIndex + 1) % selectedTexts.length;
    setCurrentTextIndex(newIndex);
    setVisibleText("");
    setIsTextAnimating(true);
  };

  useEffect(() => {
    if (currentTextIndex === selectedTexts.length - 1) {
      setCurrentTextIndex(1);
    }
  }, [currentTextIndex, selectedTexts]);

  return (
    <div aria-hidden id="presenterContainer" onClick={changeText} role="button">
      {currentTextIndex === 0 ? (
        <animated.p id="speech" style={textOpacity}>
          {visibleText}
        </animated.p>
      ) : (
        <p id="speech">{visibleText}</p>
      )}
      <animated.img
        src={
          isTextAnimating ? expressions[currentExpressionIndex] : presentateur1
        }
        alt="presentateur"
        id="presenter"
        style={imageOpacity}
      />
    </div>
  );
}

Presentateur.propTypes = {
  goodTexts: PropTypes.string.isRequired,
};

export default Presentateur;
