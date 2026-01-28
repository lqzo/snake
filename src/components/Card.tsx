import React from 'react';
import { cn } from '../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div 
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-100 shadow-xl",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};
