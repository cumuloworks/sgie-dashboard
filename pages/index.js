import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

import { useMetar } from "/hooks/useMetar";
import { useRadar } from "/hooks/useRadar";
import { useTrain } from "/hooks/useTrain";
import { useWeather } from "/hooks/useWeather";
import { useUrlStatus } from "/hooks/useUrlStatus";
import { useRoomTemp } from "/hooks/useRoomTemp";

export default function Home() {
  const metarData = useMetar();
  const { wxTime, wxRadarImg, getRadar } = useRadar();
  const { trainInfoText, metroStatus } = useTrain();

  const roomTemperature = useRoomTemp();

  const status = useUrlStatus();

  const apiKey = process.env.NEXT_PUBLIC_OWM_API_KEY;
  const cityID = process.env.NEXT_PUBLIC_OWM_CITY_ID;
  const { temperature, minTemperature, maxTemperature } = useWeather(
    cityID,
    apiKey
  );
  
  getRadar();

  const [time, setTime] = useState("....z");

  useEffect(() => {
    const updateUTC = () => {
      const now = new Date();
      let utcHour = now.getUTCHours();
      let utcMinute = now.getUTCMinutes();
      let formattedTime =
        utcHour.toString().padStart(2, "0") +
        utcMinute.toString().padStart(2, "0") +
        "z";
      setTime(formattedTime);
    };
    updateUTC();
  }, []);

  return (
    <div className="flex w-screen h-screen bg-black text-white text-center font-bold font-mono">
      <div className="flex flex-col w-1/2 h-full border">
        <div className="flex flex-col w-full h-1/2 items-center justify-center border">
          <div className="">
            <h1 className="text-9xl">{time}</h1>
            <h2 className="text-6xl">{metarData}</h2>
          </div>
        </div>
        <div className="relative flex flex-col w-full h-1/2 items-center justify-center overflow-hidden border">
          {wxRadarImg && (
            <Image
              src={wxRadarImg}
              alt="Weather Radar"
              width={1024}
              height={1024}
              className="object-cover w-full h-full absolute"
            />
          )}
          <Image
            src="/scanmap.png"
            alt="Image"
            width={1024}
            height={1024}
            className="hidden w-full h-full absolute mix-blend-multiply animate-spin spin-slow"
          />
          <Image
            src="/basemap.png"
            alt="Image"
            width={1024}
            height={1024}
            className="object-cover w-full h-full absolute"
          />
          <Image
            src="/radarrange.png"
            alt="Image"
            width={1024}
            height={1024}
            className="object-cover w-full h-full absolute"
          />
          <div className="absolute bg-black bottom-20">
            <h4 className="text-xl">{wxTime}</h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-full">
        <div className="flex w-full h-1/3">
          <div className="flex w-full h-full">
            <div className="flex flex-col w-1/3 h-full border justify-around">
              <h4 className="text-3xl">ROOM TEMP</h4>
              <h2 className="text-6xl">
                {roomTemperature !== null ? roomTemperature : "Loading..."}
              </h2>
              <div className="flex justify-around">
                <div>
                  <p className="text-4xl">15</p>
                  <h4 className="text-xl">MIN</h4>
                </div>
                <div>
                  <p className="text-4xl">15</p>
                  <h4 className="text-xl">MAX</h4>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/3 h-full border justify-around">
              <h4 className="text-3xl">SERVER TEMP</h4>
              <h2 className="text-6xl">20</h2>
              <div className="flex justify-around">
                <div>
                  <p className="text-4xl">15</p>
                  <h4 className="text-xl">MIN</h4>
                </div>
                <div>
                  <p className="text-4xl">15</p>
                  <h4 className="text-xl">MAX</h4>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/3 h-full border justify-around">
              <h4 className="text-3xl">OUTSIDE TEMP</h4>
              <h2 className="text-6xl">{temperature}</h2>
              <div className="flex justify-around">
                <div>
                  <p className="text-4xl">{minTemperature}</p>
                  <h4 className="text-xl">MIN</h4>
                </div>
                <div>
                  <p className="text-4xl">{maxTemperature}</p>
                  <h4 className="text-xl">MAX</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-1/3 border ">
          <div className="flex flex-col h-full w-full justify-around">
            <h4 className="text-4xl">Fukutoshin Line Operation</h4>
            <div className="">
              <h3 className="text-6xl">{metroStatus}</h3>
              <p>{trainInfoText}</p>
            </div>
            <div className="flex justify-around">
              <div>
                <p className="text-2xl">Wakoshi-bound</p>
                <h4 className="text-4xl">03:00</h4>
              </div>
              <div>
                <p className="text-2xl">Shibuya-bound</p>
                <h4 className="text-4xl">05:00</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-1/3 border ">
          <div className="flex flex-col w-full h-full justify-around">
            <h4 className="text-4xl">Server Operation</h4>
            <div className="flex justify-around">
              <div
                className={`flex flex-col items-center ${
                  status && status[process.env.URL1]
                    ? "opacity-100"
                    : "opacity-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-server-2"
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"></path>
                  <path d="M3 12m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"></path>
                  <path d="M7 8l0 .01"></path>
                  <path d="M7 16l0 .01"></path>
                  <path d="M11 8h6"></path>
                  <path d="M11 16h6"></path>
                </svg>
                <p>CUMULO-SERVER</p>
              </div>
              <div
                className={`flex flex-col items-center ${
                  status && status[process.env.URL2]
                    ? "opacity-100"
                    : "opacity-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-network"
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0"></path>
                  <path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6"></path>
                  <path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6"></path>
                  <path d="M6 9h12"></path>
                  <path d="M3 19h7"></path>
                  <path d="M14 19h7"></path>
                  <path d="M12 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M12 15v2"></path>
                </svg>
                <p>INTERNET</p>
              </div>
              <div
                className={`flex flex-col items-center ${
                  status && status[process.env.URL3]
                    ? "opacity-100"
                    : "opacity-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-devices-2"
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M10 15h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h6"></path>
                  <path d="M13 4m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"></path>
                  <path d="M7 19l3 0"></path>
                  <path d="M17 8l0 .01"></path>
                  <path d="M17 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                  <path d="M9 15l0 4"></path>
                </svg>
                <p>CUMULO-UKB</p>
              </div>
            </div>
            <h3 className="text-6xl">⚪ CHECKING</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
