import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const essayList = [
  'On waking up for Fajr without burnout',
  'A simple wardrobe system',
  'How I plan the week around salah',
  'Tafsir notes: Surah Al-Asr',
  'Freelancing with boundaries',
  'The 20-minute evening reset',
  'What barakah looks like in a workday',
];

const featuredEssays = [
  {
    title: 'The Fajr Routine That Actually Sticks',
    category: 'Deen & Reflection',
    description: 'A gentle approach to building a morning practice that honors your energy and your faith.',
    readTime: '5 min read',
    image: '/essay1.jpg',
  },
  {
    title: 'A Capsule Wardrobe for Busy Days',
    category: 'Lifestyle',
    description: 'How 15 pieces can create 30+ outfits—and free up mental space for what matters.',
    readTime: '7 min read',
    image: '/essay2.jpg',
  },
];

export default function FeaturedEssays() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const indexCardRef = useRef<HTMLDivElement>(null);
  const essayCardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Index card animation
      gsap.fromTo(
        indexCardRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: indexCardRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      // Essay cards animation
      const essayCards = essayCardsRef.current?.querySelectorAll('.essay-card');
      if (essayCards) {
        essayCards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: '10vh', scale: 0.98, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
                scrub: true,
              },
              delay: index * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="essays"
      className="relative bg-paper py-24 min-h-screen"
      style={{ zIndex: 60 }}
    >
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Header */}
          <div ref={headerRef}>
            <h2 className="font-serif text-heading text-charcoal mb-6">
              Featured Essays
            </h2>
            <p className="font-sans text-base text-warm-gray max-w-md leading-relaxed">
              A collection of notes on deen, discipline, and design—written while building a life that feels like home.
            </p>
          </div>

          {/* Right Column - Index Card */}
          <div
            ref={indexCardRef}
            className="accent-card p-8 lg:p-10"
          >
            <h3 className="font-serif text-xl text-charcoal mb-6">
              Browse by topic
            </h3>
            <ul className="space-y-3">
              {essayList.map((essay, index) => (
                <li key={index}>
                  <button className="group flex items-center w-full text-left">
                    <span className="font-sans text-sm text-charcoal/80 group-hover:text-charcoal transition-colors">
                      {essay}
                    </span>
                    <ArrowRight className="ml-auto w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Featured Essay Cards */}
        <div
          ref={essayCardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16"
        >
          {featuredEssays.map((essay, index) => (
            <article
              key={index}
              className="essay-card group cursor-pointer"
            >
              <div className="image-card h-[280px] lg:h-[320px] mb-6 overflow-hidden card-shadow">
                <img
                  src={essay.image}
                  alt={essay.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-lilac">
                  <Tag className="w-3 h-3" />
                  {essay.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-warm-gray">
                  <Clock className="w-3 h-3" />
                  {essay.readTime}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2 group-hover:text-lilac transition-colors">
                {essay.title}
              </h3>
              <p className="font-sans text-sm text-warm-gray leading-relaxed">
                {essay.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
