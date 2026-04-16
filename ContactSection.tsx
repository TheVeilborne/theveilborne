import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Contact card animation
      gsap.fromTo(
        contactRef.current,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Testimonial card animation
      gsap.fromTo(
        testimonialRef.current,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      toast.success('Message sent!', {
        description: 'Thank you for reaching out. I\'ll get back to you soon.',
      });
      setMessage('');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-navy py-24"
      style={{ zIndex: 80 }}
    >
      <div className="w-full px-6 lg:px-[6vw]">
        {/* Top Row - Contact + Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Card */}
          <div
            ref={contactRef}
            id="about"
            className="dark-card p-8 lg:p-10"
          >
            <h3 className="font-serif text-3xl text-paper mb-4">
              Work with me
            </h3>
            <p className="font-sans text-base text-paper/70 mb-8 leading-relaxed">
              Collaborations, speaking, and creative partnerships. I'd love to hear from you.
            </p>
            
            <div className="flex items-center gap-3 mb-8">
              <Mail className="w-5 h-5 text-lilac" />
              <a
                href="mailto:hello@nuria.design"
                className="font-sans text-paper hover:text-lilac transition-colors"
              >
                hello@nuria.design
              </a>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                rows={4}
                className="w-full px-5 py-4 rounded-2xl bg-paper/10 border border-paper/20 text-paper placeholder:text-paper/50 focus:outline-none focus:ring-2 focus:ring-lilac/50 resize-none"
                required
              />
              <button
                type="submit"
                className="btn-primary bg-lilac text-charcoal hover:bg-lilac/90"
              >
                Send a message
                <Send className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Testimonial Card */}
          <div
            ref={testimonialRef}
            className="dark-card p-8 lg:p-10 flex flex-col justify-center"
          >
            <div className="quote-mark text-lilac opacity-30 mb-6">"</div>
            <blockquote className="font-serif text-2xl text-paper italic leading-relaxed mb-6">
              TheVeilborne essays feel like a cup of tea and an honest conversation—calm, clear, and full of barakah.
            </blockquote>
            <cite className="font-sans text-sm text-paper/60 not-italic">
              — A reader
            </cite>
          </div>
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className="border-t border-paper/10 pt-10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="font-sans text-sm font-medium tracking-[0.14em] uppercase text-paper">
              TheVeilborne
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-paper/60 hover:text-paper transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-paper/60 hover:text-paper transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="#essays"
                className="font-sans text-sm text-paper/60 hover:text-paper transition-colors flex items-center gap-1"
              >
                Newsletter
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Legal */}
            <div className="flex items-center gap-4 text-xs text-paper/40">
              <span>© {new Date().getFullYear()} TheVeilborne</span>
              <span>•</span>
              <a href="#" className="hover:text-paper/60 transition-colors">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-paper/60 transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
