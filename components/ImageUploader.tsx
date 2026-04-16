"use client";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

type ImageUploaderProps = {
  file: File | null;
  previewUrl?: string;
  onFileSelected: (file: File) => void;
};

const MAX_SIZE = 4 * 1024 * 1024;

export function ImageUploader({ file, previewUrl, onFileSelected }: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0];
      if (selected) onFileSelected(selected);
    },
    [onFileSelected],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: MAX_SIZE,
    multiple: false,
  });

  const rejectionMessage = useMemo(() => {
    const firstError = fileRejections[0]?.errors[0];
    if (!firstError) return null;
    if (firstError.code === "file-too-large") return "File too large — max 4MB.";
    if (firstError.code === "file-invalid-type") return "Unsupported format — use JPEG, PNG, or WebP.";
    return firstError.message;
  }, [fileRejections]);

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed text-center transition-all ${
          isDragActive
            ? "border-[#f87c3c] bg-[#fff4ed]"
            : "border-[#fde0cc] bg-[#fef7f2] hover:border-[#fcb896] hover:bg-[#fff4ed]"
        }`}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <div className="space-y-2 p-2">
            <div
              className="relative mx-auto w-full overflow-hidden rounded-lg"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={previewUrl}
                alt="Uploaded photo"
                fill
                unoptimized
                sizes="(max-width: 640px) 90vw, 480px"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-[#b07a5a]">Click or drop to replace</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fde8d4] text-2xl">
              📷
            </div>
            <p className="text-sm font-medium text-[#3d1f0a]">Drop a photo here</p>
            <p className="mt-1 text-xs text-[#b07a5a]">or click to browse</p>
            <p className="mt-3 text-xs text-[#c4a090]">JPEG · PNG · WebP · max 4 MB</p>
          </div>
        )}
      </div>

      {file && !previewUrl && (
        <p className="mt-2 text-xs text-[#b07a5a]">
          Selected: <span className="font-medium text-[#8a4a20]">{file.name}</span>
        </p>
      )}

      {rejectionMessage && (
        <p className="mt-2 text-xs font-medium text-red-600">{rejectionMessage}</p>
      )}
    </div>
  );
}
