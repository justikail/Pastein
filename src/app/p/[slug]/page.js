"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as Uil from "@iconscout/react-unicons";
import Button from "@/components/button";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useParams } from "next/navigation";
import { mappingType } from "@/components/mappingType";
import { copyToClipboard } from "@/components/copyToClipboard";
import { downloadContent } from "@/components/downloadContent";
import { toast } from "react-toastify";
import NotFound from "@/app/not-found";
import SelectLang from "@/components/selectLang";

export default function Preview() {
  const { slug } = useParams();
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const [isEdit, setIsEdit] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/pastes?p=${slug}`);
        const data = await res.json();
        if (data.error === "Paste not found.") {
          setNotFound(true);
        } else {
          setTitle(data.title);
          setContent(data.content);
          setType(data.type);
        }
      } catch (error) {
        console.error("Unknown error:", error);
      }
    };

    fetchData();
  }, [slug]);

  const updateData = async () => {
    try {
      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, type, situation: "update", endPoint: slug }),
      });

      if (res.ok) {
        toast.success("Success edited.");
        setIsEdit(false);
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

  if (notFound) return <NotFound />;

  return (
    <main className="flex flex-col h-screen">
      <header className="flex justify-between bg-zinc-950 px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="border border-white rounded-md p-2" title="Home">
            <Uil.UilEstate size="15" color="#fff" />
          </Link>
          {isEdit ? (
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Paste" className="text-gray-500 pl-2 py-1 text-sm rounded-md bg-transparent" />
          ) : (
            <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center text-xs">
              <span className="text-slate-500 pl-2 text-sm rounded-md bg-transparent">{title && title.length > 8 ? title.slice(0, 8) : title}</span>
              <strong className="text-xs pl-2 text-slate-200">[{mappingType(type)}]</strong>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {isEdit ? (
            <>
              <SelectLang className="hidden sm:inline-flex rounded-md w-60 px-4 h-full text-zinc-600 text-sm" value={type} onChange={(e) => setType(e.target.value)} />
              <Button title="Save" icon="UilSave" class="border border-white rounded-md px-3 py-2 bg-teal-600 transition-colors hover:bg-teal-700" type="submit" onClick={updateData} />
            </>
          ) : (
            <>
              <Link href={`/api/raw?p=${slug}`} title="View Raw" className="border border-white rounded-md px-3 py-2 hidden sm:inline-flex">
                <Uil.UilFileAlt size="15" color="#fff" />
              </Link>
              <Button title="Copy Raw to clipboard" icon="UilCopy" type="button" onClick={() => copyToClipboard({ slug })} class="border border-white rounded-md px-3 py-2" />
              <Button title="Download" icon="UilFileDownload" type="button" onClick={() => downloadContent({ title, content, type })} class="border border-white rounded-md px-3 py-2 hidden sm:inline-flex" />
              <Button title="Edit" icon="UilFileEditAlt" type="button" onClick={() => setIsEdit(true)} class="border border-white bg-teal-600 transition-colors hover:bg-teal-500 rounded-md px-3 py-2" />
            </>
          )}
        </div>
      </header>

      <div className="flex flex-col h-full max-h-96 sm:max-h-full">
        <MonacoEditor
          height="100%"
          language={type}
          theme="vs-dark"
          value={content}
          onChange={(value) => setContent(value)}
          options={{
            minimap: { enabled: false },
            readOnly: !isEdit,
          }}
        />

        <div className="flex flex-col px-2 pt-4 gap-2 border-t border-[#3e3e42]">
          {isEdit ? (
            <SelectLang className="inline-flex sm:hidden rounded-md px-4 py-2 w-full text-zinc-600 text-sm" value={type} onChange={(e) => setType(e.target.value)} />
          ) : (
            <>
              <Link href={`/api/raw?p=${slug}`} className="border border-white rounded-md p-2.5 justify-center items-center gap-2 text-xs inline-flex sm:hidden" title="Home">
                <Uil.UilEstate size="15" color="#fff" /> View Raw
              </Link>
              <Button
                title="Download"
                icon="UilFileDownload"
                type="button"
                onClick={() => downloadContent({ title, content, type })}
                class="border border-white rounded-md p-2.5 justify-center items-center gap-2 text-xs inline-flex sm:hidden"
                text="Download"
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
