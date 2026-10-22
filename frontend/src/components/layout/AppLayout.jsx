import { useState } from "react";
import { Outlet } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import useIsMobile from "../../hooks/useIsMobile";
import { PageAreaContext } from "./PageAreaContext";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function AppLayout() {
  const [activeDomain, setActiveDomain] = useState("business");
  const [pageArea, setPageArea] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = useIsMobile();

  return (
    <div className="app-shell">
      <TopBar
        activeDomain={activeDomain}
        onDomainChange={setActiveDomain}
        onMenuClick={() => setMenuOpen(true)}
        menuOpen={mobile && menuOpen}
      />
      {!mobile && <Sidebar />}
      <Offcanvas
        show={mobile && menuOpen}
        onHide={() => setMenuOpen(false)}
        placement="start"
        className="mobile-nav-drawer"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar onNavigate={() => setMenuOpen(false)} />
        </Offcanvas.Body>
      </Offcanvas>

      <main ref={setPageArea} className="main-content page-area">
        <PageAreaContext.Provider value={pageArea}>
          <Outlet context={{ activeDomain, setActiveDomain }} />
        </PageAreaContext.Provider>
      </main>
    </div>
  );
}

export default AppLayout;
