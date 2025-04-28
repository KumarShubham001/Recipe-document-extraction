
import './index.css'
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const boxes = Array.from({ length: 10 }, (_, i) => i);
  const filledBoxes = Math.floor(progress / 10);

  return (
    <div className="progress-bar-container">
      {boxes.map((boxIndex) => (
        <div
          key={boxIndex}
          className={`progress-box ${boxIndex < filledBoxes ? 'filled' : 'unfilled'}`}
        />
      ))}
    </div>
  );
};
export default ProgressBar;
