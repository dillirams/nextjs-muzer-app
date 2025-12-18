"use client";
import { useEffect, useState } from "react";
import {
  Facebook,
  Twitter,
  Mail,
  MessageCircle,
  Link as LinkIcon,
  Copy,
  Check,
} from "lucide-react";
import { useSession } from "next-auth/react";

export function ShareLink() {
  const session = useSession();
  const [shareId, setShareId] = useState<string>();
  const [origin, setOrigin] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }

    async function getId() {
      try {
        const res = await fetch("api/extractid", {
          method: "GET",
        });
        const data = await res.json();
        setShareId(data?.userId);
      } catch (e) {
        console.error("Failed to fetch share ID", e);
      }
    }
    if (session.status === "authenticated") {
      getId();
    }
  }, [session.status]);

  const shareableLink = shareId && origin ? `${origin}/streamboard?sharedFrom=${shareId}` : "Loading link...";

  async function handleCopy() {
    if (!shareId || !origin) return;
    await navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareOptions = [
    { name: "WhatsApp", color: "bg-[#25D366] hover:bg-[#20bd5a]", icon: <MessageCircle className="w-5 h-5" /> },
    { name: "Facebook", color: "bg-[#1877F2] hover:bg-[#166fe5]", icon: <Facebook className="w-5 h-5" /> },
    { name: "X", color: "bg-black hover:bg-zinc-900", icon: <Twitter className="w-5 h-5" /> },
    { name: "Reddit", color: "bg-[#FF4500] hover:bg-[#e03d00]", icon: <LinkIcon className="w-5 h-5" /> },
    { name: "Email", color: "bg-zinc-600 hover:bg-zinc-500", icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full space-y-5">
      {/* Link Input & Copy Button */}
      <div className="relative group">
        <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden transition-colors focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50">
          <div className="pl-3 text-zinc-500">
            <LinkIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={shareableLink}
            readOnly
            className="flex-1 bg-transparent border-none text-sm text-zinc-300 px-3 py-3 focus:ring-0 outline-none font-mono truncate"
          />
          <button
            onClick={handleCopy}
            disabled={!shareId}
            className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border-l border-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Social Share Buttons */}
      <div>
        <p className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wider">Share via</p>
        <div className="flex items-center justify-between gap-2">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              className={`${option.color} text-white p-3 rounded-full transition-transform hover:scale-110 shadow-lg shadow-black/20`}
              title={`Share on ${option.name}`}
              onClick={() => {
                // Implement actual sharing logic if needed, for now just a visual button
                // Example: window.open(...)
              }}
            >
              {option.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
