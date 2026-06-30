import { NavLink } from "react-router-dom";
import { Home, Scale, TrendingUp } from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>ARM</h1>
        <span>Let's grow.</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="sidebar-link">
          <Home size={22} />
          <span>Overview</span>
        </NavLink>

        <NavLink to="/comparison" className="sidebar-link">
          <Scale size={22} />
          <span>Comparison</span>
        </NavLink>

        <NavLink to="/trends" className="sidebar-link">
          <TrendingUp size={22} />
          <span>Trends</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;