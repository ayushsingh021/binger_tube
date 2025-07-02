import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";

import { Progress } from "../../components/ui/progress.jsx";
import NameCard from "../NameCard/NameCard.jsx";
import Scroller from "../Scroller/Scroller.jsx";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const API_URL = import.meta.env.VITE_FASTAPI_ENDPOINT;
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
      const response = await axios.get(`${API_URL}/api/get-videos/`, {
        params: {
          url: linkVal,
        },
      });
      // console.log(response.data.video_info)
      setVideoData(response.data.video_info);
      setRefresh(false);
    } catch (error) {
      console.log(error.message);

      setRefresh(false);
      toast.error(error.message);
    }
  }

  //main project work
  async function onClickHandler() {
    window.location.href = `${API_URL}/api/download_playlist/?link=${linkVal}`;
  }

  if (refresh) {
    <Loader />;
  }

  return (
    <section>
      <div className="h-full z-10 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        {refresh && <Loader className="" />}

        <motion.div
          className="h-full w-full z-10  relative"
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <div className="gradient" />
        </motion.div>

        <div className="inset-0 w-full h-full bg-slate-900  [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <div className="lg:flex justify-between lg:space-x-20 mt-20 items-center p-4">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full z-10 max-w-xl sm:mt-1 sm:text-right justify-center ">
              <form
                onSubmit={onSubmit}
                className="flex  space-x-2 text-white"
                action=""
              >
                <Input
                  type="text"
                  name="linkVal"
                  id="linkVal"
                  placeholder="Paste youtube playlist link to download"
                  value={linkVal}
                  onChange={onChange}
                  required
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="text-black hover:bg-green-400"
                >
                  Submit
                </Button>
              </form>
            </div>
            {/* <Boxes /> */}

            <div className=" text-black rounded-lg flex flex-col justify-between items-center space-y-8 sm:py-24">
              <h1 className="relative head_text text-center">
                <span className="orange_gradient">
                  {" "}
                  Binge Youtube Playlists Easily
                </span>
              </h1>
              <p className="text-center text-lg sm:text-xl max-w-2xl pb-8 green_gradient">
                Here is the amazing platform that let you Download your youtube
                video lectures/playlists in your computer with ease.
              </p>
              <p className="text-center text-white font-thin text-sm max-w-2xl ">
                You can download the complete playlist or each video one by one
                of your playlist with single click
              </p>
            </div>
          </div>
        </div>
        {videoData.length !== 0 && (
          <div className="h-full p-8 z-10 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
            <Button
              type="submit"
              variant="outline"
              className="text-black mb-5 hover:bg-green-400"
              onClick={onClickHandler}
            >
              Download All Videos
            </Button>
            {/* <Progress
              value={progress}
              className="w-[60%] bg-white z-100 mb-2 items-center justify-center border-green-300 border-solid border-2"
            /> */}

            <Scroller videoInfo={videoData} />
          </div>
        )}

        {/* </div> */}
      </div>
    </section>
  );
}
