"use client";

import { Button } from "@/components/ui/button";
import { Share2, Plus, Link, Users, Globe } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ShareLink } from "./sharelink";


export function SharePopover() {
  const [enterEmail, setEnterEmail] = useState(false);
  const [share, setShare] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 rounded-full px-6 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">
          <Share2 size={18} />
          Share
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[90vw] max-w-md p-0 rounded-2xl shadow-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl overflow-hidden mr-4">
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800/50 bg-zinc-900/30">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Share & Collaborate
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Invite friends to listen together or share your playlist.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Live Collaboration Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg mt-1">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">Live Collaboration</h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Invite people to join your playlist and rock together.
                    Collaboration is end-to-end encrypted and private.
                  </p>
                </div>
              </div>

        
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-zinc-800"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-zinc-600 uppercase tracking-wider font-medium">Or</span>
              <div className="flex-grow border-t border-zinc-800"></div>
            </div>

            {/* Shareable Link Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg mt-1">
                  <Globe className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">Share Public Link</h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    Anyone with the link can view your playlist.
                  </p>
                </div>
              </div>

              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${share ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pt-2">
                  <ShareLink />
                </div>
              </div>

              {!share && (
                <Button
                  onClick={() => setShare(true)}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                >
                  <Link size={16} className="mr-2" />
                  Get Link
                </Button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 text-center">
            <p className="text-xs text-zinc-600">
              Muzer respects your privacy. No data is shared with third parties.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
