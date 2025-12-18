"use client";
import { useSession } from "next-auth/react";
import { addStream } from "../actions/formdata";
import { useState, useRef } from "react";
import { NowPlaying } from "./playing";
import { Link, Plus, Loader2 } from "lucide-react";
import { useStreamStore } from "../store/create";

interface AddStreamProps{
  dream:Boolean
}

export function Addstream(props:AddStreamProps) {
  const session = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const {wss}= useStreamStore();

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Add a Song Card */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col space-y-1 mb-6">
          <h2 className="text-xl font-bold text-white">Add to Queue</h2>
          <p className="text-sm text-zinc-400">Paste a YouTube or Spotify link to start listening.</p>
        </div>

        <form
          ref={formRef}
          action={async (formData) => {
            setLoading(true);
            setError(null);
            try {
              const res = await addStream(formData, props.dream );
              if (res) {
                // Ideally use a toast here
                alert(res.url);
                wss?.send(JSON.stringify({
                  type:"chat",
                  payload:{
                    url:res.url,
                    extractedID:res.extractedID,
                    title: res.title,
                    thumbnails:res.thumbnails
                  }
                }))
              }
              formRef.current?.reset();
            } catch (err) {
              setError(
                err instanceof Error
                  ? err.message
                  : "An unknown error occurred"
              );
            } finally {
              setLoading(false);
            }
          }}
          className="flex flex-col space-y-4"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="url"
              name="url"
              placeholder="https://youtube.com/watch?v=..."
              className="block w-full pl-10 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add to Queue
              </>
            )}
          </button>
        </form>
      </div>

      {/* Now Playing Section */}
      <div className="flex-1 min-h-0">
        <NowPlaying />
      </div>
    </div>
  );
}
