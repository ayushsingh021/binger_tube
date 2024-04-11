import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 justify-center items-center ">
      <aside className="relative text-black rounded-lg sm:py-5">
  
        <div className="z-10 justify-center  pb-20 pt-1 sm:py-24  ">
          <div className="max-w-xl sm:mt-1 mt-80 text-center sm:text-right justify-center items-center">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>

      </aside>

      {/* <div className="grid  place-items-center sm:mt-20">
        <img
          className="sm:w-96 w-48"
          src="https://img.freepik.com/free-vector/people-holding-cloud-social-networking-icons_53876-32621.jpg?size=626&ext=jpg&ga=GA1.1.814386989.1707304550&semt=sph"
          alt="image2"
        />
      </div> */}

      {/* <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">
        Lorem Ipsum Awwwsm
      </h1> */}
    </div>
  );
}
