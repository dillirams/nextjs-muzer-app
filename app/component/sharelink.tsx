"use client";
import { use, useEffect, useState } from "react";
import {
  Facebook,
  Twitter,
  Mail,
  MessageCircle,
  Link,
  Copy,
  Share2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import prisma from "../lib/db";

export  function ShareLink() {
  
const session=useSession();
const [shareId, setShareId]=useState<string>()

if(!session) throw new Error("you are not eligible to share")

  async function getId() {
    const res=await fetch("api/extractid",{
      method:"GET"
    })
    const data=await res.json();
    console.log(data)
    setShareId(data?.userId )
  }

useEffect(()=>{
    getId()
},[])


  
  const shareableLink = `http://localhost:3000/share?userId=${shareId}`;
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const shareOptions = [
    { name: "Facebook", color: "bg-blue-600", icon: <Facebook className="w-5 h-5" /> },
    { name: "WhatsApp", color: "bg-green-500", icon: <MessageCircle className="w-5 h-5" /> },
    { name: "X", color: "bg-black", icon: <Twitter className="w-5 h-5" /> },
    { name: "Email", color: "bg-gray-500", icon: <Mail className="w-5 h-5" /> },
    { name: "Reddit", color: "bg-orange-500", icon: <Link className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-neutral-500 text-white p-2 rounded-xl w-full shadow-2xl space-y-4">
      <h3 className="text-lg font-medium text-bold flex items-center gap-2">
        <Share2 className="w-5 h-5" /> Share
      </h3>

      <div className="flex justify-between items-center gap-3">
        {shareOptions.map((option) => (
          <button
            key={option.name}
            className={`${option.color} hover:opacity-80 transition rounded-full p-3`}
            title={option.name}
          >
            {option.icon}
          </button>
        ))}
      </div>

      <div className="flex gap-1 items-center rounded-lg overflow-hidden w-full">
        <input
          type="text"
          value={shareableLink}
          disabled
          className="flex-1 rounded-lg px-3 py-2 text-sm text-white-300 w-34  bg-neutral-800"
        />
        <button
          onClick={handleCopy}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-sm font-medium transition flex items-center gap-1 rounded-lg"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
