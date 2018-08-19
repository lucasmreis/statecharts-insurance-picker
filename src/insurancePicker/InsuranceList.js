import React from "react";

export const InsuranceList = ({ list, onSelect }) => (
  <div className="dropdown">
    {list.map(item => (
      <div key={item} className="dropdown-item" onClick={() => onSelect(item)}>
        <a href="#">{item}</a>
      </div>
    ))}
  </div>
);
