import type { FC, SVGProps } from 'react';

export const SouthAmericaIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 22a8 8 0 0 0 8-8" />
    <path d="M4 14a8 8 0 0 0 8 8" />
    <path d="M14.5 14.5c-1.5 2-4.5 2-6 0" />
    <path d="M12 2c-3 1.5-5 4-5 7s2 5.5 5 7c3-1.5 5-4 5-7s-2-5.5-5-7Z" />
  </svg>
);
