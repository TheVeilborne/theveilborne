import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PillarSectionProps {
  id: string;
  label: string;
  headline: string;
  body: string;
  cta: string;
  secondaryCta: string;
  quote: string;
  image: string;
  index: number;
}

export default function PillarSection({
  id,
  label,
  headline,
  body,
  cta,
  secondaryCta,
  quote,
  image,
  index,
}: PillarSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteMark1Ref = useRef<HTMLSpanElement>(null);
  const quoteMark2Ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        imageRef.current,
        { x: '-55vw', scale: 0.92, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, bodyRef.current],
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        quoteRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        [quoteMark1Ref.current, quoteMark2Ref.current],
        { opacity: 0, scale: 0.9 },
        { opacity: 0.18, scale: 1, ease: 'none' },
        0.05
      );

      // SETTLE (30% - 70%) - elements hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: '-18vw', y: '10vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, bodyRef.current],
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        quoteRef.current,
        { y: 0, opacity: 1 },
        { y: '4vh', opacity: 0, ease: 'power2.in' },
        0.73
      );

      scrollTl.fromTo(
        [quoteMark1Ref.current, quoteMark2Ref.current],
        { opacity: 0.18 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned bg-paper flex items-center"
      style={{ zIndex: index * 10 }}
    >
      {/* Quote marks */}
      <span
        ref={quoteMark1Ref}
        className="quote-mark absolute left-[44vw] top-[16vh]"
        aria-hidden="true"
      >
        "
      </span>
      <span
        ref={quoteMark2Ref}
        className="quote-mark absolute right-[4vw] top-[66vh]"
        aria-hidden="true"
      >
        "
      </span>

      <div className="w-full h-full flex items-center px-6 lg:px-0">
        {/* Image Card */}
        <div
          ref={imageRef}
          className="image-card absolute left-[6vw] top-[18vh] w-[34vw] h-[64vh] card-shadow"
        >
          <img
            src={image}
            alt={headline}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Block */}
        <div className="absolute left-[46vw] top-[16vh] w-[48vw]">
          {/* Label */}
          <p
            ref={labelRef}
            className="label-uppercase text-lilac mb-4"
          >
            {label}
          </p>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-serif text-heading text-charcoal mb-8"
          >
            {headline}
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="font-sans text-base text-warm-gray max-w-[40vw] mb-10 leading-relaxed"
          >
            {body}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="btn-primary group">
              {cta}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="btn-secondary">{secondaryCta}</button>
          </div>

          {/* Quote */}
          <div ref={quoteRef} className="max-w-[30vw]">
            <p className="font-serif text-lg italic text-charcoal/70 leading-relaxed">
              {quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
