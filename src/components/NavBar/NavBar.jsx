import { Link, NavLink } from "react-router-dom";
import CardWidget from "../CardWidget/CardWidget";
import "./NavBar.css";

function NavBar({ title }) {
  return (
    <nav
      style={{ width: "100%", margin: "0 auto" }}
      className="navbar navbar-expand-lg"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ display: 'flex', flexDirection: 'row' }}>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "ActiveOption" : "Option"
                }
                aria-current="page"
                to="/category/alfombras"
              >
                Alfombras
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "ActiveOption" : "Option"
                }
                to="/category/tapete"
              >
                Tapetes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "ActiveOption" : "Option"
                }
                to="category/personalizadas"
              >
                Personalizadas
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <CardWidget />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
