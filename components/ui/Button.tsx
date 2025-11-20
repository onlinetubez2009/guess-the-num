import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'game-btn' | 'game-btn-selected' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-900/20 border-transparent',
      secondary: 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-900/20 border-transparent',
      outline: 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10',
      ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border-transparent',
      'game-btn': 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200 active:scale-95',
      'game-btn-selected': 'bg-violet-600 text-white border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-105',
      glow: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:scale-105 border-none transition-all duration-300',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg font-semibold',
      xl: 'w-14 h-14 md:w-20 md:h-20 text-2xl md:text-3xl font-bold p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1b4b] focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';