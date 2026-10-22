import { NavLink } from "react-router-dom";
import home from "../../assets/navigation/home.svg";
import homeActive from "../../assets/navigation/home-active.svg";
import comparison from "../../assets/navigation/comparison.svg";
import comparisonActive from "../../assets/navigation/comparison-active.svg";
import trends from "../../assets/navigation/trends.svg";
import trendsActive from "../../assets/navigation/trends-active.svg";

const links = [
  { to: "/", label: "Overview", icon: home, activeIcon: homeActive },
  { to: "/comparison", label: "Comparison", icon: comparison, activeIcon: comparisonActive },
  { to: "/trends", label: "Trends", icon: trends, activeIcon: trendsActive },
];

function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav" aria-label="Main navigation">
        {links.map((link) => <NavLink
          key={link.to} to={link.to} end={link.to === "/"}
          onClick={onNavigate} className="sidebar-link" aria-label={link.label} title={link.label}
        >
          <img className="sidebar-icon sidebar-icon--default" src={link.icon} alt="" />
          <img className="sidebar-icon sidebar-icon--active" src={link.activeIcon} alt="" />
          <span>{link.label}</span>
        </NavLink>)}
      </nav>
    </aside>
  );
}

export default Sidebar;
