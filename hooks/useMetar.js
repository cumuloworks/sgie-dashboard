import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMetar = () => {
  const [metarData, setMetarData] = useState('METAR UPLINK READY...');

  const getMetar = () => {
    const cachedData = localStorage.getItem('metarData');
    const cacheTime = localStorage.getItem('metarCacheTime');

    if (cachedData && cacheTime && new Date().getTime() - cacheTime < 5 * 60 * 1000) {
      setMetarData(cachedData);
    } else {
      axios
        .get('https://avwx.rest/api/metar/rjtt', {
          headers: { Authorization: process.env.NEXT_PUBLIC_AVWX_API_KEY },
        })
        .then(({ data }) => {
          localStorage.setItem('metarData', data.raw);
          localStorage.setItem('metarCacheTime', new Date().getTime());
          setMetarData(data.raw);
        })
        .catch(() => {
          setMetarData('WX UPLINK FAIL');
        });
    }
  };

  useEffect(() => {
    getMetar();
  }, []);

  return metarData;
};
