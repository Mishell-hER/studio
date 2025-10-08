import type { FC, SVGProps } from 'react';

export const NorthAmericaIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <path d="M8 22s-2.14-2.8-3.2-6.5" />
    <path d="M16 22s2.14-2.8 3.2-6.5" />
    <path d="M13 14.5a2.5 2.5 0 0 0-3 0" />
    <path d="M10 2c-3.5 2-5 5-5 7" />
    <path d="M14 2c3.5 2 5 5 5 7" />
    <path d="M12 2v2.5" />
  </svg>
);
