"use client";
import React, { useEffect, useState } from "react";

interface DotGridProps {
  gridSize: number;
  spacing: number;
  dotRadius: number;
  dotColor: string;
}

const DotGrid: React.FC<DotGridProps> = ({
  gridSize,
  spacing,
  dotRadius,
  dotColor,
}) => {
  const [currentColor, setCurrentColor] = useState(dotColor);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newColor = getRandomColor();
      setCurrentColor(newColor);
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  const getRandomColor = () => {
    const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Generate an array of coordinates for the dots
  const coordinates = Array.from(
    { length: gridSize },
    (_, index) => index * spacing
  );

  return (
    <svg
      width={spacing * gridSize}
      height={spacing * gridSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      {coordinates.map((y) =>
        coordinates.map((x) => (
          <circle
            key={`${x}-${y}`}
            cx={x + spacing / 2}
            cy={y + spacing / 2}
            r={dotRadius}
            fill={currentColor}
          />
        ))
      )}
    </svg>
  );
};

export default DotGrid;
