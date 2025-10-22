"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Appbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <div
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-white tracking-wide cursor-pointer hover:text-indigo-400 transition"
        >
         <span className="text-indigo-500"> Muser</span>
        </div>

        {/* Auth Buttons */}
        <div>
          {session?.user ? (
            <div className="flex items-center space-x-4">
              {/* User avatar if available */}
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-zinc-700 object-cover"
                />
              )}

              <span className="hidden sm:inline text-sm text-gray-300 font-medium">
                {session.user.name?.split(" ")[0]}
              </span>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/streamboard",
                  prompt: "consent",
                })
              }
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
