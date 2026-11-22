"use client";

import { useId } from "react";

export function Flag({ country }: { country: "gb" | "de" }) {
  const raw = useId().replace(/:/g, "");
  if (country === "de") {
    return (
      <svg className="flag" viewBox="0 0 22 16" aria-hidden="true">
        <rect width="22" height="16" fill="#000" />
        <rect y="5.34" width="22" height="5.33" fill="#DD0000" />
        <rect y="10.67" width="22" height="5.33" fill="#FFCE00" />
      </svg>
    );
  }
  const clip = `uk-${raw}`;
  return (
    <svg className="flag" viewBox="0 0 60 30" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <path d="M0,0 h60 v30 h-60 z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <path d="M0,0 h60 v30 h-60 z" fill="#012169" />
        <path d="M0,0 l60,30 M60,0 l-60,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 l60,30 M60,0 l-60,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
