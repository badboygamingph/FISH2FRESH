import { InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import type { MouseEvent } from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface FooterLink {
  id: string;
  href: string;
  label: string;
}

interface SiteFooterProps {
  links: FooterLink[];
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const socials = [
  { icon: XLogo, label: 'X' },
  { icon: InstagramLogo, label: 'Instagram' },
  { icon: YoutubeLogo, label: 'YouTube' },
  { icon: LinkedinLogo, label: 'LinkedIn' },
];

export default function SiteFooter({ links, onNavigate }: SiteFooterProps) {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const lastScroll = useRef(0);
  const reduce = useReducedMotion();
  const [collapsed, setCollapsed] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const footer = footerRef.current;
    if (!footer) return;
    const rect = footer.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    const delta = latest - lastScroll.current;
    lastScroll.current = latest;
    if (!inView || Math.abs(delta) < 6) return;
    setCollapsed(delta < 0);
  });

  const columns = [
    { title: t.footer.product, ids: ['features', 'how-it-works', 'species'] },
    { title: t.footer.resources, ids: ['indicators', 'faq'] },
  ];

  return (
    <footer ref={footerRef} className="overflow-hidden border-t border-black/10 bg-[#F6F6F6] text-[#181818]">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="text-center md:text-left">
            <p className="body-6 mx-auto max-w-xs text-pretty text-slate-600 md:mx-0">{t.footer.desc}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 md:mt-6 md:justify-start">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={`#${item.label.toLowerCase()}`}
                      aria-label={item.label}
                      onClick={(event) => event.preventDefault()}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-[#181818] transition-colors duration-300 hover:bg-[#181818] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6 md:contents">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="title-3">{column.title}</h2>
                <ul className="mt-3 space-y-2 md:mt-4 md:space-y-3">
                  {column.ids.map((id) => {
                    const link = links.find((item) => item.id === id);
                    if (!link) return null;
                    return (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          onClick={(event) => onNavigate(event, link.id)}
                          className="body-6 text-slate-600 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="relative mt-8 overflow-hidden px-2 sm:mt-20"
        initial={false}
        animate={{ height: reduce || collapsed ? '0.39em' : '0.86em' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontSize: 'clamp(2.85rem, 14vw, 11rem)' }}
      >
        <p
          aria-hidden="true"
          style={{
            fontFamily: '"Outfit", Manrope, sans-serif',
            fontWeight: 500,
            fontSize: '1em',
            lineHeight: 0.8,
            letterSpacing: '-0.045em',
            WebkitTextStroke: '1px #181818',
            color: 'transparent',
          }}
          className="select-none whitespace-nowrap text-center uppercase"
        >
          FISH2FRESH
        </p>
      </motion.div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 border-t border-black/10 px-4 pb-6 pt-5 text-center sm:flex-row sm:justify-center sm:gap-5 sm:px-6">
          <p className="caption-2 text-slate-500">© {new Date().getFullYear()} FISH2FRESH</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link to="/terms" className="caption-2 text-slate-500 hover:text-black">
              {t.footer.terms}
            </Link>
            <Link to="/privacy" className="caption-2 text-slate-500 hover:text-black">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
    </footer>
  );
}
