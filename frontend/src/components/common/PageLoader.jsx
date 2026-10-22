import "./PageLoader.css";

function PageLoader({ message = "Loading dashboard data…" }) {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__watering-can" aria-hidden="true">
        <svg viewBox="0 0 52 40" focusable="false">
          <ellipse className="page-loader__soil" cx="42" cy="38.6" rx="7" ry="1.6" />
          <g className="page-loader__drops">
            <circle className="page-loader__drop" cx="39.6" cy="20.5" r="1.6" />
            <circle className="page-loader__drop" cx="40.6" cy="20.5" r="1.4" />
            <circle className="page-loader__drop" cx="38.6" cy="20.5" r="1.4" />
          </g>
          <g className="page-loader__sprout">
            <path className="page-loader__stem" d="M42 38.5V30" />
            <path className="page-loader__leaf--left" d="M42 33c-5 0-7-2.5-7-5.5 5 0 7 2.5 7 5.5z" />
            <path className="page-loader__leaf--right" d="M42 31.5c4.5 0 6.5-2.2 6.5-5-4.5 0-6.5 2.2-6.5 5z" />
          </g>
          <g className="page-loader__can">
            <path className="page-loader__handle" d="M9 9c0-9 14-9 14 0M25 23l13-13M36.5 8.5l3 3" />
            <rect className="page-loader__body" x="5" y="8" width="21" height="19" rx="3.5" />
          </g>
        </svg>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default PageLoader;
