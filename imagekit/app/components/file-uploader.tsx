"use client";
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/next";
import { useState } from "react";
import { buildSrc } from "@imagekit/next";

export default function FileUpload() {
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [bgRemovedUrl, setBgRemovedUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(0);
    setUploadedUrl(null);
    setBgRemovedUrl(null);

    try {
      const resp = await fetch("/api/auth");
      const { token, expire, signature, publicKey } = await resp.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey,
        signature,
        expire,
        token,
        onProgress: (evt) =>
          setProgress(Math.round((evt.loaded / evt.total) * 100)),
      });

      setUploadedUrl(res.url);
      console.log("Upload successful:", res);
    } catch (err: any) {
      if (err instanceof ImageKitAbortError) {
        setError("Upload aborted by user.");
      } else if (err instanceof ImageKitInvalidRequestError) {
        setError("Invalid request.");
      } else if (err instanceof ImageKitUploadNetworkError) {
        setError("Network error during upload.");
      } else if (err instanceof ImageKitServerError) {
        setError("Server error on ImageKit.");
      } else {
        setError("Unknown error occurred.");
        console.error(err);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveBackground = () => {
    if (!uploadedUrl) return;

    const transformedUrl = buildSrc({
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      src: uploadedUrl,
      transformation: [{ aiRemoveBackground: true }],
    });

    setBgRemovedUrl(transformedUrl);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Left: Upload Controls */}
      <div className="md:w-1/3 bg-orange-200 p-6 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Upload & Actions</h2>

        <input
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full h-10 text-sm text-gray-700  border-orange-300 rounded-lg cursor-pointer border-4 bg-gray-50 focus:outline-none"
        />

        {uploading && (
          <p className="text-sm text-gray-600">Uploading: {progress}%</p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {uploadedUrl && (
          <button
            onClick={handleRemoveBackground}
            className="px-4 py-2 bg-orange-600 text-white font-semibold text-sm rounded-lg hover:bg-orange-400 transition"
          >
            Remove Background
          </button>
        )}
      </div>

      {/* Right: Image Preview */}
      <div className="flex-1 flex flex- gap-6">
        {uploadedUrl && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-md font-medium mb-2">Original Image</h3>
            <div className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={uploadedUrl}
                alt="Uploaded"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}

        {bgRemovedUrl && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-md font-medium mb-2">Background Removed</h3>
            <div className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={bgRemovedUrl}
                alt="Background Removed"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
