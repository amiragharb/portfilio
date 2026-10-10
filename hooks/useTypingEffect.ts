import { useState, useEffect } from 'react';

const useTypingEffect = (textToType: string, speed: number = 50): string => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset when textToType changes
    if (textToType) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(prev => prev + textToType.charAt(i));
        i++;
        if (i >= textToType.length) {
          clearInterval(intervalId);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }
  }, [textToType, speed]);

  return displayedText;
};

export default useTypingEffect;
