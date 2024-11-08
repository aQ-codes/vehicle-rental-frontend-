import Image from "next/image";
import React from "react";

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  label?: string;
  icon?: string;
  variant: string[];
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ type, title, icon, variant, label, onClick }) => {
  return (
    <button
      className={`${variant.join(' ')} flex items-center justify-center space-x-2`}
      type={type}
      onClick={onClick}
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
