
import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
  intensity?: 'low' | 'medium' | 'high';
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className = '', 
  delay = 0,
  intensity = 'medium' 
}) => {
  const [displayed, setDisplayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!displayed) {
    return <span className={className}>&nbsp;</span>;
  }

  // Determine animation intensity
  let animationClass = '';
  switch (intensity) {
    case 'low':
      animationClass = 'animate-[text-glitch_5s_ease-in-out_infinite]';
      break;
    case 'high':
      animationClass = 'animate-[text-glitch_0.3s_ease-in-out_infinite]';
      break;
    case 'medium':
    default:
      animationClass = 'animate-[text-glitch_0.5s_ease-in-out_infinite]';
  }

  return (
    <span 
      className={`cyber-glitch ${animationClass} ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
};

export default GlitchText;
