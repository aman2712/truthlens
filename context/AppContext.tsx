"use client";

import { toBase64 } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

interface FactCheckResponse {
  claim: string; // The claim that was fact-checked
  language: string; // The detected language of the claim
  is_true: boolean; // Whether the claim is true or not
  fact_check_result: string; // A detailed explanation of the fact-check result
  confidence_score: number; // A confidence score for the fact-checking accuracy (e.g., 92)
  sources: string[]; // List of sources that support the fact-checking result
}

interface AppContextType {
  factCheckResponse: FactCheckResponse | null;
  setFactCheckResponse: React.Dispatch<
    React.SetStateAction<FactCheckResponse | null>
  >;
  makeFactCheckRequest: (args: {
    image: File | null;
    claim: string;
  }) => Promise<boolean>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [factCheckResponse, setFactCheckResponse] =
    useState<FactCheckResponse | null>(null);

  // image is filedata, claim is string
  const makeFactCheckRequest = async ({
    image,
    claim,
  }: {
    image: File | null;
    claim: string;
  }) => {
    let base64Image: string | null = null;

    if (image) {
      base64Image = await toBase64(image);
    }

    const response = await fetch("/api/fact-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        claim,
        image: base64Image, // could be null
        mimetype: image?.type || null,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setFactCheckResponse(JSON.parse(result));
      return true;
    } else {
      console.log(result);
      return false;
    }
  };

  const value: AppContextType = {
    factCheckResponse,
    setFactCheckResponse,
    makeFactCheckRequest,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
