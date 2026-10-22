import { useLayoutEffect, useRef } from "react";
import useIsMobile from "../../hooks/useIsMobile";

function PageHeader({ title, description, action, overlapTarget, overlapEnabled = false, className = "" }) {
  const headerRef = useRef(null);
  const mobile = useIsMobile();

  useLayoutEffect(() => {
    const header = headerRef.current;
    const container = header?.parentElement;
    const target = overlapEnabled && overlapTarget && container?.querySelector(overlapTarget);
    if (!target) return;
    const updateOverlap = () => {
      const toolbarSwitch = container.querySelector(".filter-layout:not(.filter-layout--sidebar) .filter-toolbar-view");
      if (container.classList.contains("filter-sidebar-open") || toolbarSwitch) {
        header.style.removeProperty("--header-overlap");
        return;
      }
      const headerBounds = header.getBoundingClientRect();
      const targetBounds = target.getBoundingClientRect();
      const extension = targetBounds.top - headerBounds.bottom + targetBounds.height / 2;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      header.style.setProperty("--header-overlap", `${Math.max(0, extension) / rem}rem`);
    };
    const observer = new ResizeObserver(updateOverlap);
    observer.observe(header);
    observer.observe(container);
    observer.observe(target);
    const layoutObserver = new MutationObserver(updateOverlap);
    layoutObserver.observe(container, { attributes: true, attributeFilter: ["class"] });
    updateOverlap();
    return () => {
      observer.disconnect();
      layoutObserver.disconnect();
      header.style.removeProperty("--header-overlap");
    };
  }, [overlapTarget, overlapEnabled, mobile]);

  return (
    <section ref={headerRef} className={`page-header ${className}`}>
      <div className="page-header__inner">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {action && <div className="page-header__actions">{action}</div>}
      </div>
    </section>
  );
}

export default PageHeader;
