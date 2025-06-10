import React, { useState } from 'react';
import './button.css';

export function CircularGlassButton() {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={`glass-circle-button ${hover ? 'hovered' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="arrow-icon">
     <svg
  width="30"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    className="arrow-path"
    d="M5 12H19M19 12L13 6M19 12L13 18"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

      </span>
    </button>
  );
}
