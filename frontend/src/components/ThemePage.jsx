/* eslint-disable react/jsx-props-no-spreading */
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
import "./ThemePage.css";

const themes = [
  { nom: "Sport", image: quizSport },
  { nom: "Science", image: quizScience },
  { nom: "Culture générale", image: quizCulturegeneral },
  { nom: "Cinéma", image: quizCinema },
  { nom: "Web", image: quizWeb },
  { nom: "Musique", image: quizMusique },
];

function ThemePage() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    // beforeChange: function (currentSlide, nextSlide) {
    //   console.log("before change", currentSlide, nextSlide);
    // },
    // afterChange: function (currentSlide) {
    //   console.log("after change", currentSlide);
    // }
  };

  return (
    <div className="pageStyle">
      {/* <header className="headerStyle">
        <img
          src={QuizzLogo}
          alt="Quizz Graft"
          style={{ width: "300px", height: "auto" }}
        />
      </header> */}
      <main className="carouselContainerStyle">
        {/* <h1 style={{ textAlign: "center" }}>Bienvenue sur Quizz Graft</h1>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>Choisissez un thème pour commencer le quizz :</p> */}
        <Slider {...settings}>
          {themes.map((theme) => (
            <div aria-hidden="true" key={theme.nom} className="themeBoxStyle">
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

export default ThemePage;
