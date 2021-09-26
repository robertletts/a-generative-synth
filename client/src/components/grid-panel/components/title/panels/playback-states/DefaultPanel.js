import { useState, useEffect, useRef } from 'react';

const DEFAULT_TEXT = 'a generative synth.';

export const DefaultPanel = ({ text = DEFAULT_TEXT }) => {
  const [currentText, setCurrentText] = useState(text);
  const pendingTextUpdates = useRef(null);
  const [animationActive, setAnimationActive] = useState(true);

  /**
   * Reset the default view after the notification message
   * has been displayed
   */
  useEffect(() => {
    if (text !== DEFAULT_TEXT) {
      setAnimationActive(false);
      setCurrentText(text);
      pendingTextUpdates.current = setTimeout(() => {
        setAnimationActive(true);
        setCurrentText(DEFAULT_TEXT);
      }, 2500);
    }
    return () => {
      clearTimeout(pendingTextUpdates.current);
    };
  }, [text]);

  return (
    <div>
      <h1
        className="title-fade-in"
        style={animationActive ? { animation: 'fade-in ease 2s' } : {}}
      >
        {currentText}
      </h1>
    </div>
  );
};
