import { ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/topbar-logo.png";

function TopBar({ onMenuClick, menuOpen, activeDomain, onDomainChange }) {
  return (
    <header className="top-bar">
      <button type="button" className="mobile-menu-button" onClick={onMenuClick} aria-label="Open navigation" aria-expanded={menuOpen} aria-haspopup="dialog"><Menu size={24} aria-hidden="true" /></button>
      <Link to="/" className="top-bar__brand" aria-label="ARMS Dashboard home">
        <img src={logo} width="171" height="44" alt="ARM — Let’s grow." />
      </Link>
      <div className="top-bar__domain">
        <select aria-label="Financial domain" value={activeDomain} onChange={(event) => onDomainChange(event.target.value)}>
          <option value="business">Business</option>
          <option value="household">Household</option>
        </select>
        <ChevronDown size={18} aria-hidden="true" />
      </div>
    </header>
  );
}

export default TopBar;
