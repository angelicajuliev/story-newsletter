import { Link } from "react-router-dom";
import "./Header.scss";
import Logo from "src/assets/images/logo.svg";
import { FunctionComponent } from "react";

type HeaderProps = {
  showNav?: boolean;
};
const Header: FunctionComponent<HeaderProps> = ({ showNav }) => {
  return (
    <header className="Header">
      <Link to="/home">
        <img src={Logo} alt="Stori newsletter logo" />
      </Link>

      {showNav && (
        <nav>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/recipients">Recipients</Link>
          </li>
          <li>
            <Link to="/newsletters">Newsletters</Link>
          </li>
        </nav>
      )}
    </header>
  );
};

export default Header;
