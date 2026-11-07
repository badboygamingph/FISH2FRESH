import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // If the path hasn't changed (e.g. initial mount or hash change), do not scroll to top
    if (pathname === prevPathname.current) {
      if (hash) {
        setTimeout(() => {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView();
          }
        }, 50);
      }
      return;
    }

    // Path changed! Scroll to top
    prevPathname.current = pathname;

    // If there is a hash, let the browser handle scrolling to it after a short delay
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 50);
    } else {
      // Otherwise scroll to top on route change
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
