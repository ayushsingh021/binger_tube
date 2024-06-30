import React from "react";
import loader from "../../assets/loader.svg";

export default function Loader() {
  return (
    <div className="z-20 bg-gray-500 bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0">
      <div className="w-40 h-40">
        <svg
          version="1.1"
          id="L2"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 100 100"
          xml:space="preserve"
        >
          <circle
            fill="none"
            stroke="#fff"
            stroke-width="4"
            stroke-miterlimit="10"
            cx="50"
            cy="50"
            r="48"
          />
          <line
            fill="none"
            stroke-linecap="round"
            stroke="#fff"
            stroke-width="4"
            stroke-miterlimit="10"
            x1="50"
            y1="50"
            x2="85"
            y2="50.5"
          >
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
          <line
            fill="none"
            stroke-linecap="round"
            stroke="#fff"
            stroke-width="4"
            stroke-miterlimit="10"
            x1="50"
            y1="50"
            x2="49.5"
            y2="74"
          >
            <animateTransform
              attributeName="transform"
              dur="15s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
        </svg>
        <p className="text-white text-center uppercase">This may take some time</p>
      </div>
    </div>
  );
}