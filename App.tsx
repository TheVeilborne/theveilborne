import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import PillarSection from './sections/PillarSection';
import FeaturedEssays from './sections/FeaturedEssays';
import NewsletterSection from './sections/NewsletterSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const pillarData = [
  {
    id: 'deen',
    label: 'DEEN & REFLECTION',
    headline: 'Return to the Book.',
    body: 'A quiet corner for tafsir notes, daily adhkar, and small rituals that keep the heart soft.',
    cta: 'Explore tafsir notes',
    secondaryCta: 'See reflections',
    quote: "'The best of you are those who learn the Qur'an and teach it.' — Hadith",
    image: '/deen_image.jpg',
  },
  {
    id: 'health',
    label: 'HEALTH & KNOWLEDGE',
    headline: 'Strengthen the vessel.',
    body: 'Gentle movement, nourishing food, sleep as worship, and learning that protects the heart.',
    cta: 'Read the wellness essays',
    secondaryCta: 'Browse habits',
    quote: "'Ask Allah for beneficial knowledge, and seek refuge from knowledge that does not benefit.' — Hadith",
    image: '/health_image.jpg',
  },
  {
    id: 'growth',
    label: 'GROWTH & BUSINESS',
    headline: 'Build with ihsan.',
    body: 'Freelancing, product-building, and time management—designed around salah and sanity.',
    cta: 'See the business notes',
    secondaryCta: 'Download the toolkit',
    quote: "'Allah loves that when one does a thing, it is done with excellence.' — Hadith",
    image: '/business_image.jpg',
  },
  {
    id: 'lifestyle',
    label: 'LIFESTYLE',
    headline: 'Live beautifully.',
    body: 'Modest style, home rituals, slow mornings, and the small details that make a day feel like worship.',
    cta: 'Browse lifestyle',
    secondaryCta: 'See the lookbook',
    quote: "'And He has made everything beautiful in its time.' — Qur'an 3:11",
    image: '/lifestyle_image.jpg',
  },
];

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out",
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-paper">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Content Pillars */}
      {pillarData.map((pillar, index) => (
        <PillarSection
          key={pillar.id}
          {...pillar}
          index={index + 2}
        />
      ))}
      
      {/* Featured Essays */}
      <FeaturedEssays />
      
      {/* Newsletter + Shop */}
      <NewsletterSection />
      
      {/* Contact + Footer */}
      <ContactSection />
    </div>
  );
}

export default App;
