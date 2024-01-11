import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="left-content">
        <p>LaPromodoro 2024 ©</p>
      </div>
      <div className="right-content">
        <Link to="/git">
          <img src="./src/components/Github.png" alt="Github" />
        </Link>
        <Link to="/linkedin">
          <img src="./src/components/Linkedin.png" alt="Linkedin" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
