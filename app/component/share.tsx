"use client";

import { Button } from "@/components/ui/button";
import { Share2, Plus, Link } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ShareLink } from "./sharelink";
import { EnterEmail } from "./enteremail";

export function SharePopover() {
  const [enterEmail, setEnterEmail]=useState(false);
  const[share,setShare]=useState(false)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center gap-2">
          <Share2 size={18} />
          Share
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[90vw] max-w-84 md:max-w-md p-5 rounded-xl shadow-lg mr-2">
        <div className="space-y-6">
          {/* Live Collaboration Section */}
          <div className="space-y-3 text-center">
            <h4 className="font-semibold text-lg text-indigo-700">
              Live Collaboration
            </h4>
            <p className="text-sm text-muted-foreground">
              Invite people to join your playlist and rock together.
            </p>
            <p className="text-sm text-muted-foreground">
              Collaboration is end-to-end encrypted and fully private. Not even
              our servers can see what you’ve played.
            </p>
            {enterEmail&&<EnterEmail/>}
            <div className="flex justify-center">
              <Button onClick={()=>setEnterEmail(e=>!e)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition">
                <Plus size={18} />
                Invite
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <span className="text-sm text-muted-foreground px-3 bg-background z-10">
              or
            </span>
            <div className="absolute w-full h-px bg-muted" />
          </div>

          {/* Shareable Link Section */}
          <div className="space-y-3 text-center">
            <h4 className="font-semibold text-lg text-indigo-700">
              Shareable Link
            </h4>
              {share&&<ShareLink/>}
            <div className="flex justify-center">
              <Button onClick={()=>setShare(e=>!e)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition">
                <Link size={18} />
                Export Link
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
