import React from "react";

export const ResetInsuranceQuestion = ({ onReset }) => (
  <div className="dropdown">
    <div className="dropdown-item">
      <a href="#" onClick={onReset}>
        Click here to reset your insurance
      </a>
    </div>
  </div>
);
