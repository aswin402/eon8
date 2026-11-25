import { useEffect, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps keyboard focus inside a dialog while it is open: focuses the first field,
 * wraps Tab / Shift+Tab, and returns focus to the element that opened it on close.
 * Hidden spam-trap fields (tabIndex -1, off screen) are skipped.
 */
export function useFocusTrap(active: boolean, containerRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    if (!active) return undefined;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusable = (): HTMLElement[] => {
      const root = containerRef.current;
      if (!root) return [];
      return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.tabIndex >= 0 && el.getClientRects().length > 0 && !el.closest('[aria-hidden="true"]')
      );
    };

    // Wait a frame so the opening animation has mounted the fields.
    const raf = window.requestAnimationFrame(() => {
      const root = containerRef.current;
      if (root && !root.contains(document.activeElement)) {
        const first = focusable().find((el) => el.matches('input, select, textarea')) ?? focusable()[0];
        first?.focus();
      }
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || !containerRef.current?.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !containerRef.current?.contains(current))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      if (opener && document.contains(opener)) opener.focus();
    };
  }, [active, containerRef]);
}
