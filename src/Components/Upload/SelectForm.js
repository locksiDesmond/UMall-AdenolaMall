import React from "react";

const SelectForm = props => {
  const selects = props.object;
  if (selects.length === 0) {
    return null;
  }
  return (
    <select
      className={`form-control ${
        props.error ? "input--error" : "input--control"
      } `}
      name="subcategory"
      placeholder="subcategory"
      value={props.value}
      onChange={props.onChange}
    >
      {selects.map(item => (
        <option key={item.id}>{item.name}</option>
      ))}
    </select>
  );
};
export default SelectForm;
