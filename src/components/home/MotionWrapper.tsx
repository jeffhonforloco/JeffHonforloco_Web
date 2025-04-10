
import React from 'react';

// Motion animation component
// This is a lightweight alternative to framer-motion
// that provides basic animation capabilities

interface MotionProps {
  children: React.ReactNode;
  initial?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  animate?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  exit?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

export const motion = {
  div: ({ 
    children, 
    initial, 
    animate, 
    transition, 
    className, 
    ...rest 
  }: MotionProps) => {
    const [style, setStyle] = React.useState(initial || {});
    
    React.useEffect(() => {
      if (!animate) return;
      
      const timer = setTimeout(() => {
        setStyle(animate);
      }, (transition?.delay || 0) * 1000);
      
      return () => clearTimeout(timer);
    }, [animate, transition?.delay]);
    
    const animationStyle = {
      ...style,
      transition: `all ${transition?.duration || 0.3}s ease-in-out`,
    };
    
    return (
      <div 
        className={className} 
        style={animationStyle}
        {...rest}
      >
        {children}
      </div>
    );
  },
  
  button: ({ 
    children, 
    initial, 
    animate,
    exit, 
    transition, 
    className, 
    onClick,
    'aria-label': ariaLabel,
    ...rest 
  }: MotionProps) => {
    const [style, setStyle] = React.useState(initial || {});
    
    React.useEffect(() => {
      if (!animate) return;
      
      const timer = setTimeout(() => {
        setStyle(animate);
      }, (transition?.delay || 0) * 1000);
      
      return () => clearTimeout(timer);
    }, [animate, transition?.delay]);
    
    const animationStyle = {
      ...style,
      transition: `all ${transition?.duration || 0.3}s ease-in-out`,
    };
    
    return (
      <button 
        className={className} 
        style={animationStyle}
        onClick={onClick}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </button>
    );
  }
};
