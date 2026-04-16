import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteMark1Ref = useRef<HTMLSpanElement>(null);
  const quoteMark2Ref = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: '-12vw', scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9 },
        0
      );

      // Meta label
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );

      // Headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 },
          0.3
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.5
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        0.6
      );

      // Quote
      tl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      );

      // Quote marks
      tl.fromTo(
        [quoteMark1Ref.current, quoteMark2Ref.current],
        { opacity: 0, scale: 0.9 },
        { opacity: 0.18, scale: 1, duration: 1, ease: 'power1.out' },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([imageRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current, quoteRef.current, metaRef.current], {
              opacity: 1, x: 0, y: 0, scale: 1
            });
            gsap.set([quoteMark1Ref.current, quoteMark2Ref.current], { opacity: 0.18, scale: 1 });
          }
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: '-18vw', y: '10vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [headlineRef.current, subheadlineRef.current, metaRef.current],
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        quoteRef.current,
        { x: 0, opacity: 1 },
        { x: '8vw', opacity: 0, ease: 'power2.in' },
        0.72
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

  const scrollToContent = () => {
    const nextSection = document.getElementById('deen');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-paper z-10 flex items-center"
    >
      {/* Quote mark top-left */}
      <span
        ref={quoteMark1Ref}
        className="quote-mark absolute left-[44vw] top-[18vh]"
        aria-hidden="true"
      >
        "
      </span>

      {/* Quote mark bottom-right */}
      <span
        ref={quoteMark2Ref}
        className="quote-mark absolute right-[4vw] top-[68vh]"
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
            src="/hero_portrait.jpg"
            alt="Peaceful moment with tea"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Block */}
        <div className="absolute left-[46vw] top-[18vh] w-[48vw]">
          {/* Meta Label */}
          <p
            ref={metaRef}
            className="label-uppercase text-warm-gray mb-6"
          >
            TheVeilborne — A BLOG ON INTENTIONAL LIVING
          </p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-display text-charcoal mb-8"
          >
            <span className="word inline-block">Build</span>{' '}
            <span className="word inline-block">with</span>{' '}
            <span className="word inline-block text-lilac">barakah.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="font-sans text-lg text-warm-gray max-w-[40vw] mb-10 leading-relaxed"
          >
            Systems for your deen, health, work, and home—rooted in purpose.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <button className="btn-primary group">
              Read the latest essay
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="btn-secondary">Browse topics</button>
          </div>

          {/* Quote */}
          <div ref={quoteRef} className="max-w-[32vw]">
            <p className="font-serif text-xl italic text-charcoal/80 leading-relaxed">
              "And whoever relies upon Allah—He will be enough."
            </p>
            <p className="font-sans text-sm text-warm-gray mt-2">
              — Qur'an 65:3
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-warm-gray hover:text-charcoal transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
