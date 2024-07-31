"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <main className="flex flex-col h-screen">
      <header className="flex justify-start bg-zinc-950 px-4 py-3">
        <h1 className="text-sm">404 - File Not Found</h1>
      </header>

      <div className="flex flex-col bg-red-950 mx-4 rounded-md mt-10 p-3">
        <span className="text-xs">
          The requested file, named &quot;<b className="text-sm">{currentPath}</b>&quot;, cannot be found.
          <br />
          <br />
          <Link href="/" className="text-[#0af]">
            Go to the homepage and try again.
          </Link>
        </span>
      </div>
    </main>
  );
}
