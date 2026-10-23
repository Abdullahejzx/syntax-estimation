import { CircleCheck, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/content/proof";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";

type AdvantageSplitProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  points: { title: string; text: string }[];
  testimonial: Testimonial;
  tone?: "white" | "mist";
};

/** Benefits list on the left, a single client quote on the right. */
export function AdvantageSplit({ eyebrow = "Why Syntax", title, intro, points, testimonial, tone = "mist" }: AdvantageSplitProps) {
  return (
    <Section tone={tone} labelledBy="advantage-title">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow variant="chip" className="mb-3">
              {eyebrow}
            </Eyebrow>
            <h2 id="advantage-title" className="text-headline-xl-mobile font-bold lg:text-headline-xl">
              {title}
            </h2>
            {intro && <p className="mt-4 sm:text-body-lg">{intro}</p>}
            <ul className="mt-8 space-y-5">
              {points.map((point) => (
                <li key={point.title} className="flex gap-3">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-ink" />
                  <p className="text-body-md">
                    <strong className="font-semibold text-navy">{point.title}:</strong> {point.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* TODO: placeholder testimonial (see content/proof.ts) */}
          <Reveal className="lg:col-span-5">
            <figure className="relative rounded-xl border border-line bg-white p-6 shadow-lift sm:p-8">
              <Quote aria-hidden="true" className="absolute top-6 right-6 size-10 text-blue-100" />
              <div className="mb-4 flex gap-0.5 text-accent" role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} aria-hidden="true" className="size-5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="text-body-md text-ink italic sm:text-body-lg">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <span className="block font-display font-bold text-navy">{testimonial.name}</span>
                <span className="block text-caption text-body">
                  {testimonial.role} · {testimonial.location}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
