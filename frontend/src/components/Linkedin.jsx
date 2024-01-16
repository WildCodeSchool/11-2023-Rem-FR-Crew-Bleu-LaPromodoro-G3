import { Link } from "react-router-dom";
import "../styles/Linkedin.css";

function Linkedin() {
  return (
    <div>
      <h1>Linkedin's</h1>
      <ul>
        <Link to={{ pathname: "https://github.com/IoanaHoreanu" }} />
        <Link to={{ pathname: "https://github.com/Lor92500" }} />
        <Link to={{ pathname: "https://github.com/Dolpheus89" }} />
        <Link to={{ pathname: "https://github.com/codeIsHard2023" }} />
        <Link to={{ pathname: "https://github.com/Starksz62" }} />
        <Link to={{ pathname: "https://github.com/IoanaHoreanu" }} />
      </ul>
    </div>
  );
}

export default Linkedin;
