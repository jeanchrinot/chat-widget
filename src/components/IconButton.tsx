import React from "react";

interface IconButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function IconButton({ onClick, children, ariaLabel }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer text-gray-500 border-none bg-gray-50 py-1 px-1.5 rounded-lg hover:text-neutral-500 dark:hover:text-neutral-300"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
