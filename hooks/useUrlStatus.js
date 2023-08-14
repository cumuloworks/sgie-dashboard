import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUrlStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/connect_test.js'); // エンドポイントを適切なものに変更してください
        setStatus(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return status;
};