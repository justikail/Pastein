"use client";

import * as Uil from "@iconscout/react-unicons";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/button";
import { toast } from "react-toastify";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import SelectLang from "@/components/selectLang";
import TimerModal from "@/components/timerModal";

export default function Home() {
  const [content, setContent] = useState("");
  const [lang, setLang] = useState("text");
  const [title, setTitle] = useState("Untitled");
  const [expiredIn, setExpiredIn] = useState([0, null]);
  const [spawnModal1, setSpawnModal1] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, content: content, type: lang, situation: "insert", endPoint: null, expiredIn: expiredIn[0] }),
      });

      if (res.ok) {
        const newPaste = await res.json();
        window.location.href = `/p/${newPaste.endPoint}`;
      } else {
        const errorMessage = await res.json();
        if (errorMessage.error === "Title is missing") {
          toast.warn("Title harus diisi!.");
        } else if (errorMessage.error === "Content is missing") {
          toast.warn("Konten harus diisi!.");
        } else if (errorMessage.error === "Type is missing") {
          toast.warn("Type harus diisi!.");
        } else if (errorMessage.error === "Invalid type") {
          toast.warn("Type tidak diperbolehkan!.");
        } else {
          console.error(errorMessage);
          toast.error("Something wrong:" + errorMessage);
        }
      }
    } catch (error) {
      console.error("Unknown error:", error);
    }
  };

  const handleTimer = (value) => {
    setExpiredIn(value);
    setSpawnModal1(false);
  };

  return (
    <main className="flex flex-col h-screen">
      <header className="flex justify-between bg-zinc-950 px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="border border-white rounded-md p-2" title="Home">
            <Uil.UilEstate size="15" color="#fff" />
          </Link>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Paste" className="text-gray-500 pl-2 py-1 text-sm rounded-md bg-transparent" />
        </div>

        <div className="flex gap-2 items-center">
          <Button title="Timer" icon="UilStopwatch" type="button" onClick={() => setSpawnModal1(true)} class="justify-center items-center text-[10px] border border-white rounded-md px-3 py-2 hidden sm:inline-flex" text={expiredIn[1]} />
          <SelectLang className="hidden sm:inline-flex rounded-md w-60 px-4 h-full text-zinc-600 text-sm" value={lang} onChange={(e) => setLang(e.target.value)} />
          <Button title="Save" icon="UilSave" class="border border-white rounded-md px-3 py-2 bg-teal-600 transition-colors hover:bg-teal-500" type="submit" onClick={handleSubmit} />
        </div>
      </header>

      <div className="flex flex-col h-full max-h-96 sm:max-h-full">
        <MonacoEditor
          height="100%"
          language={lang}
          theme="vs-dark"
          value={content}
          onChange={(value) => setContent(value)}
          options={{
            minimap: { enabled: false },
          }}
        />

        <div className="flex flex-col px-2 pt-4 gap-2 border-t border-[#3e3e42]">
          <Button
            title="Timer"
            icon="UilStopwatch"
            type="button"
            onClick={() => setSpawnModal1(true)}
            class="border border-white rounded-md p-2.5 justify-center items-center gap-2 text-xs inline-flex sm:hidden"
            text={`Expiration ${expiredIn[1] == null ? "" : "[" + expiredIn[1] + "]"}`}
          />
          <SelectLang className="inline-flex sm:hidden rounded-md px-4 py-2 w-full text-zinc-600 text-sm" value={lang} onChange={(e) => setLang(e.target.value)} />
        </div>
      </div>

      <TimerModal isOpen={spawnModal1} onRequestClose={() => setSpawnModal1(false)} onSelect={handleTimer} />
    </main>
  );
}
