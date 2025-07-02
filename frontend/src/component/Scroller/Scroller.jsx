import React from "react";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area.jsx";
import { Button } from "../../components/ui/button.jsx";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import avatar from "../../assets/binge_tube_logo.jpg";

function Scroller({ videoInfo }) {
  const API_URL = import.meta.env.VITE_FASTAPI_ENDPOINT;
  const [refresh, setRefresh] = useState(false);

  async function onClickHandler(videoLink) {
    window.location.href = `${API_URL}/api/download_video/?link=${videoLink}`;
  }
  if (refresh) {
    <Loader />;
  }
  return (
    <div>
      {refresh && <Loader className="" />}

      <ScrollArea className="h-96 rounded-md border mb-10 p-8">
        <div className="flex flex-col justify-center items-center space-y-1">
          {videoInfo.map((item) => (
            <div className="p-2 w-3/4" key={item.title}>
              <div className="flex lg:flex-row flex-col w-300 h-300 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div>
                  <img
                    className="object-cover p-1 rounded-lg w-full rounded-t-lg h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src={item.src == null ? `${avatar}` : item.src}
                    alt=""
                  />
                </div>
                <div className="flex flex-col lg:w-3/4 justify-between items-center p-4 leading-normal h-200 w-200">
                  <div className="">
                    <h5 className="line-clamp-2  mb-2 text-xl font-bold tracking-tight text-wrap text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.title}
                    </h5>
                  </div>

                  <Button
                    type="submit"
                    variant="outline"
                    className="text-white w-1/2 text-center bg-green-600 hover:bg-green-400"
                    onClick={() => onClickHandler(item.videoLink)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}

export default Scroller;
