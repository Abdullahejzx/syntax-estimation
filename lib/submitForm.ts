import { siteConfig } from "@/config/site";

/** Response shape returned by public/api/quote.php. */
export type FormResult = {
  ok: boolean;
  message?: string;
  /** Reference number for the request, shown on the success screen */
  reference?: string;
  /** Field name → error message, for server-side validation failures */
  errors?: Record<string, string>;
};

const NETWORK_ERROR = "We couldn't reach the server. Check your connection and try again.";
const SERVER_ERROR = "We couldn't send your request just now. Please try again in a minute.";

function parse(status: number, text: string): FormResult {
  try {
    const body = JSON.parse(text) as FormResult;
    if (typeof body.ok === "boolean") return body;
  } catch {
    // Not JSON (e.g. a host error page)
  }
  if (status === 413) return { ok: false, message: "Those files are too large to upload. Please share a Dropbox or Google Drive link instead." };
  return { ok: status >= 200 && status < 300, message: status >= 200 && status < 300 ? undefined : SERVER_ERROR };
}

/**
 * Posts a FormData payload (files included) to the shared PHP endpoint.
 * Pass `onProgress` to get upload progress (0–1); that path uses XMLHttpRequest,
 * since fetch can't report upload progress.
 */
export function submitForm(data: FormData, onProgress?: (fraction: number) => void): Promise<FormResult> {
  // Send how long the form was open (not the raw start time), so the server's bot
  // check isn't thrown off by a visitor's clock being set wrong.
  const started = Number(data.get("ts"));
  if (started > 0) data.set("elapsed", String(Date.now() - started));
  data.delete("ts");

  if (!onProgress) {
    return fetch(siteConfig.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(async (res) => parse(res.status, await res.text()))
      .catch(() => ({ ok: false, message: NETWORK_ERROR }));
  }

  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", siteConfig.formEndpoint);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => resolve(parse(xhr.status, xhr.responseText));
    xhr.onerror = () => resolve({ ok: false, message: NETWORK_ERROR });
    xhr.ontimeout = () => resolve({ ok: false, message: "The upload timed out. Try a smaller set of files or share a link instead." });
    xhr.timeout = 10 * 60 * 1000;
    xhr.send(data);
  });
}

/** Basic checks shared by the client-side validators. */
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isPhone = (v: string) => v.replace(/\D/g, "").length >= 10;
export const isUrl = (v: string) => /^https?:\/\/\S+\.\S+/.test(v.trim());
