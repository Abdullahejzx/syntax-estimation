import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * Two separate SMS consent checkboxes (transactional and marketing), both unchecked
 * by default, as carriers require for A2P 10DLC messaging.
 * TODO: have the final wording reviewed against your SMS provider's requirements.
 */
export function SmsConsent({ idPrefix = "sms" }: { idPrefix?: string }) {
  const box =
    "mt-0.5 size-[18px] shrink-0 cursor-pointer rounded border-line-strong accent-[var(--color-navy)]";
  return (
    <fieldset className="space-y-2 rounded-lg border border-line bg-mist p-3">
      <legend className="sr-only">Text message consent (optional)</legend>
      <label htmlFor={`${idPrefix}-transactional`} className="flex cursor-pointer items-start gap-2.5 text-caption leading-[1.45] text-ink">
        <input id={`${idPrefix}-transactional`} type="checkbox" name="smsTransactional" value="yes" className={box} />
        <span>
          Text me about this quote request and my project (scheduling, delivery and account updates) from{" "}
          {siteConfig.name}. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP
          for help.
        </span>
      </label>
      <label htmlFor={`${idPrefix}-marketing`} className="flex cursor-pointer items-start gap-2.5 text-caption leading-[1.45] text-ink">
        <input id={`${idPrefix}-marketing`} type="checkbox" name="smsMarketing" value="yes" className={box} />
        <span>
          Send me occasional marketing texts (estimating tips and offers) from {siteConfig.name}. Consent is not a
          condition of purchase. Msg &amp; data rates may apply. Reply STOP to opt out.
        </span>
      </label>
      <p className="pl-[28px] text-caption text-body">
        See our{" "}
        <Link href="/privacy-policy/" className="font-medium text-blueprint underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/sms-terms/" className="font-medium text-blueprint underline underline-offset-2">
          SMS Terms
        </Link>
        .
      </p>
    </fieldset>
  );
}
