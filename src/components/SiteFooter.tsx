import { InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SwappingText } from '@animate-ui/react/primitives/texts/swapping';

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
  const { language, t } = useLanguage();
  const bannerContainerRef = useRef<HTMLDivElement>(null);
  const bannerTextRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const container = bannerContainerRef.current;
      const text = bannerTextRef.current;
      if (!container || !text) return;
      const containerW = container.clientWidth - 24;
      const textW = text.scrollWidth;
      if (textW > 0 && containerW > 0) {
        setScale(Math.min(1, containerW / textW));
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (bannerContainerRef.current) ro.observe(bannerContainerRef.current);
    if (bannerTextRef.current) ro.observe(bannerTextRef.current);
    window.addEventListener('resize', updateScale);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [language]);

  const columns = [
    { title: t.footer.product, ids: ['features', 'how-it-works', 'species'] },
    { title: t.footer.resources, ids: ['indicators', 'faq'] },
  ];

  return (
    <footer className="overflow-hidden border-t border-black/10 bg-[#F6F6F6] text-[#181818]">
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

      <div
        ref={bannerContainerRef}
        className="relative mt-8 flex w-full flex-col items-center justify-center overflow-hidden px-4 py-8 sm:mt-16 sm:px-6 sm:py-14"
      >
        <div
          ref={bannerTextRef}
          style={{
            fontFamily: 'Manrope, sans-serif',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
          }}
          className="select-none text-center text-2xl font-bold tracking-tight text-[#181818] sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap will-change-transform"
        >
          <SwappingText
            key={language}
            text={t.footer.quotes}
            duration={2800}
            direction="up"
            stagger={0.035}
          />
        </div>
      </div>

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
