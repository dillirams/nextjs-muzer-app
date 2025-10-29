"use client";
import { useSession } from "next-auth/react";
import { addStream } from "../actions/formdata";
import { useState } from "react";
import { NowPlaying } from "./playing";

export function Addstream() {
  const session = useSession();
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5 md:gap-20 h-full ">
      {/* Add a Song */}
      <div className="">
        <h2 className="text-lg font-semibold mb-4">Add a song</h2>
        <form
          action={async (formData) => {
            try {
              const res = await addStream(formData);
              alert(res?.message);
              setStream(res?.stream.title as string);
            } catch (err) {
              setError(
                err instanceof Error
                  ? err.message
                  : "An unknown error occurred"
              );
            }
          }}
          className="flex flex-col space-y-3"
        >
          <input
            type="url"
            name="url"
            placeholder="Paste YouTube link here"
            className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none w-full"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 font-medium transition w-full"
          >
            Add to Queue
          </button>
        </form>
      </div>

      {/* Now Playing Section */}
         
    </div>
  );
}
