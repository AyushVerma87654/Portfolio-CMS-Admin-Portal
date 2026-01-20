import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, className = "", ...rest }) => {
  return (
    <button
      {...rest}
      className={`px-4 py-2 bg-blue-500 rounded cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
