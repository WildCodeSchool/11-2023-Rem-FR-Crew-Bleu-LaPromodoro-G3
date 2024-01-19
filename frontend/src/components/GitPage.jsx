/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
// import { Link } from "react-router-dom";
import "../styles/GitPage.css";

function GitPage() {
  return (
    <body>
      <div className="containerGithub">
        <h1 className="heading">Git Pages</h1>
        <ul className="list">
          <li>
            <a href="https://github.com/IoanaHoreanu"> Ioana</a>
          </li>
          <li>
            <a href="https://github.com/Lor92500"> Lorraine</a>
          </li>
          <li>
            <a href="https://github.com/Dolpheus89"> Florian</a>
          </li>
          <li>
            <a href="https://github.com/codeIsHard2023"> Vlad</a>
          </li>
          <li>
            <a href="https://github.com/Starksz62"> Romain</a>
          </li>
          <li>
            <a href="https://github.com/ljomni">Lyes</a>
          </li>
        </ul>
      </div>
    </body>
  );
}

export default GitPage;

/* <Link to={{ pathname: "https://github.com/IoanaHoreanu" }}>
              Ioana
            </Link> 
 <Link to={{ pathname: "https://github.com/Lor92500" }}>
              Lorraine
            </Link> 
<Link to={{ pathname: "https://github.com/Dolpheus89" }}>
              Florian
            </Link> 
<Link to={{ pathname: "https://github.com/codeIsHard2023" }}>
              Vlad
            </Link> 
<Link to={{ pathname: "https://github.com/Starksz62" }}>
              Romain
            </Link> 
            <Link to={{ pathname: "https://github.com/ljomni" }}>Lyes</Link> */
