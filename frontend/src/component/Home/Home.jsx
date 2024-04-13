import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import NameCard from "../NameCard/NameCard";

export default function Home() {
  return (
   

     <div className="h-full relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900  [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <NameCard/>
      
      {/* <div className="bg-gradient-to-r pt-20 from-slate-900 to-slate-700 flex items-center justify-center flex-col"> */}
        
       <div className="relative z-10 max-w-xl sm:mt-1 text-center sm:text-right justify-center items-center">
        
        <div className="flex w-screen max-w-sm space-x-2 text-white">
          <Input type="text" placeholder="Paste Youtube Playlist Link" />
          <Button type="submit" variant="outline" className= "text-black">Submit</Button>
        </div>
      </div>
      <Boxes />

      <aside className="text-black  rounded-lg sm:py-5">
        <div className=" justify-center  pb-20 pt-1 sm:py-24  ">
        
          <h1 className="relative head_text text-center">
            <span className="orange_gradient"> Binge Youtube Playlists </span>
          </h1>
          <p className=" mt-5 text-lg sm:text-xl max-w-2xl green_gradient text-left pl-2 pr-2 ">
            Here is the amazing platform that let you Download your youtube
            video lectures/playlist in your computer in single click.
          </p>
        </div>
      </aside>
     
    {/* </div> */}
    </div>

   
   
  );
}
