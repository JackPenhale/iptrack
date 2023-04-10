import headerImage from "./images/pattern-bg-desktop.png";
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

export default function App() {
  const [findIp, setFindIp] = useState("");
  const [ipInfo, setIpInfo] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 39.7392,
    lng: -104.991531,
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const handleKeydown = (event) => {
    if (event.keyCode === 13) {
      handleClick();
    }
  };

  const handleClick = () => {
    console.log("yooo");

    fetch(`http://ip-api.com/json/${findIp}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIpInfo(data);
        setMapCenter({ lat: data.lat, lng: data.lon });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="flex flex-col justify-center content-center w-screen items-center font">
      <h1 className="font-medium text-3xl z-30 text-white font-mono pt-12">
        IP Address Tracker
      </h1>
      <img
        src={headerImage}
        className="w-full absolute top-0 left-0 -z-50 min-h-full"
      />
      <div className="relative w-11/12 md:w-1/3 mt-12">
        <input
          className="bg-white rounded-lg h-14 w-full z-30 md:text-center focus:outline-none pl-7 md:pl-0"
          onChange={(e) => setFindIp(e.target.value)}
          placeholder="Search for any IP address or domain"
          onKeyDown={handleKeydown}
        />
        <div
          className=" absolute w-16 rounded-r-lg bg-slate-900 h-full bottom-0 right-0 text-white text-4xl cursor-pointer hover:bg-slate-700"
          onClick={handleClick}
        >
          <div className="flex w-full h-full content-center justify-center items-center align-middle">
            >
          </div>
        </div>
      </div>
      <div className="md:h-40  h-56 w-3/4 bg-white flex flex-col md:flex-row rounded-3xl justify-center items-center text-center md:justify-around mt-12">
        <div className="flex flex-col md:text-left md:w-1/4 align-middle justify-center">
          <h2 className="font-bold text-xs text-slate-400">IP ADDRESS</h2>
          <h2 className="font-medium text-lg">{`${ipInfo.query}`}</h2>
        </div>
        <div className="md:flex h-full justify-center align-middle items-center hidden ">
          <div className="border-l-2 h-2/3 border-slate-300" />
        </div>
        <div className="flex flex-col md:text-left md:w-1/4 align-middle justify-center pt-4 md:pt-0">
          <h2 className="font-bold text-xs text-slate-400">LOCATION</h2>
          <h2 className="font-medium text-lg">{`${ipInfo.city}, ${ipInfo.region}`}</h2>
        </div>
        <div className="md:flex h-full justify-center align-middle items-center hidden ">
          <div className="border-l-2 h-2/3 border-slate-300" />
        </div>
        <div className="flex flex-col md:text-left md:w-1/4 align-middle justify-center pt-4 md:pt-0">
          <h2 className="font-bold text-xs text-slate-400">ISP</h2>
          <h2 className="font-medium text-lg">{`${ipInfo.isp}`}</h2>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 h-2/3 w-screen -z-40">
        <LoadScript googleMapsApiKey={process.env.GOOGLE_API_MAP_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={12}
          >
            <MarkerF position={mapCenter}></MarkerF>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
