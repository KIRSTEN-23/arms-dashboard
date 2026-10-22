import { Children, useContext, useId } from "react";
import { FilterLayoutContext } from "./FilterLayoutContext";

export function FilterSelect({ children, value, onChange, ...props }) {
  const expanded = useContext(FilterLayoutContext);
  const name = useId();
  if (!expanded) return <select {...props} value={value} onChange={onChange}>{children}</select>;
  return <span className="sidebar-filter-options" role="group" aria-label={props["aria-label"]}>
    {Children.toArray(children).map((option) => <label className="filter-option" key={option.props.value}>
      <input type="radio" name={name} value={option.props.value}
        checked={String(value) === String(option.props.value)}
        disabled={option.props.disabled} onChange={onChange} />
      <span>{option.props.children}</span>
    </label>)}
  </span>;
}

export function FilterObjectPicker({ summary, children }) {
  const expanded = useContext(FilterLayoutContext);
  if (expanded) return <div className="sidebar-filter-object-picker">{children}</div>;
  return <details><summary>{summary}</summary>{children}</details>;
}

export function ExpandedFilterContent({ children }) {
  const expanded = useContext(FilterLayoutContext);
  return expanded ? children : null;
}
