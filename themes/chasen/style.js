/* eslint-disable react/no-unknown-property */
/**
 * Chasen 的极简暖纸面视觉系统。
 * 仅作用于 #theme-thoughtlite，保持 NotionNext 主题的样式隔离方式。
 */
export const CHASEN_STYLE_TOKENS = {
  bg: '#f3f0e9',
  surface: '#fffdf8',
  border: '#ded8cd',
  warmAccent: '#b46942',
  shadowFloat: '0 8px 24px rgba(38, 35, 30, 0.08)'
}

export const CHASEN_DARK_STYLE_TOKENS = {
  bg: '#0c0c0d',
  surface: '#141416',
  text: '#ececec',
  muted: '#9ca3af',
  faint: '#6b7280',
  border: '#27272a',
  accent: '#60a5fa'
}

const Style = () => {
  return (
    <style jsx global>{`
      #theme-thoughtlite {
        --tl-bg: ${CHASEN_STYLE_TOKENS.bg};
        --tl-surface: ${CHASEN_STYLE_TOKENS.surface};
        --tl-text: #1c1b19;
        --tl-muted: #6b665f;
        --tl-faint: #999288;
        --tl-border: ${CHASEN_STYLE_TOKENS.border};
        --tl-accent: #2f6fed;
        --tl-warm-accent: ${CHASEN_STYLE_TOKENS.warmAccent};
        --tl-accent-soft: rgba(47, 111, 237, 0.08);
        --tl-radius: 10px;
        --tl-shadow-float: ${CHASEN_STYLE_TOKENS.shadowFloat};
        --tl-shadow-hover: 0 10px 28px rgba(38, 35, 30, 0.1);
        --tl-font-display:
          ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
        --tl-font-body:
          ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, 'Noto Sans', 'PingFang SC',
          'Microsoft YaHei', sans-serif;
        min-height: 100vh;
        position: relative;
        isolation: isolate;
        background-color: var(--tl-bg);
        color: var(--tl-text);
        font-family: var(--tl-font-body);
        text-rendering: optimizeLegibility;
      }

      #theme-thoughtlite::before {
        position: fixed;
        z-index: 0;
        inset: 0;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http:%2F%2Fwww.w3.org%2F2000%2Fsvg' width='180' height='180'%3E%3Cfilter id='tl-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23tl-noise)' opacity='.8'/%3E%3C/svg%3E");
        mix-blend-mode: multiply;
        opacity: 0.035;
        content: '';
      }

      .dark #theme-thoughtlite {
        --tl-bg: ${CHASEN_DARK_STYLE_TOKENS.bg};
        --tl-surface: ${CHASEN_DARK_STYLE_TOKENS.surface};
        --tl-text: ${CHASEN_DARK_STYLE_TOKENS.text};
        --tl-muted: ${CHASEN_DARK_STYLE_TOKENS.muted};
        --tl-faint: ${CHASEN_DARK_STYLE_TOKENS.faint};
        --tl-border: ${CHASEN_DARK_STYLE_TOKENS.border};
        --tl-accent: ${CHASEN_DARK_STYLE_TOKENS.accent};
        --tl-warm-accent: #d69a73;
        --tl-accent-soft: rgba(96, 165, 250, 0.12);
        --tl-shadow-float: 0 8px 24px rgba(0, 0, 0, 0.24);
        --tl-shadow-hover: 0 10px 28px rgba(0, 0, 0, 0.3);
      }

      .dark #theme-thoughtlite .tl-author-backdrop__avatar {
        opacity: 0.11;
        mix-blend-mode: screen;
        filter: invert(1) grayscale(0.85) sepia(0.12) hue-rotate(160deg)
          saturate(0.45) brightness(0.72);
      }

      .dark #theme-thoughtlite .tl-author-backdrop__grain {
        mix-blend-mode: screen;
        opacity: 0.08;
      }

      #theme-thoughtlite :where(a, button) {
        -webkit-tap-highlight-color: transparent;
      }

      #theme-thoughtlite :where(a, button, input):focus-visible {
        outline: 2px solid var(--tl-accent);
        outline-offset: 3px;
      }

      #theme-thoughtlite .tl-header {
        background-color: color-mix(in srgb, var(--tl-bg) 88%, transparent);
        backdrop-filter: blur(12px) saturate(115%);
        border-bottom: 1px solid
          color-mix(in srgb, var(--tl-border) 82%, transparent);
        box-shadow: 0 4px 18px
          color-mix(in srgb, var(--tl-border) 48%, transparent);
        overflow: visible;
        transition:
          background-color 180ms ease,
          border-color 180ms ease,
          box-shadow 180ms ease;
      }

      #theme-thoughtlite .tl-brand {
        font-family: var(--tl-font-display);
        letter-spacing: -0.02em;
        transition:
          color 180ms ease,
          opacity 180ms ease;
      }

      #theme-thoughtlite .tl-brand:hover {
        color: var(--tl-accent);
      }

      #theme-thoughtlite .tl-author-intro {
        margin-bottom: 1.75rem;
        padding: 0.2rem 0 1.2rem;
        border-bottom: 1px solid var(--tl-border);
      }

      #theme-thoughtlite .tl-author-intro__line {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.55rem;
        margin: 0;
        color: var(--tl-muted);
        font-size: 0.9rem;
        line-height: 1.7;
      }

      #theme-thoughtlite .tl-author-intro__name {
        color: var(--tl-text);
        font-family: var(--tl-font-display);
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.2;
      }

      #theme-thoughtlite .tl-author-intro__separator {
        color: var(--tl-faint);
        font-weight: 400;
      }

      #theme-thoughtlite .tl-author-intro__role {
        color: var(--tl-warm-accent);
        font-weight: 650;
      }

      #theme-thoughtlite .tl-author-intro__description {
        color: var(--tl-muted);
      }

      #theme-thoughtlite .tl-author-backdrop {
        position: fixed;
        z-index: 1;
        top: clamp(18rem, 48vh, 36rem);
        right: 0;
        bottom: 0;
        left: 50%;
        width: min(820px, calc(100vw - 2rem));
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        --tl-avatar-shift-x: 0px;
        --tl-avatar-shift-y: 0px;
        --tl-grain-shift-x: 0px;
        --tl-grain-shift-y: 0px;
        overflow: hidden;
        transform: translateX(-50%);
        animation: tl-author-backdrop-in 420ms ease-out 120ms forwards;
      }

      #theme-thoughtlite .tl-author-backdrop__frame {
        position: absolute;
        inset: 0;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--tl-text) 10%, transparent);
        background: color-mix(in srgb, var(--tl-bg) 18%, transparent);
        transition:
          border-color 220ms ease,
          background-color 220ms ease;
      }

      #theme-thoughtlite .tl-author-backdrop.is-ready {
        visibility: visible;
      }

      #theme-thoughtlite .tl-author-backdrop.is-short-page {
        display: none;
      }

      #theme-thoughtlite .tl-author-backdrop__grid {
        position: absolute;
        inset: 8px;
        background-image:
          linear-gradient(
            color-mix(in srgb, var(--tl-text) 8%, transparent) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            color-mix(in srgb, var(--tl-text) 8%, transparent) 1px,
            transparent 1px
          );
        background-position: var(--tl-grain-shift-x) var(--tl-grain-shift-y);
        background-size: 32px 32px;
        mask-image: linear-gradient(
          to bottom,
          transparent 0%,
          black 16%,
          black 82%,
          transparent 100%
        );
        opacity: 0.42;
        transition: background-position 260ms ease;
      }

      #theme-thoughtlite .tl-author-backdrop__corner {
        position: absolute;
        z-index: 2;
        width: 1.25rem;
        height: 1.25rem;
        border-color: color-mix(in srgb, var(--tl-text) 18%, transparent);
        border-style: solid;
        transition: border-color 220ms ease;
      }

      #theme-thoughtlite .tl-author-backdrop__corner--tl {
        top: 0.75rem;
        left: 0.75rem;
        border-width: 1px 0 0 1px;
      }

      #theme-thoughtlite .tl-author-backdrop__corner--tr {
        top: 0.75rem;
        right: 0.75rem;
        border-width: 1px 1px 0 0;
      }

      #theme-thoughtlite .tl-author-backdrop__corner--bl {
        bottom: 0.75rem;
        left: 0.75rem;
        border-width: 0 0 1px 1px;
      }

      #theme-thoughtlite .tl-author-backdrop__corner--br {
        right: 0.75rem;
        bottom: 0.75rem;
        border-width: 0 1px 1px 0;
      }

      #theme-thoughtlite .tl-author-backdrop__marker {
        position: absolute;
        z-index: 2;
        width: 0.4rem;
        height: 0.4rem;
        border: 1px solid var(--tl-warm-accent);
        border-radius: 9999px;
        background: var(--tl-bg);
        transition:
          background-color 220ms ease,
          border-color 220ms ease,
          transform 260ms ease;
      }

      #theme-thoughtlite .tl-author-backdrop__marker--top {
        top: -0.2rem;
        left: 50%;
        transform: translateX(-50%);
      }

      #theme-thoughtlite .tl-author-backdrop__marker--bottom {
        bottom: -0.2rem;
        left: 50%;
        transform: translateX(-50%);
      }

      #theme-thoughtlite .tl-author-backdrop__label {
        position: absolute;
        z-index: 3;
        color: var(--tl-faint);
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        line-height: 1.2;
        white-space: nowrap;
        transition: color 220ms ease;
      }

      #theme-thoughtlite .tl-author-backdrop__label--tl {
        top: 1rem;
        left: 2.5rem;
        color: var(--tl-warm-accent);
      }

      #theme-thoughtlite .tl-author-backdrop__label--tr {
        top: 1rem;
        right: 2.5rem;
      }

      #theme-thoughtlite .tl-author-backdrop__label--bl {
        bottom: 1rem;
        left: 2.5rem;
      }

      #theme-thoughtlite .tl-author-backdrop__label--br {
        right: 2.5rem;
        bottom: 1rem;
      }

      #theme-thoughtlite .tl-author-backdrop__avatar {
        position: absolute;
        z-index: 1;
        bottom: -2%;
        left: 50%;
        width: clamp(280px, 42%, 340px);
        max-width: none;
        opacity: 0.15;
        mix-blend-mode: multiply;
        filter: saturate(0.75) contrast(1.03);
        transform: translate(
          calc(-50% + var(--tl-avatar-shift-x)),
          var(--tl-avatar-shift-y)
        );
        transition:
          transform 260ms ease-out,
          opacity 260ms ease,
          filter 260ms ease;
      }

      #theme-thoughtlite .tl-author-backdrop__grain {
        position: absolute;
        z-index: 2;
        inset: -8%;
        background-image:
          radial-gradient(
            color-mix(in srgb, var(--tl-warm-accent) 18%, transparent) 0.65px,
            transparent 0.75px
          ),
          url("data:image/svg+xml,%3Csvg xmlns='http:%2F%2Fwww.w3.org%2F2000%2Fsvg' width='180' height='180'%3E%3Cfilter id='tl-avatar-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23tl-avatar-noise)' opacity='.72'/%3E%3C/svg%3E");
        background-position:
          var(--tl-grain-shift-x) var(--tl-grain-shift-y),
          0 0;
        background-size:
          5px 5px,
          180px 180px;
        mix-blend-mode: multiply;
        opacity: 0.14;
        transform: translate(var(--tl-grain-shift-x), var(--tl-grain-shift-y));
        transition:
          transform 260ms ease-out,
          opacity 260ms ease;
      }

      #theme-thoughtlite
        .tl-author-backdrop.is-pointer-active
        .tl-author-backdrop__frame {
        border-color: color-mix(
          in srgb,
          var(--tl-warm-accent) 20%,
          transparent
        );
      }

      #theme-thoughtlite
        .tl-author-backdrop.is-pointer-active
        .tl-author-backdrop__grain {
        opacity: 0.2;
      }

      @keyframes tl-author-backdrop-in {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(0.5rem);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      #theme-thoughtlite .tl-nav-link {
        position: relative;
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        color: var(--tl-muted);
        font-size: 0.875rem;
        transition:
          color 180ms ease,
          background-color 180ms ease;
      }

      #theme-thoughtlite .tl-nav-link::after {
        position: absolute;
        right: 0.6rem;
        bottom: 0.25rem;
        left: 0.6rem;
        height: 2px;
        border-radius: 9999px;
        background: var(--tl-accent);
        content: '';
        opacity: 0;
        transform: scaleX(0.45);
        transition:
          opacity 180ms ease,
          transform 180ms ease;
      }

      #theme-thoughtlite .tl-nav-link:hover,
      #theme-thoughtlite .tl-nav-link[aria-current='page'],
      #theme-thoughtlite .tl-nav-link.is-active {
        color: var(--tl-text);
      }

      #theme-thoughtlite .tl-nav-link[aria-current='page']::after,
      #theme-thoughtlite .tl-nav-link.is-active::after {
        opacity: 1;
        transform: scaleX(1);
      }

      #theme-thoughtlite .tl-icon-btn {
        display: inline-flex;
        width: 2.75rem;
        height: 2.75rem;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: 9999px;
        color: var(--tl-muted);
        transition:
          background-color 180ms ease,
          color 180ms ease,
          border-color 180ms ease,
          transform 100ms ease;
      }

      #theme-thoughtlite .tl-icon-btn:hover {
        border-color: var(--tl-border);
        background: var(--tl-accent-soft);
        color: var(--tl-text);
      }

      #theme-thoughtlite .tl-icon-btn:active {
        transform: scale(0.96);
      }

      #theme-thoughtlite .tl-timeline {
        padding-bottom: 3rem;
      }

      #theme-thoughtlite .tl-timeline-day {
        margin-bottom: 3rem;
      }

      #theme-thoughtlite .tl-timeline-day-label {
        margin: 0 0 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--tl-border);
        color: var(--tl-muted);
        font-family: var(--tl-font-body);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      #theme-thoughtlite .tl-timeline-rail {
        position: relative;
        list-style: none;
        margin: 0;
        padding: 0 0 0 1.25rem;
      }

      #theme-thoughtlite .tl-timeline-rail::before {
        position: absolute;
        top: 0.25rem;
        bottom: 0.25rem;
        left: 0.35rem;
        width: 1px;
        background: var(--tl-border);
        content: '';
      }

      #theme-thoughtlite .tl-timeline-item {
        position: relative;
        margin-bottom: 0.75rem;
        padding: 0.85rem 1rem;
        border: 1px solid transparent;
        border-radius: var(--tl-radius);
        background: transparent;
        transition:
          background-color 180ms ease,
          border-color 180ms ease,
          box-shadow 180ms ease,
          transform 180ms ease;
      }

      #theme-thoughtlite .tl-timeline-item::before {
        position: absolute;
        top: 1.15rem;
        left: -1.55rem;
        width: 9px;
        height: 9px;
        border: 2px solid var(--tl-accent);
        border-radius: 9999px;
        background: var(--tl-bg);
        content: '';
        transition:
          background-color 180ms ease,
          transform 180ms ease;
      }

      #theme-thoughtlite .tl-timeline-item:hover {
        background: var(--tl-surface);
        border-color: var(--tl-border);
        box-shadow: var(--tl-shadow-hover);
        transform: translateX(2px);
      }

      #theme-thoughtlite .tl-timeline-item:hover::before {
        background: var(--tl-accent);
        transform: scale(1.08);
      }

      #theme-thoughtlite .tl-card {
        background: var(--tl-surface);
        border: 1px solid var(--tl-border);
        border-radius: var(--tl-radius);
      }

      #theme-thoughtlite .tl-card > :where(h2, h3) {
        letter-spacing: -0.01em;
      }

      #theme-thoughtlite .tl-latest-card {
        position: relative;
        overflow: hidden;
        margin-bottom: 2rem;
        padding: 1.35rem 1.5rem;
        border: 1px solid var(--tl-border);
        border-left: 3px solid var(--tl-accent);
        border-radius: 0 var(--tl-radius) var(--tl-radius) 0;
        background: var(--tl-surface);
        box-shadow: var(--tl-shadow-float);
        transition:
          box-shadow 180ms ease,
          transform 180ms ease;
      }

      #theme-thoughtlite .tl-latest-card:hover {
        box-shadow: var(--tl-shadow-hover);
        transform: translateY(-1px);
      }

      #theme-thoughtlite .tl-latest-card h3 {
        margin: 0 0 0.55rem;
        color: var(--tl-accent);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      #theme-thoughtlite #article-wrapper.tl-prose-wrap {
        max-width: 44rem;
        color: var(--tl-text);
        font-size: 1.05rem;
        line-height: 1.8;
      }

      #theme-thoughtlite #article-wrapper.tl-prose-wrap .notion {
        color: inherit;
      }

      #theme-thoughtlite #article-wrapper.tl-prose-wrap a {
        color: var(--tl-accent);
        text-decoration-thickness: 1px;
        text-underline-offset: 0.18em;
        transition:
          color 180ms ease,
          text-decoration-color 180ms ease;
      }

      #theme-thoughtlite #article-wrapper.tl-prose-wrap a:hover {
        color: var(--tl-text);
      }

      #theme-thoughtlite #article-wrapper.tl-prose-wrap h1,
      #theme-thoughtlite #article-wrapper.tl-prose-wrap h2,
      #theme-thoughtlite #article-wrapper.tl-prose-wrap h3 {
        color: var(--tl-text);
        font-family: var(--tl-font-display);
        letter-spacing: -0.02em;
        line-height: 1.25;
      }

      #theme-thoughtlite #article-wrapper.tl-prose-wrap blockquote {
        margin: 1.75rem 0;
        padding: 0.75rem 1rem;
        border-left: 3px solid var(--tl-accent);
        background: color-mix(in srgb, var(--tl-surface) 72%, transparent);
        color: var(--tl-muted);
      }

      #theme-thoughtlite .tl-article-hero {
        margin-bottom: 1.5rem;
      }

      #theme-thoughtlite .tl-article-title {
        margin: 0 0 0.75rem;
        color: var(--tl-text);
        font-family: var(--tl-font-display);
        font-size: clamp(1.75rem, 4vw, 2.25rem);
        font-weight: 700;
        letter-spacing: -0.025em;
        line-height: 1.18;
      }

      #theme-thoughtlite .tl-footer {
        border-top: 1px solid var(--tl-border);
        background: color-mix(in srgb, var(--tl-bg) 96%, var(--tl-surface));
        color: var(--tl-muted);
      }

      #theme-thoughtlite .tl-page-hero {
        margin-bottom: 2rem;
        padding: 0.25rem 0 1.25rem;
        border-bottom: 1px solid var(--tl-border);
        color: var(--tl-text);
        font-family: var(--tl-font-display);
      }

      #theme-thoughtlite .tl-page-hero p {
        max-width: 42rem;
        margin-top: 0.65rem;
        color: var(--tl-muted);
        font-family: var(--tl-font-body);
        font-size: 0.95rem;
        line-height: 1.65;
      }

      #theme-thoughtlite .tl-archive-item::before {
        position: absolute;
        top: 1.15rem;
        left: -4px;
        width: 7px;
        height: 7px;
        border: 2px solid var(--tl-accent);
        border-radius: 9999px;
        background: var(--tl-surface);
        content: '';
      }

      #theme-thoughtlite .tl-chip {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        gap: 0.35rem;
        margin: 0.25rem;
        padding: 0.4rem 0.85rem;
        border: 1px solid var(--tl-border);
        border-radius: 9999px;
        background: var(--tl-surface);
        color: var(--tl-text);
        font-size: 0.875rem;
        text-decoration: none;
        transition:
          border-color 180ms ease,
          color 180ms ease,
          background-color 180ms ease,
          transform 100ms ease;
      }

      #theme-thoughtlite .tl-chip:hover {
        border-color: var(--tl-accent);
        background: var(--tl-accent-soft);
        color: var(--tl-accent);
      }

      #theme-thoughtlite .tl-chip:active {
        transform: scale(0.98);
      }

      #theme-thoughtlite .tl-pager {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        justify-content: center;
        padding: 0.45rem 1rem;
        border: 1px solid var(--tl-border);
        border-radius: 9999px;
        background: var(--tl-surface);
        color: var(--tl-text);
        font-weight: 500;
        text-decoration: none;
        transition:
          border-color 180ms ease,
          color 180ms ease,
          transform 100ms ease;
      }

      #theme-thoughtlite .tl-pager:hover:not(.tl-pager--disabled) {
        border-color: var(--tl-accent);
        color: var(--tl-accent);
      }

      #theme-thoughtlite .tl-pager:active:not(.tl-pager--disabled) {
        transform: scale(0.98);
      }

      #theme-thoughtlite .tl-pager--disabled {
        visibility: hidden;
        pointer-events: none;
      }

      #theme-thoughtlite .no-scrollbar::-webkit-scrollbar {
        display: none;
      }

      #theme-thoughtlite .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      @media (min-width: 768px) {
        #theme-thoughtlite .tl-icon-btn[class~='md:hidden'] {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #theme-thoughtlite *,
        #theme-thoughtlite *::before,
        #theme-thoughtlite *::after {
          scroll-behavior: auto !important;
          transition-duration: 0.01ms !important;
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
        }

        #theme-thoughtlite .tl-latest-card:hover,
        #theme-thoughtlite .tl-timeline-item:hover,
        #theme-thoughtlite .tl-icon-btn:active,
        #theme-thoughtlite .tl-chip:active,
        #theme-thoughtlite .tl-pager:active:not(.tl-pager--disabled) {
          transform: none;
        }

        #theme-thoughtlite .tl-author-backdrop {
          opacity: 1;
          animation: none;
        }

        #theme-thoughtlite .tl-author-backdrop__avatar,
        #theme-thoughtlite .tl-author-backdrop__grain,
        #theme-thoughtlite .tl-author-backdrop__grid {
          transform: none;
          transition: none;
        }
      }

      @media (prefers-reduced-transparency: reduce) {
        #theme-thoughtlite .tl-header {
          background-color: var(--tl-bg);
          backdrop-filter: none;
        }

        #theme-thoughtlite .tl-author-backdrop__frame {
          background: var(--tl-bg);
        }
      }

      @media (prefers-contrast: more) {
        #theme-thoughtlite .tl-header,
        #theme-thoughtlite .tl-card,
        #theme-thoughtlite .tl-latest-card,
        #theme-thoughtlite .tl-chip,
        #theme-thoughtlite .tl-pager {
          border-color: var(--tl-text);
        }

        #theme-thoughtlite .tl-author-backdrop__frame {
          border-color: var(--tl-text);
        }
      }

      @media (max-width: 640px) {
        #theme-thoughtlite .tl-author-intro__line {
          gap: 0.35rem;
          font-size: 0.82rem;
        }

        #theme-thoughtlite .tl-author-intro__name {
          font-size: 1.3rem;
        }

        #theme-thoughtlite .tl-author-backdrop {
          top: 52vh;
          width: calc(100vw - 1rem);
        }

        #theme-thoughtlite .tl-author-backdrop__grid {
          inset: 4px;
          opacity: 0.24;
        }

        #theme-thoughtlite .tl-author-backdrop__avatar {
          width: 160px;
          opacity: 0.1;
        }

        #theme-thoughtlite .tl-author-backdrop__label {
          display: none;
        }

        #theme-thoughtlite #article-wrapper.tl-prose-wrap {
          font-size: 1rem;
          line-height: 1.78;
        }

        #theme-thoughtlite .tl-latest-card {
          margin-bottom: 1.75rem;
        }

        #theme-thoughtlite .tl-timeline-day {
          margin-bottom: 2rem;
        }
      }
    `}</style>
  )
}

export { Style }
