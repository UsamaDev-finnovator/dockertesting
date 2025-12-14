"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  value?: string | number;
  placeholder?: string;
  onValueChange?: (value: string | number) => void;
  className?: string;
  options?: SelectOption[];
}

export function Select({
  value,
  onValueChange,
  placeholder = "Select option",
  className,
  options = [],
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleSelect = (val: string | number) => {
    onValueChange?.(val);
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className={`w-full h-10 px-3 border rounded-md flex justify-between items-center text-left bg-background ${className}`}
        onClick={() => setOpen(!open)}
      >
        <span>{value || placeholder}</span>
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute z-50 w-full bg-white dark:bg-neutral-900 border rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
