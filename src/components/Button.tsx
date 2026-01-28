import React from 'react';
import { cn } from '../utils/cn'; // We need to create this utility

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95';
  
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-900/20',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
    icon: 'bg-transparent text-white hover:bg-white/10',
  };

  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-11 px-8 text-base',
    lg: 'h-14 px-10 text-lg',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
