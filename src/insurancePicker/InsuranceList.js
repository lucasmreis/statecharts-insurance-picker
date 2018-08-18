import React from "react";

export const InsuranceList = ({ list, onSelect }) =>
  list.map(item => (
    <p key={item}>
      <a onClick={() => onSelect(item)}>{item}</a>
    </p>
  ));
