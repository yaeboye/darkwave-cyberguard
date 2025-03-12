
import React, { useState, useEffect } from 'react';

interface TerminalTextProps {
  text: string;
  typingSpeed?: number;
  className?: string;
  blinkCursor?: boolean;
  onComplete?: () => void;
}

const TerminalText: React.FC<TerminalTextProps> = ({
  text,
  typingSpeed = 40,
  className = '',
  blinkCursor = true,
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let interval: NodeJS.Timeout;

    if (isTyping) {
      interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          onComplete && onComplete();
        }
      }, typingSpeed);
    }

    return () => {
      clearInterval(interval);
    };
  }, [text, typingSpeed, isTyping, onComplete]);

  return (
    <div className={`font-cyber ${className}`}>
      <span>{displayText}</span>
      {isTyping || blinkCursor ? (
        <span className="inline-block w-2 h-4 bg-cyber-blue ml-1 animate-[blink-caret_0.75s_step-end_infinite]"></span>
      ) : null}
    </div>
  );
};

export default TerminalText;
