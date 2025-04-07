import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <h1>Forms App</h1>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => navigate("/")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/firstForm"
              className={location.pathname === "/firstForm" ? "active" : ""}
              onClick={() => navigate("/firstForm")}
            >
              First Form
            </Link>
          </li>
          <li>
            <Link
              to="/secondForm"
              className={location.pathname === "/secondForm" ? "active" : ""}
              onClick={() => navigate("/secondForm")}
            >
              Second Form
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
