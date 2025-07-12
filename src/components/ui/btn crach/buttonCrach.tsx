import React from "react";
import "./style.css";

interface ButtonCrachProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const ButtonCrach = React.forwardRef<HTMLButtonElement, ButtonCrachProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button ref={ref} className={className} {...props}>
        <span className="text">{children}</span>
      </button>
    );
  }
);

ButtonCrach.displayName = "ButtonCrach";

export default ButtonCrach;
