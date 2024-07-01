import React from 'react'
import { PinContainer } from '../../components/ui/3d-pin';
import avatar from "../../assets/binge_tube_logo.jpg";




function NameCard() {
  return (
      <div className="h-[30rem] mb-20 pb-10 flex items-center justify-center z-10 relative">
        <a href="https://ayushpersonalsite-fawn.vercel.app">
          <PinContainer
            title="ayushpersonalsite"
            href="https://ayushpersonalsite-fawn.vercel.app"
          >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[22rem] h-[25rem]">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                Developed By
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500">
                  Ayush Singh | A Pre-Final Year Student at NIT Kurukshetra &#128522;
                </span>
              </div>
              <img className="flex flex-1 w-full rounded-lg mt-4" src={avatar} alt="" />
            </div>
          </PinContainer>
        </a>
      </div>
  );
}

export default NameCard;