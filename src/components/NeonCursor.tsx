import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './NeonCursor.css';

const INTERACTIVE_SELECTOR =
  'a, button, summary, [role="button"], [data-hover="true"]';
const NAVBAR_SELECTOR = '#site-header, header';
const TEXT_FIELD_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

function canUseCustomCursor(): boolean {
  if (typeof window === 'undefined') return false;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return finePointer && !reducedMotion;
}

export function NeonCursor() {
  const [enabled, setEnabled] = useState<boolean>(canUseCustomCursor);
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [inNavbar, setInNavbar] = useState(false);
  const [overTextField, setOverTextField] = useState(false);

  // Zero-rerender motion values updated directly on mousemove
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const mainX = useSpring(rawX, { damping: 32, stiffness: 620, mass: 0.25 });
  const mainY = useSpring(rawY, { damping: 32, stiffness: 620, mass: 0.25 });

  const trailX = useSpring(rawX, { damping: 28, stiffness: 260, mass: 0.55 });
  const trailY = useSpring(rawY, { damping: 28, stiffness: 260, mass: 0.55 });

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncEnabled = () => {
      setEnabled(pointerQuery.matches && !motionQuery.matches);
    };

    pointerQuery.addEventListener('change', syncEnabled);
    motionQuery.addEventListener('change', syncEnabled);

    return () => {
      pointerQuery.removeEventListener('change', syncEnabled);
      motionQuery.removeEventListener('change', syncEnabled);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) {
      root.classList.remove('neon-cursor-active');
      return undefined;
    }

    root.classList.add('neon-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible((prev) => (prev ? prev : true));

      const target = e.target as HTMLElement | null;
      if (target) {
        setOverTextField(Boolean(target.closest(TEXT_FIELD_SELECTOR)));
        setInNavbar(Boolean(target.closest(NAVBAR_SELECTOR)));
        setIsHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => {
      setVisible(false);
      setIsHovering(false);
      setInNavbar(false);
      setIsClicking(false);
    };
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      root.classList.remove('neon-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  const showDot = visible && !overTextField;
  const showOuter = showDot && !inNavbar;

  return (
    <div className="neon-cursor-container" aria-hidden="true">
      {/* Crisp inner cursor dot (stays alone & steady inside navbar) */}
      <motion.div
        className="cursor-main"
        style={{
          x: mainX,
          y: mainY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: showDot ? 1 : 0,
          scale: isClicking ? 0.8 : inNavbar ? 1 : isHovering ? 1.15 : 1,
        }}
        transition={{ duration: 0.14 }}
      />

      {/* Minimal outer trailing ring (disappears cleanly inside navbar) */}
      <motion.div
        className="cursor-trail"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: showOuter ? 1 : 0,
          scale: !showOuter ? 0.45 : isHovering ? 1.2 : isClicking ? 0.88 : 1,
        }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      />
    </div>
  );
}
