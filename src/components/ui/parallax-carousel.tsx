import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import bulletImg from '../../assets/images/bullet_tuna.jpg';
import skipjackImg from '../../assets/images/skipjack_tuna_1786286515562.webp';
import yellowfinImg from '../../assets/images/yellowfin_tuna.jpg';
import anatomyImg from '../../assets/images/fresh_fish_anatomy_1786286635448.webp';
import mackerelImg from '../../assets/images/mackerel_tuna_1786286531308.webp';

export interface ParallaxCarouselItem {
  src: string;
  title?: string;
  subtitle?: string;
}

export interface ParallaxCarouselProps {
  images?: string[];
  items?: ParallaxCarouselItem[];
  imageWidth?: number;
  imageHeight?: number;
  gap?: number;
  parallaxIntensity?: number;
  uvScale?: number;
  lerp?: number;
  wheelSensitivity?: number;
  dragSensitivity?: number;
  loop?: boolean;
  borderRadius?: number;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
  showProgress?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: ParallaxCarouselItem[] = [
  { src: bulletImg, title: 'Bullet Tuna', subtitle: 'Pirit' },
  { src: skipjackImg, title: 'Skipjack Tuna', subtitle: 'Tulingan' },
  { src: yellowfinImg, title: 'Yellowfin Tuna', subtitle: 'Karaw' },
  { src: anatomyImg, title: 'Fresh Anatomy', subtitle: 'Eyes & Gills' },
  { src: mackerelImg, title: 'Mackerel Tuna', subtitle: 'Tulingan Puti' },
];

export function ParallaxCarousel({
  images,
  items,
  imageWidth = 340,
  imageHeight = 260,
  gap = 20,
  parallaxIntensity = 0.45,
  uvScale = 0.85,
  lerp: lerpFactor = 0.08,
  wheelSensitivity = 0.9,
  dragSensitivity = 1.3,
  loop = true,
  borderRadius = 16,
  autoplaySpeed = 0,
  pauseOnHover = true,
  showProgress = true,
  className = '',
}: ParallaxCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLImageElement[]>([]);

  const carouselItems: ParallaxCarouselItem[] = useMemo(() => {
    let base: ParallaxCarouselItem[];
    if (items && items.length > 0) base = items;
    else if (images && images.length > 0) {
      base = images.map((src) => ({ src }));
    } else {
      base = DEFAULT_ITEMS;
    }

    // For seamless infinite looping on wider displays, ensure at least 6 cards
    if (loop && base.length > 0 && base.length < 6) {
      const repeats = Math.ceil(6 / base.length);
      const extended: ParallaxCarouselItem[] = [];
      for (let r = 0; r < repeats; r++) {
        extended.push(...base);
      }
      return extended;
    }
    return base;
  }, [images, items, loop]);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Adapt card width on smaller devices so a peek of the next card is visible
  const effectiveWidth = useMemo(() => {
    if (!containerWidth) return imageWidth;
    return Math.min(imageWidth, Math.max(220, containerWidth - 48));
  }, [containerWidth, imageWidth]);

  const effectiveHeight = useMemo(() => {
    if (!imageWidth) return imageHeight;
    return Math.round((effectiveWidth / imageWidth) * imageHeight);
  }, [effectiveWidth, imageWidth, imageHeight]);

  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const stateRef = useRef({
    currentX: 0,
    targetX: 0,
    startX: 0,
    dragStartX: 0,
    isPointerDown: false,
    itemStride: effectiveWidth + gap,
    totalWidth: carouselItems.length * (effectiveWidth + gap),
    minX: 0,
    maxX: 0,
  });

  useEffect(() => {
    const stride = effectiveWidth + gap;
    stateRef.current.itemStride = stride;
    stateRef.current.totalWidth = carouselItems.length * stride;
  }, [effectiveWidth, gap, carouselItems.length]);

  const clampPosition = useCallback((target: number, containerW: number) => {
    if (loop) return target;
    const maxScroll = Math.max(0, stateRef.current.totalWidth - gap - containerW);
    return Math.max(-maxScroll, Math.min(0, target));
  }, [loop, gap]);

  useEffect(() => {
    let animId: number;
    const state = stateRef.current;

    const tick = () => {
      const container = containerRef.current;
      if (!container) {
        animId = requestAnimationFrame(tick);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const containerW = containerRect.width;
      const containerCenter = containerRect.left + containerW / 2;

      // Autoplay drift when idle
      if (autoplaySpeed > 0 && !state.isPointerDown && (!isHovered || !pauseOnHover)) {
        state.targetX -= (autoplaySpeed / 60);
      }

      // Smooth interpolation (lerp)
      state.currentX += (state.targetX - state.currentX) * lerpFactor;

      const stride = state.itemStride;
      const total = state.totalWidth;

      // Position each card and compute UV parallax counter-shift
      planesRef.current.forEach((plane, i) => {
        if (!plane) return;

        let x = i * stride + state.currentX;

        if (loop && total > 0) {
          // Horizontal wrap-around logic
          const minVisible = -stride * 1.5;
          const maxVisible = containerW + stride * 0.5;
          while (x < minVisible) x += total;
          while (x > maxVisible) x -= total;
        }

        plane.style.transform = `translate3d(${x}px, 0, 0)`;

        // Calculate card's center relative to container
        const cardCenter = containerRect.left + x + effectiveWidth / 2;
        const distFromCenter = cardCenter - containerCenter;
        const normalized = Math.max(-1.5, Math.min(1.5, distFromCenter / (containerW / 2)));

        // Counter-shift inner image for parallax depth
        const img = imgRefs.current[i];
        if (img) {
          const maxShift = (effectiveWidth * (1 / uvScale - 1)) * 0.5;
          const shiftX = -normalized * maxShift * parallaxIntensity;
          img.style.transform = `scale(${1 / uvScale}) translate3d(${shiftX}px, 0, 0)`;
        }
      });

      // Update progress bar
      if (!loop && total > containerW) {
        const maxScroll = total - gap - containerW;
        const curProgress = Math.min(1, Math.max(0, -state.currentX / maxScroll));
        setProgress(curProgress);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [autoplaySpeed, isHovered, pauseOnHover, lerpFactor, loop, imageWidth, gap, parallaxIntensity, uvScale]);

  // Pointer drag handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    const state = stateRef.current;
    state.isPointerDown = true;
    state.startX = e.clientX;
    state.dragStartX = state.targetX;
    setIsDragging(true);
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state.isPointerDown) return;
    const delta = (e.clientX - state.startX) * dragSensitivity;
    const containerW = containerRef.current?.clientWidth || 600;
    state.targetX = clampPosition(state.dragStartX + delta, containerW);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    stateRef.current.isPointerDown = false;
    setIsDragging(false);
    try {
      containerRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Wheel handling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * wheelSensitivity;
    const containerW = containerRef.current?.clientWidth || 600;
    state.targetX = clampPosition(state.targetX - delta, containerW);
  };

  return (
    <div
      className={`relative w-full select-none overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        style={{
          height: `${effectiveHeight}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
        }}
        className="relative w-full overflow-hidden"
      >
        <div ref={trackRef} className="absolute inset-0">
          {carouselItems.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              ref={(el) => {
                if (el) planesRef.current[index] = el;
              }}
              style={{
                width: `${effectiveWidth}px`,
                height: `${effectiveHeight}px`,
                borderRadius: `${borderRadius}px`,
              }}
              className="absolute top-0 left-0 overflow-hidden border border-black/10 bg-[#F6F6F6] shadow-sm will-change-transform"
            >
              <div className="relative h-full w-full overflow-hidden">
                <img
                  ref={(el) => {
                    if (el) imgRefs.current[index] = el;
                  }}
                  src={item.src}
                  alt={item.title || `Carousel slide ${index + 1}`}
                  draggable={false}
                  className="pointer-events-none h-full w-full object-cover will-change-transform"
                />
                {(item.title || item.subtitle) && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-6 text-white">
                    {item.title && (
                      <p className="title-3 text-sm font-semibold tracking-tight text-white drop-shadow-sm sm:text-base">
                        {item.title}
                      </p>
                    )}
                    {item.subtitle && (
                      <p className="caption-4 text-xs font-normal text-white/80 drop-shadow-sm">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showProgress && !loop && (
        <div className="mx-auto mt-4 h-1 w-32 overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-[#181818] transition-all duration-150"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default ParallaxCarousel;
