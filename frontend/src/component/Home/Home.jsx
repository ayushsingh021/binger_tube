import React, { useState} from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Boxes } from "@/components/ui/background-boxes";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";
import NameCard from "../NameCard/NameCard";
import Scroller from "../Scroller/Scroller";
import axios from "axios";
import swal from "sweetalert";
import Loader from "../Loader/Loader";

export default function Home() {
  const [link, setLink] = useState({
    linkVal: "",
  });

  const [progress, setProgress] = useState(5)

  // useEffect(() => {
  //   const timer = setTimeout(() => setProgress(66), 500)
  //   return () => clearTimeout(timer)
  // }, [])
 

  const [videoData, setVideoData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // const {videoLink , src , title} = videoData;

  const { linkVal } = link;

  function onChange(e) {
    setLink((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setRefresh(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-videos/",
        {
          params: {
            url: linkVal,
          },
        }
      );
      // console.log(response.data.video_info)
      setVideoData(response.data.video_info);
      setRefresh(false);
    } catch (error) {}
  }

  let videoLinks = [];
  for(let i = 0 ; i < videoData.length ;i++){
      videoLinks.push(videoData[i].videoLink)
  }
  console.log(videoLinks)
  async function onClickHandler() {
    try {
      const response = await axios.post("http://localhost:8000/api/download_playlist/", {
          links: videoLinks
      });
      const timer = setTimeout(() => setProgress(10), 1000)
     
      console.log(response.data);
      setProgress(100)
      return () => clearTimeout(timer)

  } catch (error) {
      console.log(error);
  }
  }
  console.log(videoData);

  if (refresh) {
    <Loader />;
  }

  return (
    <div className="h-full relative z-10 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      {refresh && <Loader className="" />}
      <div className="absolute inset-0 w-full h-full bg-slate-900  [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <div className="lg:flex justify-between lg:space-x-20 top-20 items-center relative p-4">
        <NameCard />

        <div className="flex flex-col items-center ">
          <div className="relative w-full z-10 max-w-xl sm:mt-1 text-center sm:text-right justify-center items-center">
            <form
              onSubmit={onSubmit}
              className="flex max-w-sm space-x-2 text-white"
              action=""
            >
              <Input
                type="text"
                name="linkVal"
                id="linkVal"
                placeholder="Paste Youtube Playlist Link"
                value={linkVal}
                onChange={onChange}
                required
              />
              <Button type="submit" variant="outline" className="text-black">
                Submit
              </Button>
            </form>
          </div>
          {/* <Boxes /> */}

          <aside className="text-black rounded-lg sm:py-5">
            <div className=" justify-center sm:py-24">
              <h1 className="relative head_text text-center">
                <span className="orange_gradient">
                  {" "}
                  Binge Youtube Playlists{" "}
                </span>
              </h1>
              <p className=" mt-5 text-lg sm:text-xl max-w-2xl mb-10 pb-8 green_gradient text-left pl-2 pr-2 ">
                Here is the amazing platform that let you Download your youtube
                video lectures/playlist in your computer in single click.
              </p>
            </div>
          </aside>
        </div>
      </div>
      
   
      {videoData.length !== 0 && (
        <div className="h-full relative z-10 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
          <Button
            type="submit"
            variant="outline"
            className="text-black mb-5"
            onClick={onClickHandler}
          >
            Download All Videos
          </Button>
          <Progress value={progress} className="w-[60%] bg-white z-100 mb-2 items-center justify-center border-green-300 border-solid border-2" />

          <Scroller videoInfo={videoData} />
        </div>
      )}

      {/* </div> */}
    </div>
  );
}
