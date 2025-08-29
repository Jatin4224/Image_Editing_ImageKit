"use client";
import React from "react";
import Image from "next/image";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const ImageDisplay = () => {
  return (
    <div className="flex justify-start p-6">
      <div className="w-64 space-y-6">
        {/* Upload box */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-lg font-semibold">Input Upload</h1>
        </div>

        {/* Image box */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Original Image</h2>
          <div className="aspect-square bg-gray-200 rounded-md overflow-hidden">
            {" "}
            {/* render image */}
            <Image
              src={`${urlEndpoint}/default-image.jpg?tr=w-300,h-300`}
              width={300}
              height={300}
              alt="test"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
