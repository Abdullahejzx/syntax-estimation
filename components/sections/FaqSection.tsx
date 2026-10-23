import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqSectionProps = {
  items: AccordionItem[];
  eyebrow?: string;
  title?: string;
  tone?: "white" | "mist";
  id?: string;
};

/** FAQ accordion plus matching FAQPage structured data. */
export function FaqSection({
  items,
  eyebrow = "Common questions",
  title = "Frequently Asked Questions",
  tone = "mist",
  id = "faq",
}: FaqSectionProps) {
  return (
    <Section id={id} tone={tone} labelledBy={`${id}-title`}>
      <JsonLd data={faqSchema(items)} />
      <Container size="narrow">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} />
        <Accordion items={items} />
      </Container>
    </Section>
  );
}
