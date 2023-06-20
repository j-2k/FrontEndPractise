import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [sentence, setSentence] = useState('');

  useEffect(() => {
    // Function to generate a dynamic sentence
    const generateSentence = () => {
      // Generate your dynamic sentence here
      const dynamicSentence = 'This is a dynamic sentence: ' + new Date().toLocaleTimeString();
      setSentence(dynamicSentence);
    };

    // Call the function initially
    generateSentence();

    // Update the sentence every second
    const intervalId = setInterval(generateSentence, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
      <p>{sentence}</p>
  );
}

export default MyComponent;
