import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header>
      <nav className="header_navigation">
        <h1 className="header_navigation__title">CANAL REACT</h1>
        <ul className="header_navigation__menu menu">
          <li className="menu__item">Accueil</li>
          <li className="menu__item">En direct</li>
          <li className="menu__item">Programme TV</li>
          <li className="menu__item">Chaînes & Apps</li>
          <li className="menu__item">Mes vidéos</li>
        </ul>
        <div className="navigation__search_account search_account">
          <button className="search_account__search">
            <FontAwesomeIcon icon={faSearch} size="2xl" color="white" />
          </button>
          <button className="search_account__account">
            <FontAwesomeIcon icon={faUserCircle} size="2xl" color="white" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
