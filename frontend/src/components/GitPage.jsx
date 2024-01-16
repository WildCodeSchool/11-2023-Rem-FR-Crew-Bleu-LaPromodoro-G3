import { Link } from "react-router-dom";
import "../styles/GitPage.css";

function GitPage() {
  return (
    <body>
      <div className="container">
        <h1 className="heading">Git Pages</h1>
        <ul className="list">
          <Link to={{ pathname: "https://github.com/IoanaHoreanu" }} />
          <Link to={{ pathname: "https://github.com/Lor92500" }} />
          <Link to={{ pathname: "https://github.com/Dolpheus89" }} />
          <Link to={{ pathname: "https://github.com/codeIsHard2023" }} />
          <Link to={{ pathname: "https://github.com/Starksz62" }} />
          <Link to={{ pathname: "https://github.com/IoanaHoreanu" }} />
        </ul>
      </div>
    </body>
  );
}

export default GitPage;
