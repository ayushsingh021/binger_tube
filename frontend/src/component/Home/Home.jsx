import React, { useState } from "react";

import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Progress } from "../../components/ui/progress.jsx";
import NameCard from "../NameCard/NameCard.jsx";
import Scroller from "../Scroller/Scroller.jsx";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { ToastContainer,toast } from "react-toastify";




export default function Home() {
  
  // console.log(import.meta.env.VITE_FASTAPI_ENDPOINT);
  const API_URL = import.meta.env.VITE_FASTAPI_ENDPOINT
  const [link, setLink] = useState({
    linkVal: "",
  });

  const [progress, setProgress] = useState(5);
  const [videoData, setVideoData] = useState([]);
  const [refresh, setRefresh] = useState(false);


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
      `${API_URL}/api/get-videos/`,
        {
          params: {
            url: linkVal,
          },
        }
      );
      // console.log(response.data.video_info)
      setVideoData(response.data.video_info);
      setRefresh(false);
    } catch (error) {
      console.log(error.message);

      
      setRefresh(false);
      toast.error(error.message);
    }
  }

  let videoLinks = [];
  for (let i = 0; i < videoData.length; i++) {
    videoLinks.push(videoData[i].videoLink);
  }
  // console.log(videoLinks);


  //main project work
  async function onClickHandler() {
    setRefresh(true);
          try {
            // Make a POST request to download the videos and get a ZIP file
            const response = await axios.post(`${API_URL}/api/download_playlist/`, {
                links: videoLinks,
            }, {
                responseType: 'blob' // Ensure the response is treated as a blob
            });

            // Create a temporary link element for downloading the ZIP file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'videos.zip');

            // Append the link to the document body
            document.body.appendChild(link);

            // Trigger a click event on the link to start the download
            link.click();

            // Remove the link from the document body after the download
            link.parentNode.removeChild(link);

            // Optionally, update the UI or set a flag to indicate that the download is complete
            // console.log("Download started");
            setRefresh(false);
            toast.success("Download Started");
            
        } catch (error) {
            setRefresh(false);
            toast.error(error.message);
            
            console.error("Error downloading videos:", error);
        }
  }

  //personal use
  // async function onClickHandler() {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/download_playlist_local/",
  //       {
  //         links: videoLinks,
  //       }
  //     );
  //     const timer = setTimeout(() => setProgress(10), 1000);

  //     console.log(response.data);
  //     setProgress(100);
  //     return () => clearTimeout(timer);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // console.log(videoData);

  if (refresh) {
    <Loader />;
  }


  return (
    
    <section >
        <div className="h-full relative z-10 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      {refresh && <Loader className="" />}
      
      <div className="absolute inset-0 w-full h-full bg-slate-900  [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <div className="lg:flex justify-between lg:space-x-20 top-20 items-center relative p-4">
        <NameCard />
        <div className="flex flex-col items-center ">
          <div className="relative w-full z-10 max-w-xl sm:mt-1 sm:text-right justify-center ">
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
              <Button type="submit" variant="outline" className="text-black hover:bg-green-400">
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
            className="text-black mb-5 hover:bg-green-400"
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
        
    </section>
    
  
  );
}
