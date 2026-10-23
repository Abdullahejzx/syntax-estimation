import { privacyPolicy as doc } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: doc.title, description: doc.description, path: doc.path });

export default function PrivacyPolicyPage() {
  return <LegalPage doc={doc} />;
}
