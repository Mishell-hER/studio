import type { FC, SVGProps } from 'react';

export const EuropeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 13V4" />
    <path d="M14 4h4" />
    <path d="M19 4v3" />
    <path d="M22 7h-3" />
    <path d="M16 13a2.5 2.5 0 0 0 0 5h.5a2.5 2.5 0 0 1 0 5" />
    <path d="M4 22V8a2 2 0 0 1 2-2h5" />
    <path d="M9 13a2.5 2.5 0 0 0 0 5h.5a2.5 2.5 0 0 1 0 5" />
    <path d="M8 6V4" />
    <path d="M6 4h4" />
    <path d="M4 8h5" />
  </svg>
);
