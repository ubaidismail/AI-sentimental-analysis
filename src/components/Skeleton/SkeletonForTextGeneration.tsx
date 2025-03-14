import React from "react";

export default function SkeletonForTextGeneration() {
    return (
      <div className="max-w-[300px] w-full flex items-center gap-3 animate-pulse">
        {/* <div className="rounded-full bg-gray-300 w-12 h-12"></div> */}
        <div className="w-full flex flex-col gap-2">
          <div className="h-3 bg-gray-300 rounded-lg w-3/5"></div>
          <div className="h-3 bg-gray-300 rounded-lg w-4/5"></div>
        </div>
      </div>
    );
  }
  