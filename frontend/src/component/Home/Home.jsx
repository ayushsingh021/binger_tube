import React, { useState } from "react";
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
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [link, setLink] = useState({
    linkVal: "",
  });

  const [progress, setProgress] = useState(5);

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
  for (let i = 0; i < videoData.length; i++) {
    videoLinks.push(videoData[i].videoLink);
  }
  console.log(videoLinks);

  const [download , setDownload] = useState(false);
 

async function onClickHandler() {
  try {
      // Make a POST request to download the files locally
      const response = await axios.post(
          "http://localhost:8000/api/download_playlist/",
          {
              links: videoLinks,
          }
      );
      console.log(response)
      // Check if the files were downloaded successfully
      if (response.status === 200) {
          for (const link of videoLinks) {
              const videoResponse = await axios.get(`http://localhost:8000/api/download_video/`, {
                  params: { URL: link },
                  responseType: 'blob' // Ensure response is treated as a blob
              });

              const fileSize = videoResponse.headers['content-length'] || 0;

              // Estimate network speed
              const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
              const networkSpeed = connection ? connection.downlink * 1024 * 1024 : 1000000; // Default to 1 Mbps if network speed is not available

              // Calculate download time
              const downloadTime = fileSize / networkSpeed;

              console.log("Estimated download time:", downloadTime.toFixed(2), "seconds");

              // Create a temporary link element for downloading the video file
              const url = window.URL.createObjectURL(new Blob([videoResponse.data]));
              const linkElement = document.createElement('a');
              linkElement.href = url;

              // Extract the filename from the content disposition header
              const disposition = videoResponse.headers['content-disposition'];
              const filename = disposition ? disposition.split('filename=')[1].replace(/"/g, '') : 'video.mp4';

              linkElement.setAttribute('download', filename);

              // Append the link to the document body
              document.body.appendChild(linkElement);

              // Trigger a click event on the link to start the download
              linkElement.click();

              // Remove the link from the document body after the download
              document.body.removeChild(linkElement);
          }

          // Optionally, update the UI or set a flag to indicate that the download is complete
          setDownload(true);
      } else {
          // Handle error if the files were not downloaded successfully
          console.error("Failed to download files");
      }
  } catch (error) {
      console.error("Error downloading files:", error);
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

          <aside className="text-black rounded-lg sm:py-5 ">
            <div className=" justify-center sm:py-24">
              <h1 className="relative head_text text-center">
                {/* <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    
                    "Download Youtube Playlist",
                    2000, // wait 1s before replacing "Mice" with "Hamsters"
                    "Download Youtube Videos",
                    2000,
                    "Download Youtube Lectures",
                    2000,
                  ]}
                  wrapper="span"
                  speed={60}
                  style={{ className:"orange_gradient",}}
                  repeat={Infinity}
                  className="max-w-xl orange_gradient"
                /> */}
                <span className="orange_gradient">
                  {" "}
                  Binge Youtube Playlists{" "}
                </span>
              </h1>
              <p className=" mt-5 text-lg sm:text-xl max-w-2xl pb-8 green_gradient text-left pl-2 pr-2 ">
                Here is the amazing platform that let you Download your youtube
                video lectures/playlists in your computer with ease.
              </p>
              <p className="text-white font-thin text-sm max-w-2xl text-left pl-2 ">
                You can download the complete playlist or each video one by one
                of your playlist with single click
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
          <Progress
            value={progress}
            className="w-[60%] bg-white z-100 mb-2 items-center justify-center border-green-300 border-solid border-2"
          />

          <Scroller videoInfo={videoData} />
        </div>
      )}

      {/* </div> */}
    </div>
  );
}
