import React from "react";

export const InsuranceList = ({ list, onSelect }) =>
  list.map(item => (
    <p>
      <a onClick={() => onSelect(item)}>{item}</a>
    </p>
  ));
