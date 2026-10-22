function YearControl({
  variant = "single",
  year,
  startYear,
  endYear,
  years = [],
  onChange,
}) {
  if (variant === "range") {
    return (
      <div className="year-control year-control--range">
        <select
          value={startYear}
          onChange={(event) => onChange({ startYear: Number(event.target.value) })}
        >
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={endYear}
          onChange={(event) => onChange({ endYear: Number(event.target.value) })}
        >
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <select
      className="year-control"
      aria-label="Year"
      value={year}
      onChange={(event) => onChange({ year: Number(event.target.value) })}
    >
      {years.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default YearControl;
