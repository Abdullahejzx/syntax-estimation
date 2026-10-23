/**
 * Upload rules shared by every form. public/api/quote.php enforces the same
 * limits on the server, so keep the two in sync.
 */
export const ALLOWED_EXTENSIONS = ["pdf", "dwg", "dxf", "zip", "jpg", "jpeg", "png", "webp", "tif", "tiff"] as const;
export const MAX_TOTAL_BYTES = 100 * 1024 * 1024; // 100 MB across all files
export const MAX_FILES = 20;

export const ACCEPT_ATTRIBUTE = ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(",");
export const ALLOWED_LABEL = "PDF, DWG, DXF, ZIP or images";

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  const mb = bytes / (1024 * 1024);
  return `${Number.isInteger(mb) ? mb : mb.toFixed(1)} MB`;
}

const extensionOf = (name: string) => name.split(".").pop()?.toLowerCase() ?? "";

export function isAllowedFile(file: File) {
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(extensionOf(file.name));
}

/** Returns an error message for the whole selection, or null when it's valid. */
export function validateFiles(files: File[]): string | null {
  const rejected = files.filter((f) => !isAllowedFile(f));
  if (rejected.length) return `${rejected[0].name} isn't a supported file type. Use ${ALLOWED_LABEL}.`;
  if (files.length > MAX_FILES) return `Please upload ${MAX_FILES} files or fewer, or zip them together.`;
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_TOTAL_BYTES) {
    return `Files total ${formatBytes(total)}. The limit is ${formatBytes(MAX_TOTAL_BYTES)}; share a Dropbox or Google Drive link for larger sets.`;
  }
  return null;
}
