import { useState } from "react";
import axios from "axios";

export const useRadar = () => {
  const [wxTime, setWxTime] = useState("");
  const [wxRadarImg, setWxRadarImg] = useState("");

  const getRadar = () => {
    axios
      .get("https://api.rainviewer.com/public/maps.json")
      .then(({ data }) => {
        let unixtime = data[data.length - 1];
        const imgSrc =
          "https://tilecache.rainviewer.com/v2/radar/" +
          unixtime +
          "/1024/7/35.55/139.78/11/0_0.png";
        setWxRadarImg(imgSrc);
        let wxtime = new Date(unixtime * 1000);
        setWxTime(
          "WX RADAR " +
            wxtime.getUTCHours().toString().padStart(2, "0") +
            wxtime.getUTCMinutes().toString().padStart(2, "0") +
            "z"
        );
      })
      .catch(() => {
        setWxTime("WX RADAR FAIL");
      });
  };

  return { wxTime, wxRadarImg, getRadar }; // 必要な値や関数を返す
};

