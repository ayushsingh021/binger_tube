import React from "react";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useState } from "react";
import { toast } from "react-toastify";


function Scroller({videoInfo}) {
  const [refresh, setRefresh] = useState(false);
 

  async function onClickHandler(videoLink) {
    setRefresh(true);
    try {
        // Make a GET request to download the single video
        const response = await axios.get(
            `${API_URL}/api/download_video/`,
            {
                params: {
                    link: videoLink,
                    
                },
                responseType: 'blob' // response is treated as a blob
            }
        );

        // Extract the filename from the content disposition header
        // console.log(response.headers)
        const disposition = response.headers['content-disposition'];
        // console.log(disposition)
        const filename = disposition ? disposition.split('filename=')[1].replace(/"/g, '') : 'video.mp4';

        // Create a temporary link element for downloading the video file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.setAttribute('download', filename);

        // Append the link to the document body
        document.body.appendChild(linkElement);

        // Trigger a click event on the link to start the download
        linkElement.click();

        // Remove the link from the document body after the download starts
        document.body.removeChild(linkElement);

        // console.log("Clicked video link:", videoLink);
        setRefresh(false);
        toast.success("Download Started")
    } catch (error) {
      setRefresh(false);
        toast.error(error.message);
        console.error("Error:", error);
    }
}
if (refresh) {
  <Loader />;
}
  return (
    <div>
      {refresh && <Loader className="" />}
      <ScrollArea className="h-96 rounded-md border mb-10 ">
        <div className="flex flex-col justify-center items-center space-y-1">
        {videoInfo.map((item) => (
            <div className="p-2 w-3/4" key={item.title}>
              <div className="flex lg:flex-row flex-col w-300 h-300 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div>
                  <img
                    className="object-cover p-1 rounded-lg w-full rounded-t-lg h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src={item.src == null ? "https://images.pexels.com/photos/1001990/pexels-photo-1001990.jpeg?auto=compress&cs=tinysrgb&w=800":item.src}
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
