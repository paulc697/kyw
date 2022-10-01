import React from "react";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div
      style={{
        lineHeight: "1.25rem",
        padding: "0 0.75rem 0 0.75rem",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
