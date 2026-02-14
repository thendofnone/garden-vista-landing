import { useEffect, useRef, useState, useCallback } from 'react';

export const useParallax = (speed: number = 0.3) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const rafId = useRef<number>(0);

  const setTargetRef = useCallback((el: HTMLElement | null) => {
    targetRef.current = el;
  }, []);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !targetRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Normalized: 0 when element enters bottom, 1 when it exits top
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      // Center the parallax around 0.5 so it moves symmetrically
      const offset = (clamped - 0.5) * speed * 200;
      targetRef.current.style.transform = `translateY(${offset}px)`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [speed]);

  return { containerRef, setTargetRef };
};

export const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};
