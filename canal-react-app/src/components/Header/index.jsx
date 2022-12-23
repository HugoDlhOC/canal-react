import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchPage, homePage } from "../../routes/routes";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigationMenu = useRef();

  const openMobileMenu = () => {
    navigationMenu.current.classList.toggle("display_menu");
  };

  return (
    <header>
      <nav className="header_navigation">
        <Link to={homePage}>
          <h1 className="header_navigation__title">CANAL REACT</h1>
        </Link>

        <ul className="header_navigation__menu menu" ref={navigationMenu}>
          <li className="menu__item">
            <Link to={homePage} onClick={openMobileMenu}>
              Accueil
            </Link>
          </li>
          <li className="menu__item">
            <Link to={homePage} onClick={openMobileMenu}>
              En direct
            </Link>
          </li>
          <li className="menu__item">
            <Link to={homePage} onClick={openMobileMenu}>
              Programme TV
            </Link>
          </li>
          <li className="menu__item">
            <Link to={homePage} onClick={openMobileMenu}>
              Chaînes & Apps
            </Link>
          </li>
          <li className="menu__item">
            <Link to={homePage} onClick={openMobileMenu}>
              Mes vidéos
            </Link>
          </li>
        </ul>
        <FontAwesomeIcon
          icon={faBars}
          size={"2xl"}
          className="header_navigation__icon_menu display_none"
          onClick={openMobileMenu}
        />
        <div className="navigation__search_account search_account">
          <button
            className="search_account__search search"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link to={searchPage} className="search__search_link">
              <FontAwesomeIcon icon={faSearch} size="2xl" color="white" />
            </Link>
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
