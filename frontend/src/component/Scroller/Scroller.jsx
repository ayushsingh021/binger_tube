import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function Scroller() {
  return (
    <div>
      <ScrollArea className="h-96 whitespace-nowrap rounded-md border mb-10 ">
        <div className="flex flex-col space-y-4 p-4">
          <figure className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src="https://images.pexels.com/photos/1452701/pexels-photo-1452701.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Artwork"
                className="aspect-[3/4] h-[100px] w-full object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by Ayush
            </figcaption>
          </figure>

          <figure className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src="https://images.pexels.com/photos/1452701/pexels-photo-1452701.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Artwork"
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by Ayush
            </figcaption>
          </figure>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}

export default Scroller;
