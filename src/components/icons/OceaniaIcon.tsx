import type { FC, SVGProps } from 'react';

export const OceaniaIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M8.5 12a5.5 5.5 0 1 1 11 0 5.5 5.5 0 1 1-11 0Z" />
    <path d="M10 7.5a2 2 0 1 1 4 0 2 2 0 1 1-4 0Z" />
    <path d="M12.5 17a1.5 1.5 0 1 1 3 0 1.5 1.5 0 1 1-3 0Z" />
    <path d="M5 20a1 1 0 1 1 2 0 1 1 0 1 1-2 0Z" />
    <path d="M4 5a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" />
    <path d="M19 3a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" />
    <path d="M20 19a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" />
  </svg>
);
