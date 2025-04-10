
import React from 'react';

interface PinterestIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const PinterestIcon: React.FC<PinterestIconProps> = ({ 
  className, 
  size = 24, 
  color = "currentColor" 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v12m-4-4h8"></path>
      <path d="m9 16 3 3 3-3"></path>
    </svg>
  );
};

export default PinterestIcon;
