"use client"
import Image from "next/image";
import { Appbar } from "./component/appbar";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [active, setActive] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Appbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center flex-grow px-6 py-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Welcome to <span className="text-indigo-500">Muser</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-8">
          Stream, share, and discover your favorite music together.  
          A place where songs connect people.
        </p>

        <button
          onClick={() =>  signIn("google", {
                            callbackUrl: "/streamboard",
                            prompt: "consent",
                          })}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl font-medium text-lg shadow-lg"
        >
          Get Started
        </button>

        {/* Decorative Image / Illustration */}
            <div
      className="mt-16 relative w-full max-w-2*lg flex justify-center items-center overflow-hidden"
      onClick={() => {
        setActive(true);
        setTimeout(() => setActive(false), 3000); // reset after animation
      }}
    >
      <Image
        src="/music-notes-svgrepo-com.svg"
        alt="Music Visualization"
        width={600}
        height={400}
        className={`opacity-90 mx-auto transition-transform duration-700 ease-out
          ${active ? "animate-fromSpace" : "animate-musicWave"}
        `}
      />
    </div>

      </main>

      
    
    </div>
  );
}
