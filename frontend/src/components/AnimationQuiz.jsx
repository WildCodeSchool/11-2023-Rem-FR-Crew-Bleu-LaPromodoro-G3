import React, { useState, useEffect } from "react";
import { useSprings, config, animated } from "react-spring";
import "../styles/AnimationQuiz.css";
import PropTypes from "prop-types";
import presentateur1 from "../assets/Presentateur/pres1light.png";

function AnimationQuiz({
  question,
  onAnimationComplete,
  keyProp,
  idContainer,
}) {
  const [textProps, setTextProps] = useSprings(question.length, (index) => ({
    opacity: 0,
    config: config.default,
    onRest: () => {
      if (
        index === question.length - 1 &&
        typeof onAnimationComplete === "function"
      ) {
        onAnimationComplete();
      }
    },
  }));

  const [isTextAnimating, setIsTextAnimating] = useState(true);

  useEffect(() => {
    setIsTextAnimating(true);

    // Reset individual springs using set function
    setTextProps((index) => ({
      opacity: 0,
      config: config.default,
      onRest: () => {
        if (
          index === question.length - 1 &&
          typeof onAnimationComplete === "function"
        ) {
          onAnimationComplete();
        }
      },
    }));
    // Update individual springs with new values
    setTextProps.start((index) => ({
      opacity: 1,
      delay: index * 50,
    }));
  }, [question, keyProp, setTextProps]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTextAnimating(false);
    }, question.length * 50);
    return () => clearTimeout(timeoutId);
  }, [question]);

  return (
    <div aria-hidden id={idContainer} className="presContainer" role="button">
      <div className="presSpeech" id="quizSpeechPosition">
        {textProps.map((props, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <animated.span key={index} style={props}>
            {question[index]}
          </animated.span>
        ))}
      </div>
      <img
        src={presentateur1}
        alt="presentateur"
        id="presenter"
        className={isTextAnimating ? "animate" : ""}
      />
    </div>
  );
}

AnimationQuiz.propTypes = {
  question: PropTypes.string.isRequired,
  onAnimationComplete: PropTypes.func.isRequired,
  keyProp: PropTypes.number.isRequired,
  idContainer: PropTypes.string.isRequired,
};

export default AnimationQuiz;
