"use client"
import React, {useState, useEffect} from 'react';

export function TextOverflowWithEllipsis({ children, className, maxCharacters = 120 }) {
    const [isTruncated, setIsTruncated] = useState(false);
  
    const ref = React.createRef();
  
    useEffect(() => {
      const element = ref.current;
      if (!element) return;
  
      const textWidth = element.textContent.length; // Get text length in characters
      setIsTruncated(textWidth > maxCharacters);
    },[maxCharacters]);
  
    return (
      <h4
        ref={ref}
        className={className} // Remove conditional class for simplicity
      >
        {isTruncated
          ? `${children.slice(0, maxCharacters)}...`
          : children}
      </h4>
    );
  }
  