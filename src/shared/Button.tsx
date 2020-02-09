import React from 'react';
import classNames from 'classnames';

type Props = {
  type?: 'submit';
  children: React.ReactNode;
  onClick?: () => void;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
};

const Button: React.FC<Props> = ({ type, children, onClick, color, className }) => {
  return (
    <button
      type={type}
      className={classNames(className, 'text-white font-bold py-2 px-4 rounded', {
        'bg-blue-500 hover:bg-blue-400': color === 'primary',
        'bg-green-500 hover:bg-green-400': color === 'success',
        'bg-orange-500 hover:bg-orange-400': color === 'warning',
        'bg-red-500 hover:bg-red-400': color === 'danger',
        'bg-indigo-500 hover:bg-indigo-400': color === 'info',
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
