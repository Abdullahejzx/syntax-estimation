import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/content/proof";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SwipeItem, SwipeRow } from "@/components/ui/SwipeRow";

type TestimonialsProps = {
  items: Testimonial[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: "white" | "mist";
};

/** Review cards: a swipeable carousel on phones, a 3-column grid from 768px. */
export function Testimonials({
  items,
  eyebrow = "Client feedback",
  title = "Trusted by General & Trade Contractors",
  intro = "How construction teams use Arvex Designs to bid more work with the people they already have.",
  tone = "white",
}: TestimonialsProps) {
  return (
    <Section tone={tone} labelledBy="testimonials-title">
      <Container>
        <SectionHeading id="testimonials-title" eyebrow={eyebrow} title={title} intro={intro} />
        <SwipeRow gridClassName="md:grid-cols-3 md:gap-6 lg:gap-8" label="Client testimonials, swipe for more">
          {items.map((t) => (
            <SwipeItem key={t.name}>
              <figure className="flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card sm:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-0.5 text-accent" role="img" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} aria-hidden="true" className="size-[18px] fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <Quote aria-hidden="true" className="size-6 text-blue-100" />
                </div>
                <blockquote className="mb-6 text-body-md text-ink italic">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto border-t border-line pt-4">
                  <span className="block font-display text-[0.9375rem] font-bold text-navy">{t.name}</span>
                  <span className="text-caption text-body">
                    {t.role} · {t.location}
                  </span>
                </figcaption>
              </figure>
            </SwipeItem>
          ))}
        </SwipeRow>
      </Container>
    </Section>
  );
}
