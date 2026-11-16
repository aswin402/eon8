import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { NotFoundPage } from '@/pages/NotFoundPage';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';

export interface LivePagePayload {
  slug: string;
  title: string;
  metaDesc: string;
  bodyClass: string;
  css: string;
  html: string;
}

const livePageModules = import.meta.glob('../data/livePages/*.json') as Record<
  string,
  () => Promise<{ default?: LivePagePayload } | LivePagePayload>
>;

async function loadLivePage(slug: string): Promise<LivePagePayload | null> {
  const loader = livePageModules[`../data/livePages/${slug}.json`];
  if (!loader) return null;
  const mod = await loader();
  if (mod && typeof mod === 'object' && 'default' in mod && mod.default) {
    return mod.default;
  }
  return mod as LivePagePayload;
}

const SMALL_BUSINESS_TESTIMONIALS = [
  'Within three months, our website started generating consistent quality leads thanks to their SEO strategy.',
  'We finally started ranking on Google for our main keywords, and the traffic is actually converting.',
  'Their SEO team explained everything clearly and delivered exactly what they promised.',
  'Our organic traffic doubled, and we’re now getting enquiries without spending extra on ads.',
  'Professional, transparent, and results-driven — the best decision we made for our online growth.',
];

interface LiveTemplatePageProps {
  slug?: string;
}

function handleAccordionClick(container: HTMLElement, target: HTMLElement): boolean {
  // 1. Custom data-legacy-click FAQ toggle (toggleFAQ(n))
  const legacyEl = target.closest<HTMLElement>('[data-legacy-click]');
  if (legacyEl) {
    const fnCall = legacyEl.getAttribute('data-legacy-click') || '';
    const faqMatch = fnCall.match(/toggleFAQ\((\d+)\)/);
    if (faqMatch) {
      const idx = faqMatch[1];
      const answer = container.querySelector<HTMLElement>(`#faq${idx}`);
      const icon = container.querySelector<HTMLElement>(`#icon${idx}`);
      if (answer) {
        const isOpen = answer.style.display === 'block';
        answer.style.display = isOpen ? 'none' : 'block';
        if (icon) icon.textContent = isOpen ? '+' : '−';
      }
      return true;
    }

    if (fnCall.includes('prevTestimonial') || fnCall.includes('nextTestimonial')) {
      const textEl = container.querySelector<HTMLElement>('#testimonialText');
      if (textEl) {
        const currentIdx = Number(textEl.dataset.idx ?? '0');
        const total = SMALL_BUSINESS_TESTIMONIALS.length;
        const nextIdx = fnCall.includes('prev')
          ? (currentIdx - 1 + total) % total
          : (currentIdx + 1) % total;
        textEl.dataset.idx = String(nextIdx);
        textEl.textContent = SMALL_BUSINESS_TESTIMONIALS[nextIdx];
      }
      return true;
    }
  }

  // 2. Elementor accordion or tabs (.elementor-tab-title)
  const elTabTitle = target.closest<HTMLElement>('.elementor-tab-title');
  if (elTabTitle) {
    const accItem = elTabTitle.closest<HTMLElement>('.elementor-accordion-item, .elementor-toggle-item');
    if (accItem) {
      const isOpen = accItem.classList.contains('is-active');
      const controlsId = elTabTitle.getAttribute('aria-controls');
      const content =
        (controlsId ? container.querySelector<HTMLElement>(`#${controlsId}`) : null) ||
        accItem.querySelector<HTMLElement>('.elementor-tab-content');
      accItem.classList.toggle('is-active', !isOpen);
      elTabTitle.setAttribute('aria-expanded', String(!isOpen));
      if (content) {
        content.classList.toggle('is-open', !isOpen);
        content.style.display = isOpen ? 'none' : 'block';
      }
      return true;
    }

    const tabsWrap = elTabTitle.closest<HTMLElement>('.elementor-tabs');
    if (tabsWrap) {
      const dataTab = elTabTitle.getAttribute('data-tab');
      tabsWrap.querySelectorAll('.elementor-tab-title').forEach((t) => {
        t.classList.toggle('elementor-active', t === elTabTitle);
        t.setAttribute('aria-expanded', String(t === elTabTitle));
      });
      tabsWrap.querySelectorAll<HTMLElement>('.elementor-tab-content').forEach((c) => {
        const match = dataTab ? c.getAttribute('data-tab') === dataTab : false;
        c.classList.toggle('elementor-active', match);
        c.classList.toggle('is-open', match);
        c.style.display = match ? 'block' : 'none';
      });
      return true;
    }
  }

  // 3. Bootstrap collapse ([data-toggle="collapse"])
  const collapseTrigger = target.closest<HTMLElement>('[data-toggle="collapse"], [data-bs-toggle="collapse"]');
  if (collapseTrigger) {
    const selector =
      collapseTrigger.getAttribute('data-target') ||
      collapseTrigger.getAttribute('data-bs-target') ||
      collapseTrigger.getAttribute('href');
    let panel: HTMLElement | null = null;
    if (selector && selector.startsWith('#') && selector.length > 1) {
      panel = container.querySelector<HTMLElement>(selector);
    }
    if (!panel) {
      panel = collapseTrigger.closest('.card, .panel')?.querySelector<HTMLElement>('.collapse') || null;
    }
    if (panel) {
      const isOpen = panel.classList.contains('show') || panel.classList.contains('in');
      panel.classList.toggle('show', !isOpen);
      panel.classList.toggle('in', !isOpen);
      panel.style.display = isOpen ? 'none' : 'block';
      collapseTrigger.setAttribute('aria-expanded', String(!isOpen));
      return true;
    }
  }

  // 4. Bootstrap tab triggers ([data-toggle="tab"] / [data-toggle="pill"])
  const tabTrigger = target.closest<HTMLElement>('[data-toggle="tab"], [data-toggle="pill"], [data-bs-toggle="tab"]');
  if (tabTrigger) {
    const selector =
      tabTrigger.getAttribute('href') ||
      tabTrigger.getAttribute('data-target') ||
      tabTrigger.getAttribute('data-bs-target');
    if (selector && selector.startsWith('#') && selector.length > 1) {
      const targetPane = container.querySelector<HTMLElement>(selector);
      if (targetPane) {
        const navGroup = tabTrigger.closest('.nav, ul');
        navGroup?.querySelectorAll('a, li').forEach((n) => n.classList.remove('active'));
        tabTrigger.classList.add('active');
        tabTrigger.closest('li')?.classList.add('active');

        const tabContent = targetPane.parentElement;
        tabContent?.querySelectorAll<HTMLElement>(':scope > .tab-pane').forEach((pane) => {
          pane.classList.remove('active', 'show', 'in');
          pane.style.display = 'none';
        });
        targetPane.classList.add('active', 'show', 'in');
        targetPane.style.display = 'block';
        return true;
      }
    }
  }

  return false;
}

function showFormOutput(form: HTMLFormElement, message: string, isError: boolean) {
  let output = form.querySelector<HTMLElement>('.wpcf7-response-output');
  if (!output) {
    output = document.createElement('div');
    output.className = 'wpcf7-response-output';
    form.appendChild(output);
  }
  output.classList.remove('eon8-form-success', 'eon8-form-error');
  output.classList.add(isError ? 'eon8-form-error' : 'eon8-form-success');
  output.textContent = message;
  output.style.display = 'block';
}

function LiveTemplateBody({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const { setContactModalOpen } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const [payload, setPayload] = useState<LivePagePayload | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    window.scrollTo(0, 0);

    loadLivePage(slug).then((data) => {
      if (cancelled) return;
      if (!data) {
        setNotFound(true);
        return;
      }
      setPayload(data);
      if (data.title) {
        document.title = data.title;
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && data.metaDesc) {
        metaDesc.setAttribute('content', data.metaDesc);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !payload) return;

    // Ensure reveal / AOS / typing headings activate cleanly
    container.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
    container.querySelectorAll('[data-aos]').forEach((el) => el.classList.add('aos-animate'));
    container
      .querySelectorAll('.to, .to-slow, .to-normal, .to-fast, .to-xfast')
      .forEach((el) => el.classList.add('animate'));

    // Defensive cleanup of duplicate header/footer tags inside extracted HTML if any
    container
      .querySelectorAll(
        '#site-header, #header-placeholder, .neo-footer, .fixed-icons, .sticky-form, .mystickyelements-fixed'
      )
      .forEach((el) => el.remove());

    // Prevent legacy WP quiz inputs with hardcoded attribute values from stalling validation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Modal triggers -> open native React Contact Modal
      const modalTrigger = target.closest<HTMLElement>(
        '[data-toggle="modal"], [data-bs-toggle="modal"], [data-target="#myModal"], [data-bs-target="#myModal"]'
      );
      if (modalTrigger) {
        e.preventDefault();
        setContactModalOpen(true);
        return;
      }

      // Interactive accordions, tabs, FAQs, testimonials
      if (handleAccordionClick(container, target)) {
        const anchor = target.closest('a');
        if (anchor && (anchor.getAttribute('href') || '').startsWith('#')) {
          e.preventDefault();
        }
        return;
      }

      // Anchor / internal URL delegation
      const anchor = target.closest<HTMLAnchorElement>('a');
      if (!anchor) return;
      const href = (anchor.getAttribute('href') || '').trim();
      if (!href || href === '#' || href.startsWith('javascript:')) {
        e.preventDefault();
        return;
      }
      if (href.startsWith('#')) {
        const dest = container.querySelector(href) || document.querySelector(href);
        e.preventDefault();
        if (dest) {
          dest.scrollIntoView({ behavior: 'smooth' });
        } else if (href === '#myModal' || href === '#contact') {
          setContactModalOpen(true);
        }
        return;
      }
      if (href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }
      if (href.startsWith('/') && !href.startsWith('/wp-content/')) {
        e.preventDefault();
        navigate(href);
        return;
      }
      if (href.startsWith('https://www.eon8.com/') || href.startsWith('http://www.eon8.com/')) {
        e.preventDefault();
        const url = new URL(href);
        navigate(`${url.pathname}${url.search}${url.hash}`);
      }
    };

    const handleSubmit = (e: Event) => {
      const form = (e.target as HTMLElement | null)?.closest('form');
      if (!form) return;
      e.preventDefault();

      // Validate required fields
      const requiredInputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input[aria-required="true"], input[required], textarea[required], select[required], input[type="email"]'
      );
      for (const field of Array.from(requiredInputs)) {
        const val = field.value.trim();
        if (!val) {
          showFormOutput(form, 'Please fill in all required fields before submitting.', true);
          field.focus();
          return;
        }
        if (field instanceof HTMLInputElement && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          showFormOutput(form, 'Please enter a valid email address.', true);
          field.focus();
          return;
        }
      }

      // Validate CF7 math quiz if present
      const quizLabel = form.querySelector('.wpcf7-quiz-label')?.textContent || '';
      const quizInput = form.querySelector<HTMLInputElement>('input.wpcf7-quiz');
      if (quizInput && quizLabel) {
        const m = quizLabel.match(/(\d+)\s*\+\s*(\d+)/);
        if (m) {
          const expected = Number(m[1]) + Number(m[2]);
          if (Number(quizInput.value.trim()) !== expected) {
            showFormOutput(form, `Incorrect math verification answer (${quizLabel.trim()}).`, true);
            quizInput.focus();
            return;
          }
        }
      }

      showFormOutput(
        form,
        'Thank you for your message. It has been sent to our EON8 team — we will connect with you shortly.',
        false
      );
      form.reset();
    };

    container.addEventListener('click', handleClick);
    container.addEventListener('submit', handleSubmit);
    return () => {
      container.removeEventListener('click', handleClick);
      container.removeEventListener('submit', handleSubmit);
    };
  }, [payload, navigate, setContactModalOpen]);

  if (notFound) {
    return <NotFoundPage />;
  }

  if (!payload) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#FD5900]" />
        <span className="text-sm font-medium">Loading page…</span>
      </div>
    );
  }

  const sanitizedHtml = payload.html.replace(
    /^\s*Placeholder to prevent page jump when header becomes fixed\s*/i,
    ''
  );

  return (
    <div ref={containerRef} className={`eon8-live-page ${payload.bodyClass || ''}`}>
      {payload.css && <style dangerouslySetInnerHTML={{ __html: payload.css }} />}
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
}

export function LiveTemplatePage({ slug: propSlug }: LiveTemplatePageProps) {
  const params = useParams();
  const activeSlug = propSlug || params.slug || '';
  if (!activeSlug) {
    return <NotFoundPage />;
  }
  return <LiveTemplateBody key={activeSlug} slug={activeSlug} />;
}
