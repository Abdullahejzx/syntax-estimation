import { siteConfig } from "@/config/site";

/** Response shape returned by public/api/quote.php. */
export type FormResult = {
  ok: boolean;
  message?: string;
  /** Field name → error message, for server-side validation failures */
  errors?: Record<string, string>;
};

/** Posts a FormData payload (files included) to the shared PHP endpoint. */
export async function submitForm(data: FormData): Promise<FormResult> {
  try {
    const res = await fetch(siteConfig.formEndpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    const body = (await res.json().catch(() => null)) as FormResult | null;
    if (body && typeof body.ok === "boolean") return body;
    return { ok: res.ok, message: res.ok ? undefined : "We couldn't send your request just now. Please try again in a minute." };
  } catch {
    return { ok: false, message: "We couldn't reach the server. Check your connection and try again." };
  }
}

/** Basic checks shared by the client-side validators. */
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isPhone = (v: string) => v.replace(/\D/g, "").length >= 10;
export const isUrl = (v: string) => /^https?:\/\/\S+\.\S+/.test(v.trim());
