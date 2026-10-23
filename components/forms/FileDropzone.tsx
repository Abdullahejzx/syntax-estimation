"use client";

import { CloudUpload, FileText, X } from "lucide-react";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ACCEPT_ATTRIBUTE, ALLOWED_LABEL, MAX_TOTAL_BYTES, formatBytes, validateFiles } from "@/lib/uploads";

type FileDropzoneProps = {
  files: File[];
  onChange: (files: File[]) => void;
  /** Error from the parent form (e.g. "add plans or a link") */
  error?: string;
  label?: string;
  compact?: boolean;
};

/** Drag-and-drop or browse file picker with a removable file list and a running size total. */
export function FileDropzone({ files, onChange, error, label = "Upload plans / specs", compact }: FileDropzoneProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const total = files.reduce((sum, f) => sum + f.size, 0);
  const shownError = localError ?? error;

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    // Skip duplicates picked twice
    const incoming = Array.from(list).filter((f) => !files.some((x) => x.name === f.name && x.size === f.size));
    const next = [...files, ...incoming];
    const problem = validateFiles(next);
    if (problem) {
      setLocalError(problem);
      return;
    }
    setLocalError(null);
    onChange(next);
  }

  function remove(index: number) {
    setLocalError(null);
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span id={`${id}-label`} className="text-body-sm font-medium text-navy">
        {label} <span className="font-normal text-body">(optional)</span>
      </span>
      {/* The whole drop area opens the file picker, so the tap target is large on phones */}
      <div
        role="button"
        tabIndex={0}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-rules`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-center transition-colors focus-visible:border-blueprint",
          compact ? "px-4 py-4" : "px-6 py-8",
          dragging ? "border-blueprint bg-blue-50" : shownError ? "border-[#b42318] bg-white" : "border-line-strong bg-mist hover:border-blueprint",
        )}
      >
        <CloudUpload aria-hidden="true" className={cn("mb-1.5 text-blueprint", compact ? "size-6" : "size-8")} />
        <p className="text-body-sm font-medium text-navy">
          Drag &amp; drop files here, or{" "}
          <span className="font-semibold text-blueprint underline underline-offset-2">browse</span>
        </p>
        <p id={`${id}-rules`} className="mt-0.5 text-caption text-body">
          {ALLOWED_LABEL} · up to {formatBytes(MAX_TOTAL_BYTES)} total
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT_ATTRIBUTE}
          aria-hidden="true"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-1 space-y-1.5" aria-label="Selected files">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center gap-2 rounded-md border border-line bg-white py-1 pr-1 pl-2.5 text-body-sm"
            >
              <FileText aria-hidden="true" className="size-4 shrink-0 text-blueprint" />
              <span className="min-w-0 flex-1 truncate text-navy">{file.name}</span>
              <span className="shrink-0 text-caption text-body">{formatBytes(file.size)}</span>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Remove ${file.name}`}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-body hover:bg-mist hover:text-navy"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </li>
          ))}
          <li className="text-right text-caption text-body">
            {files.length} file{files.length === 1 ? "" : "s"} · {formatBytes(total)} of {formatBytes(MAX_TOTAL_BYTES)}
          </li>
        </ul>
      )}

      {shownError && (
        <p role="alert" className="text-caption font-medium text-[#b42318]">
          {shownError}
        </p>
      )}
    </div>
  );
}
