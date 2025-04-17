"use client";

import ResultsBox from "@/components/shared/results-box";
import UploadBox from "@/components/shared/upload-box";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { factCheckResponse, setFactCheckResponse } = useAppContext();
  return (
    <div className="md:h-screen flex items-center md:justify-center justify-start flex-col">
      <h1 className="text-4xl md:text-6xl font-semibold text-center mt-36 md:mt-6 max-w-2xl">
        Fact-check any claim, from images or text
      </h1>
      <p className="text-center text-white/50 mt-4 max-w-sm md:max-w-md mx-auto">
        Upload a screenshot or type a headline. Our AI will analyze and verify
        it in seconds.
      </p>
      {factCheckResponse && (
        <Button
          className="mt-8 cursor-pointer"
          onClick={() => setFactCheckResponse(null)}
        >
          Run a New Check
        </Button>
      )}
      <div>{factCheckResponse ? <ResultsBox /> : <UploadBox />}</div>
    </div>
  );
}
