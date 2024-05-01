import React from 'react'
import { PinContainer } from '@/components/ui/3d-pin';

function NameCard() {
    return (
        <div className="h-[30rem] mb-20 pb-10 flex items-center justify-center z-10 lg:z-10 ">
          <PinContainer
            title="ayushpersonalsite"
            href="https://ayushpersonalsite-fawn.vercel.app"
          >
            
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[22rem] h-[25rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                Developed By
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                 Ayush Singh | A Pre-Final Year Student at NIT Kurukshetra
                </span>
              </div>
              <div className=" flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-r from-blue-200 to-cyan-200" />
            </div>
          </PinContainer>
        </div>
      );
}

export default NameCard