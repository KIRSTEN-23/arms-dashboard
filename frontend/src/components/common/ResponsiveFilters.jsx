import { createPortal } from "react-dom";
import { PageAreaContext } from "../layout/PageAreaContext";
import { FilterLayoutContext } from "./FilterLayoutContext";
import { Children, cloneElement, useContext, useEffect, useId, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RotateCcw, SlidersHorizontal, X } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";

export default function ResponsiveFilters({ title, children, badges = [], summary, onClear, resetLabel = "Clear all" }) {
  const pageArea = useContext(PageAreaContext);
  const [optionsScrolled, setOptionsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(() => localStorage.getItem("arms-filter-layout") || "toolbar");
  const mobile = useIsMobile();
  const panelId = useId();
  const sidebar = !mobile && mode === "sidebar";

  useEffect(() => {
    const main = pageArea;
    if (!main) return;
    main.classList.toggle("filter-sidebar-open", sidebar);
    const dock = sidebar ? main.querySelector(".page-filter-dock") : null;
    const header = main.querySelector(".page-header");
    const body = dock?.querySelector(".desktop-filter-sidebar__body");
    let frame;
    const panel = dock?.querySelector(".desktop-filter-sidebar");
    const view = dock?.querySelector(".sidebar-filter-view");
    const filterHeader = dock?.querySelector(".desktop-filter-sidebar__header");
    const measureHeight = () => {
      if (!dock || !panel || !body) return;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      main.style.setProperty("--filter-header-height", `${(header?.getBoundingClientRect().height || 0) / rem}rem`);
      const viewportBottom = window.visualViewport
        ? window.visualViewport.height + window.visualViewport.offsetTop
        : document.documentElement.clientHeight;
      const rail = dock.parentElement.getBoundingClientRect();
      const panelTop = dock.getBoundingClientRect().top;
      const bottom = Math.min(viewportBottom, rail.bottom);
      const panelHeight = Math.max(0, bottom - panelTop);
      const headingHeight = (view?.getBoundingClientRect().height || 0)
        + (filterHeader?.getBoundingClientRect().height || 0);
      panel.style.height = `${panelHeight / rem}rem`;
      body.style.height = `${Math.max(0, panelHeight - headingHeight) / rem}rem`;
    };
    const updateHeight = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measureHeight);
    };
    const observer = new ResizeObserver(updateHeight);
    if (dock) {
      observer.observe(main);
      if (header) observer.observe(header);
      if (view) observer.observe(view);
      if (filterHeader) observer.observe(filterHeader);
      measureHeight();
      window.addEventListener("scroll", updateHeight, { passive: true, capture: true });
      window.addEventListener("resize", updateHeight);
      window.visualViewport?.addEventListener("resize", updateHeight);
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeight, true);
      window.removeEventListener("resize", updateHeight);
      window.visualViewport?.removeEventListener("resize", updateHeight);
      observer.disconnect();
      main.classList.remove("filter-sidebar-open");
      main.style.removeProperty("--filter-header-height");
      panel?.style.removeProperty("height");
      body?.style.removeProperty("height");
    };
  }, [sidebar, pageArea]);

  function changeMode(next) {
    setMode(next);
    localStorage.setItem("arms-filter-layout", next);
    setOpen(false);
    setOptionsScrolled(false);
  }

  const toolbarChildren = Children.toArray(children.props.children);
  const toolbarActions = toolbarChildren.find((child) => child.props?.className === "comparison-filter-toolbar__actions");
  const toolbarFields = toolbarChildren.filter((child) => child !== toolbarActions);

  const modeSwitch = <div className="filter-layout__toggle" role="group" aria-label="Filter layout">
    <button type="button" aria-pressed={mode === "toolbar"} onClick={() => changeMode("toolbar")}>Toolbar</button>
    <button type="button" aria-pressed={mode === "sidebar"} onClick={() => changeMode("sidebar")}>Sidebar</button>
  </div>;

  const selectionBadges = badges.length > 0 ? <div className="selected-filter-badges" aria-label="Selected filters">
        {badges.map((badge) => <span className="selected-filter-badge" key={badge.id}>
          <span>{badge.label.includes(": ") && !badge.id.startsWith("object-") ? <>
            <span className="selected-filter-badge__label">{badge.label.slice(0, badge.label.indexOf(": ") + 1)}</span>{" "}
            {badge.label.slice(badge.label.indexOf(": ") + 2)}
          </> : badge.label}</span>
          <button type="button" onClick={badge.onRemove} disabled={badge.disabled} aria-label={`Reset ${badge.label}`} title={badge.disabled ? "At least two objects must remain selected" : `Reset ${badge.label}`}><X size={14} aria-hidden="true" /></button>
        </span>)}
      </div> : null;

  return <div className={`filter-layout${sidebar ? " filter-layout--sidebar" : ""}`}>
    <div className="filter-layout__surface">
      <div className="filter-layout__actions" hidden={!mobile}>
        {mobile && <button type="button" className="filter-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={panelId}>
          <SlidersHorizontal size={18} aria-hidden="true" /> Filters
        </button>}
      </div>
      {!mobile && !sidebar && cloneElement(children, {}, <>
        <div className="filter-toolbar-view">{modeSwitch}</div>
        {toolbarFields}
        {toolbarActions}
        {(summary || badges.length > 0) && <div className="filter-toolbar-selection">
          {summary && <p className="filter-selection-summary">{summary}</p>}
          {selectionBadges}
        </div>}
      </>)}
    </div>
    {sidebar && pageArea && createPortal(<div className="page-filter-rail">
      <div className="page-filter-dock">
        <aside id={panelId} className="desktop-filter-sidebar" aria-label={title}>
          <div className="sidebar-filter-view">
            <span className="sidebar-filter-view__eyebrow">View</span>
            {modeSwitch}
          </div>
          <div className={`desktop-filter-sidebar__header${optionsScrolled ? " desktop-filter-sidebar__header--scrolled" : ""}`}>
            <h3>{title}</h3>
            <button type="button" className="sidebar-filter-clear" onClick={onClear}><RotateCcw size={16} aria-hidden="true" /> {resetLabel}</button>
          </div>
          <div className="desktop-filter-sidebar__body" onScroll={(event) => setOptionsScrolled(event.currentTarget.scrollTop > 0)} tabIndex={0} aria-label="Filter options">
          {badges.length > 0 && <div className="desktop-filter-sidebar__badges">{selectionBadges}</div>}
          <FilterLayoutContext.Provider value={true}>{children}</FilterLayoutContext.Provider>
          </div>
        </aside>
      </div>
    </div>, pageArea)}
    {mobile && <Offcanvas id={panelId} show={open} onHide={() => setOpen(false)} placement="end" className="mobile-filter-drawer">
      <Offcanvas.Header closeButton><Offcanvas.Title>{title}</Offcanvas.Title></Offcanvas.Header>
      <Offcanvas.Body><FilterLayoutContext.Provider value={true}>{children}</FilterLayoutContext.Provider></Offcanvas.Body>
    </Offcanvas>}
  </div>;
}
