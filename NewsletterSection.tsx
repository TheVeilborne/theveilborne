import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download, ShoppingBag, Heart } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const bottomCardsRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Newsletter card animation
      gsap.fromTo(
        newsletterRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Shop preview animation
      gsap.fromTo(
        shopRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: shopRef.current,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Bottom cards animation
      const bottomCards = bottomCardsRef.current?.querySelectorAll('.bottom-card');
      if (bottomCards) {
        bottomCards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: '8vh', opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 65%',
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Welcome to the Sunday Letter!', {
        description: 'You\'ll receive your first email this Sunday.',
      });
      setEmail('');
    }
  };

  const handleDownload = () => {
    toast.success('Download started!', {
      description: 'Your Morning Reset Checklist is on its way.',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative bg-paper py-24"
      style={{ zIndex: 70 }}
    >
      <div className="w-full px-6 lg:px-[6vw]">
        {/* Top Row - Newsletter + Shop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Newsletter Card */}
          <div
            ref={newsletterRef}
            className="accent-card p-8 lg:p-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-charcoal/60" />
              <span className="label-uppercase text-charcoal/60">Subscribe</span>
            </div>
            <h3 className="font-serif text-3xl text-charcoal mb-4">
              The Sunday Letter
            </h3>
            <p className="font-sans text-base text-charcoal/80 mb-8 leading-relaxed">
              One email a week: a reflection, a system, and a small du'a.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-5 py-3 rounded-full bg-white/80 border-0 text-charcoal placeholder:text-warm-gray focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                required
              />
              <button type="submit" className="btn-primary bg-charcoal text-paper hover:bg-charcoal/90">
                Join
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </form>
            <p className="font-sans text-xs text-charcoal/50 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Shop Preview Card */}
          <div
            ref={shopRef}
            className="image-card overflow-hidden card-shadow"
          >
            <div className="relative h-full min-h-[400px]">
              <img
                src="/shop_preview.jpg"
                alt="Templates and tools"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="w-5 h-5 text-paper/80" />
                  <span className="label-uppercase text-paper/80">Shop</span>
                </div>
                <h3 className="font-serif text-3xl text-paper mb-3">
                  Templates & Tools
                </h3>
                <p className="font-sans text-sm text-paper/80 mb-6 max-w-sm">
                  Planner layouts, Notion systems, and checklists—designed for Muslim women who build.
                </p>
                <button className="btn-primary bg-paper text-charcoal hover:bg-paper/90">
                  Browse the shop
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Small Cards */}
        <div
          ref={bottomCardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Free Resource Card */}
          <div className="bottom-card dark-card p-8">
            <div className="flex items-center gap-2 mb-4">
              <Download className="w-5 h-5 text-paper/60" />
              <span className="label-uppercase text-paper/60">Free</span>
            </div>
            <h4 className="font-serif text-xl text-paper mb-3">
              Morning Reset Checklist
            </h4>
            <p className="font-sans text-sm text-paper/70 mb-6">
              A simple 10-minute routine to start your day with intention.
            </p>
            <button
              onClick={handleDownload}
              className="btn-primary bg-paper text-charcoal hover:bg-paper/90 text-sm"
            >
              Download
              <Download className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Community Note Card */}
          <div className="bottom-card lg:col-span-2 dark-card p-8">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-paper/60" />
              <span className="label-uppercase text-paper/60">Community</span>
            </div>
            <h4 className="font-serif text-xl text-paper mb-3">
              A note on community
            </h4>
            <p className="font-sans text-sm text-paper/70 leading-relaxed max-w-2xl">
              This space is built on kindness, honesty, and the intention to benefit. 
              If something here helps you, share it with someone you love. 
              May Allah accept our efforts and multiply the good.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
