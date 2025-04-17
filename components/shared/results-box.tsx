"use client";

import { cn } from "@/lib/utils";
import { Check, ExternalLink, X } from "lucide-react";

import { useAppContext } from "@/context/AppContext";

export default function ResultsBox() {
  const { factCheckResponse } = useAppContext();

  console.log(factCheckResponse);

  return (
    <div className="mt-10 max-w-sm md:max-w-2xl w-full rounded-xl shadow-md overflow-hidden border border-gray-700 bg-gradient-to-br from-zinc-900 to-zinc-950">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 px-6 py-5">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium text-indigo-400 uppercase tracking-wide">
            Fact Check
          </h3>
          <StatusBadge status={factCheckResponse?.is_true} />
        </div>
        <div className="mt-3">
          <blockquote className="text-md md:text-lg font-medium text-gray-200 italic relative pl-3 border-l-4 border-indigo-700">
            {factCheckResponse?.claim}
          </blockquote>
        </div>
      </div>

      {/* Content */}
      <div className="bg-zinc-900 px-6 py-5">
        {/* Confidence Score */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-medium text-gray-300">
              Confidence Score
            </h4>
            <span className="text-sm font-semibold text-gray-200">
              {factCheckResponse?.confidence_score}%
            </span>
          </div>
          <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full",
                factCheckResponse?.is_true ? "bg-green-500" : "bg-red-500"
              )}
              style={{ width: `${factCheckResponse?.confidence_score}%` }}
            ></div>
          </div>
        </div>

        {/* Explanation */}
        <div className="mb-5">
          <h4 className="text-sm font-medium text-gray-300 mb-1.5">
            Why {factCheckResponse?.is_true ? "True" : "False"}?
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {factCheckResponse?.fact_check_result}
          </p>
        </div>

        {/* Sources */}
        {/* @ts-expect-error the sources array will always be defined if factCheckResponse is defined */}
        {factCheckResponse?.sources.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-1.5">
              Sources
            </h4>
            <ul className="space-y-1.5">
              {factCheckResponse?.sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-indigo-400 hover:text-indigo-300 flex items-center group transition-colors"
                  >
                    <span className="group-hover:underline">
                      {source.length > 75
                        ? `${source.slice(0, 75)}...`
                        : source}
                    </span>
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5 inline opacity-70" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const StatusBadge = ({ status }: { status: boolean | undefined }) => {
  if (status) {
    return (
      <div className="flex items-center px-3 py-1 rounded-full bg-green-800 text-green-200">
        <Check className="h-4 w-4 mr-1.5" />
        <span className="text-sm font-medium">True</span>
      </div>
    );
  }

  return (
    <div className="flex items-center px-3 py-1 rounded-full bg-red-800 text-red-200">
      <X className="h-4 w-4 mr-1.5" />
      <span className="text-sm font-medium">False</span>
    </div>
  );
};

/*
{
  "claim": "The sun is a star.",
  "language": "en",
  "is_true": true,
  "fact_check_result": "The sun is indeed a star. It is a hot ball of glowing gases at the center of our solar system.",
  "confidence_score": 100,
  "sources": [
    "https://www.nasa.gov/mission_pages/sunearth/science/ সূর্যের-role.html",
    "https://www.space.com/17176-how-big-is-the-sun-size.html"
  ]
}
*/
