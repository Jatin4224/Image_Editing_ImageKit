"use client";
import React from "react";
import Image from "next/image";
import FileUpload from "./file-uploader";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const ImageDisplay = () => {
  return (
    <div className="flex justify-start p-6 bg-black">
      <div className="w-full h-64 space-y-6">
        {/* Upload box */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <FileUpload />
        </div>

        {/* Image box */}
        <div className="bg-black p-4 w-full  rounded-lg shadow-md">
          <h2 className="text-lg text-orange-500 font-semibold mb-2 text-center">
            Original Image
          </h2>
          <div className="h-40 w-full rounded-md overflow-hidden">
            {" "}
            {/* render image */}
            <Image
              src={`${urlEndpoint}/default-image.jpg?tr=w-800,h-100`}
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
