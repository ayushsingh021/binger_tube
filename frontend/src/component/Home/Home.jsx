import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import NameCard from "../NameCard/NameCard";
import Scroller from "../Scroller/Scroller";

export default function Home() {
  return (
    <div className="h-full relative z-10 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900  [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <div className="lg:flex justify-between lg:space-x-20 top-20 items-center relative p-4">
        <NameCard  />

        <div className="flex flex-col items-center ">
          <div className="relative w-full z-10 max-w-xl sm:mt-1 text-center sm:text-right justify-center items-center">
            <div className="flex max-w-sm space-x-2 text-white">
              <Input type="text"  placeholder="Paste Youtube Playlist Link" />
              <Button type="submit" variant="outline" className="text-black">
                Submit
              </Button>
            </div>
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

      <Scroller/>

      {/* </div> */}
    </div>
  );
}
