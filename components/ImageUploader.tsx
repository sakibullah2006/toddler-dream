"use client";

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

type ImageUploaderProps = {
  file: File | null;
  onFileSelected: (file: File) => void;
};

const MAX_SIZE = 4 * 1024 * 1024;

export function ImageUploader({ file, onFileSelected }: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0];
      if (selected) {
        onFileSelected(selected);
      }
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
    if (!fileRejections.length) {
      return null;
    }

    const firstError = fileRejections[0]?.errors[0];
    if (!firstError) {
      return "Could not accept this file. Please try another image.";
    }

    if (firstError.code === "file-too-large") {
      return "Image is too large. Please upload a file under 4MB.";
    }

    if (firstError.code === "file-invalid-type") {
      return "Unsupported format. Please upload JPEG, PNG, or WebP.";
    }

    return firstError.message;
  }, [fileRejections]);

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`rounded-[1.6rem] border-2 border-dashed p-8 text-center transition-all md:p-10 ${
          isDragActive
            ? "border-[#e27396] bg-[#efcfe3]/55"
            : "border-[#ea9ab2] bg-white/90 hover:border-[#e27396] hover:bg-[#efcfe3]/35"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-lg font-semibold text-[#82384f]">Drop baby photo here</p>
        <p className="mt-2 text-sm text-[#9f5d78]">or click to browse</p>
        <p className="mt-4 text-xs text-[#b06f87]">JPEG, PNG, WebP · max 4MB</p>
      </div>

      {file ? (
        <div className="mt-4 rounded-2xl bg-[#eaf2d7] px-4 py-3 text-sm text-[#5f6b4a]">
          Selected: <span className="font-medium">{file.name}</span>
        </div>
      ) : null}

      {rejectionMessage ? (
        <p className="mt-3 text-sm font-medium text-red-600">{rejectionMessage}</p>
      ) : null}
    </div>
  );
}
