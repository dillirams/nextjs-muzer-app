"use client"
import { Appbar } from "./component/appbar";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Music, Share2, Radio, Headphones } from "lucide-react";
import { CreateRoom } from "./component/createroom";
import { JoinRoom } from "./component/joinroom";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans selection:bg-indigo-500/30">
      <Appbar />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col">
        <section className="relative flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20">
            <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              New: Social Listening Rooms
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
              Listen Together, <br className="hidden md:block" />
              Anywhere.
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Muzer brings your friends and music together. Create rooms, queue songs from YouTube, and vibe in real-time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => signIn("google", { callbackUrl: "/streamboard", prompt: "consent" })}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <Headphones className="w-5 h-5" />
                Start Listening
              </button>
             <CreateRoom/>
              <JoinRoom/>
              <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full font-semibold transition-all border border-zinc-800 flex items-center justify-center gap-2">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-zinc-900/50 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard
                icon={<Radio className="w-8 h-8 text-indigo-400" />}
                title="Live Streaming"
                description="Stream music in high quality with low latency. Everyone hears the same beat at the same time."
              />
              <FeatureCard
                icon={<Share2 className="w-8 h-8 text-purple-400" />}
                title="Collaborative Queues"
                description="Let everyone be the DJ. Add songs to the queue and vote for what plays next."
              />
              <FeatureCard
                icon={<Music className="w-8 h-8 text-pink-400" />}
                title="Music Discovery"
                description="Discover new tracks from your friends' playlists and expand your musical horizons."
              />
            </div>
          </div>
        </section>
      </main>


    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-indigo-500/30 transition-colors">
      <div className="p-4 rounded-full bg-zinc-950 border border-zinc-800 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
