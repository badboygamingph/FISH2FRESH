import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react';

export default function BackToTop() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show the button when the user has scrolled down 500px
    if (latest > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, shouldReduceMotion
        ? { immediate: true }
        : { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? 'instant' : 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.75, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.75, y: 12 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -4 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[90] rounded-full border border-white/10 bg-slate-900/90 p-3.5 text-white shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 hover:border-blue-500 hover:bg-blue-600 hover:shadow-[0_8px_40px_rgba(59,130,246,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 group motion-reduce:transition-none md:bottom-10 md:right-10"
          aria-label="Scroll to top"
        >
          <motion.span
            className="block"
            animate={shouldReduceMotion ? undefined : { y: [0, -2, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronUp size={24} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
