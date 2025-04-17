"use client";

import { CloudUpload, LoaderIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAppContext } from "@/context/AppContext";

export default function UploadBox() {
  const [claim, setClaim] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const { makeFactCheckRequest } = useAppContext();

  const handleUpload = () => {
    if (imageRef.current && imageRef.current.files) {
      const file = imageRef.current.files[0];
      if (file) {
        setImage(file);
      }
    }
  };

  const handleClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const makeRequests = async () => {
    if (!image && !claim) return;

    setLoading(true);

    const resp = await makeFactCheckRequest({ image, claim });

    if (resp === false) {
      alert("Failed to make request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="mt-10 flex flex-col gap-4 items-center">
      <div>
        <Input
          placeholder="Paste a news claim, quote, or headline..."
          className="w-[20rem] md:w-[30rem]"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center gap-4 max-w-sm w-full">
        <div className="border-t border-gray-700 flex-1"></div>
        <span className="text-gray-500">or</span>
        <div className="border-t border-gray-700 flex-1"></div>
      </div>
      {/* allow only image file types */}
      <input
        type="file"
        ref={imageRef}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
      />
      <div
        className="bg-zinc-900 w-sm md:w-xl h-56 md:h-80 rounded-lg flex items-center justify-center"
        onClick={handleClick}
      >
        <div className="w-[90%] h-[85%] border-4 border-gray-700 border-dotted rounded-lg flex items-center justify-center text-center flex-col hover:bg-zinc-950 transition duration-300 cursor-pointer group relative">
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <CloudUpload
                size={45}
                className="text-gray-500 group-hover:scale-125 transition duration-300"
              />
              <p className="max-w-42 text-sm mt-4 text-gray-500">
                Click to Upload
              </p>
            </>
          )}
        </div>
      </div>
      <Button
        className="cursor-pointer"
        disabled={(claim.length === 0 && !image) || loading}
        onClick={makeRequests}
      >
        {loading && <LoaderIcon className="animate-spin" />}
        Let&apos;s Investigate
      </Button>
    </div>
  );
}
