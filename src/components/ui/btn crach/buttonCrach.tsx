import React from "react";
import "./style.css";
const ButtonCrach = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button className={className}>
      <span className="text">{children}</span>
    </button>
  );
};

export default ButtonCrach;
