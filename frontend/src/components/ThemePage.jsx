/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import Slider from "react-slick";
import quizSport from "../assets/quizSport.png";
import quizScience from "../assets/quizSciences.png";
import quizCulturegeneral from "../assets/quizCulture.png";
import quizCinema from "../assets/quizCinema.png";
import quizWeb from "../assets/quizWeb.png";
import quizMusique from "../assets/quizMusique.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/ThemePage.css";

const themes = [
  { nom: "Sport", image: quizSport },
  { nom: "Science", image: quizScience },
  { nom: "CultureG", image: quizCulturegeneral },
  { nom: "cinema", image: quizCinema },
  { nom: "Web", image: quizWeb },
  { nom: "Musique", image: quizMusique },
];

function ThemePage({ onCategorySelected }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="pageStyle">
      <main className="carouselContainerStyle">
        <Slider {...settings}>
          {themes.map((theme) => (
            <div
              aria-hidden="true"
              key={theme.nom}
              className="themeBoxStyle"
              onClick={() => onCategorySelected(theme.nom)}
            >
              <div className="cardImageCarousel">
                <img
                  src={theme.image}
                  alt={theme.nom}
                  className="imgCarousel"
                />
                <span className="textTheme">{theme.nom}</span>
              </div>
            </div>
          ))}
        </Slider>
      </main>
    </div>
  );
}

ThemePage.propTypes = {
  onCategorySelected: PropTypes.func.isRequired,
};

export default ThemePage;
