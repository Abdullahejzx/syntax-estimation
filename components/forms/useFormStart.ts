"use client";

import { useEffect, useState } from "react";

/**
 * Timestamp (ms) of when the form was rendered in the browser. Sent as a hidden "ts"
 * field so the PHP endpoint can reject bots that submit within a couple of seconds.
 */
export function useFormStart() {
  const [start, setStart] = useState("");
  useEffect(() => setStart(String(Date.now())), []);
  return start;
}
