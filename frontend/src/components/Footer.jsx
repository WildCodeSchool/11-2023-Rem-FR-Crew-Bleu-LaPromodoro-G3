import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="left-content">
        <p>LaPromodoro 2024 ©</p>
      </div>
      <div className="right-content">
        <Link to="/git">
          <img src="./src/assets/Github.png" alt="Github" />
        </Link>
        <Link to="/linkedin">
          <img src="./src/assets/Linkedin.png" alt="Linkedin" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
