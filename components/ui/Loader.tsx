"use client";

import React from "react";

interface LoaderProps {
  size?: number; // size in pixels
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 150, className = "" }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-black z-50">
      <img
        src="/assets/Loading.gif"
        alt="Loading..."
        style={{ width: `${size}px`, height: `${size}px` }}
        className={className}
      />
    </div>
  );
};

export default Loader;
