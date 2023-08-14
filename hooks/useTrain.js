import { useState, useEffect } from "react";

export const useTrain = () => {
  const [trainInfoText, setTrainInfoText] = useState("");
  const [metroStatus, setMetroStatus] = useState("");

  const fetchTrainData = async () => {
    const response = await fetch("/api/train");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    (async function () {
      const fetchData = await fetchTrainData(); // ここでも関数名を変更
      // displayTrainInfoやその他のロジックを必要に応じてここに追加
    })();
  }, []);

  return { trainInfoText, metroStatus };
};
