import { useState, useEffect } from 'react';

export const useRoomTemp = () => {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    const fetchRoomTemperature = async () => {
      try {
        const response = await fetch("/api/switchbot");
        const data = await response.json();
        setTemp(data);
      } catch (err) {
        console.error("Error processing temperature data: ", err);
      }
    };

    fetchRoomTemperature();
  }, []);

  return temp;
};
