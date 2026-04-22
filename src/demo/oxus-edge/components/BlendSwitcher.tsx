
import { useState, useEffect, useCallback } from "react";
import { blends, groupedBlends, allBlendCSS } from "@/demo/oxus-edge/blends/registry";

const GROUPS = groupedBlends();
const ALL_IDS = blends.map((b) => b.id);

const THEMES = [
  { id: "default", label: "Warm" },
  { id: "deep", label: "Deep" },
  { id: "cool", label: "Cool" },
  { id: "rich", label: "Rich" },
  { id: "minimal", label: "Minimal" },
];

const ACCENTS = [
  { id: "default", label: "Ember", hex: "#c8643a" },
  { id: "copper", label: "Copper", hex: "#b88456" },
  { id: "gold", label: "Gold", hex: "#c89a4a" },
  { id: "ridge", label: "Ridge", hex: "#7a9aaa" },
  { id: "crimson", label: "Crimson", hex: "#a84040" },
  { id: "sage", label: "Sage", hex: "#7a9068" },
];

const RADIUS = [
  { id: "sharp", label: "Sharp" },
  { id: "default", label: "Normal" },
  { id: "rounded", label: "Rounded" },
  { id: "soft", label: "Soft" },
];

const MOTION = [
  { id: "instant", label: "Instant" },
  { id: "fast", label: "Fast" },
  { id: "default", label: "Normal" },
  { id: "slow", label: "Slow" },
];

const SHADOW = [
  { id: "none", label: "None" },
  { id: "soft", label: "Soft" },
  { id: "default", label: "Normal" },
  { id: "deep", label: "Deep" },
  { id: "dramatic", label: "Dramatic" },
];

const HERO_OPTIONS = [
  { id: "outdoor-lights", label: "Outdoor Lights" },
  { id: "zoomed-knife-cutting", label: "Zoomed Up Knife Cutting" },
  { id: "campfire-knife", label: "Campfire Knife" },
];

const DROP_STATES = [
  { id: "auto", label: "Auto" },
  { id: "live", label: "Live" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "none", label: "None" },
];

const DISPLAY_FONTS = [
  { id: "default", label: "Cinzel", css: 'var(--font-cinzel), "Georgia", serif' },
  { id: "georgia", label: "Georgia", css: '"Georgia", "Times New Roman", serif' },
  { id: "times", label: "Times", css: '"Times New Roman", serif' },
  { id: "sans", label: "Sans", css: '"Inter", system-ui, sans-serif' },
];

const BODY_FONTS = [
  { id: "default", label: "Jost", css: 'var(--font-jost), "Helvetica Neue", sans-serif' },
  { id: "system", label: "System", css: "system-ui, -apple-system, sans-serif" },
  { id: "helvetica", label: "Helvetica", css: '"Helvetica Neue", "Arial", sans-serif' },
  { id: "serif", label: "Serif", css: '"Georgia", serif' },
];

const CURSORS = [
  { id: "off", label: "Off" },
  { id: "spotlight", label: "Spotlight" },
  { id: "glow", label: "Glow" },
  { id: "torch", label: "Torch" },
];

const AMBIENTS = [
  { id: "off", label: "None" },
  { id: "embers", label: "Embers" },
  { id: "lights", label: "Lights" },
  { id: "dust", label: "Dust" },
  { id: "aurora", label: "Aurora" },
];

const REVEAL_STYLES = [
  { id: "fade-up", label: "Fade Up" },
  { id: "slide-left", label: "Slide" },
  { id: "blur", label: "Blur In" },
  { id: "scale", label: "Scale" },
  { id: "clip", label: "Clip" },
];

const GRAIN_ANIMS = [
  { id: "static", label: "Static" },
  { id: "drift", label: "Drift" },
  { id: "flicker", label: "Flicker" },
];

// Home page section background colors — CSS vars live in globals.css
// and are used site-wide by `bg-depth-*` utilities.
const DEPTH_COLORS = [
  { key: "mocha",     label: "Our Knives",    cssVar: "--color-depth-mocha",     hex: "#352617" },
  { key: "roast",     label: "Drop Section",  cssVar: "--color-depth-roast",     hex: "#2b1f13" },
  { key: "espresso",  label: "Bestsellers",   cssVar: "--color-depth-espresso",  hex: "#22190f" },
  { key: "americano", label: "Instagram",     cssVar: "--color-depth-americano", hex: "#1a130b" },
  { key: "noir",      label: "Testimonials",  cssVar: "--color-depth-noir",      hex: "#160f07" },
  { key: "grounds",   label: "Newsletter",    cssVar: "--color-depth-grounds",   hex: "#130e08" },
] as const;

// Site-wide surface colors — body bg, card bg, elevated surfaces, navbar/footer backdrops.
const SURFACE_COLORS = [
  { key: "bgDeep",     label: "Page",     cssVar: "--color-bg-deep",     hex: "#1a1410" },
  { key: "bgDark",     label: "Dark",     cssVar: "--color-bg-dark",     hex: "#211a15" },
  { key: "bgMedium",   label: "Medium",   cssVar: "--color-bg-medium",   hex: "#2a221b" },
  { key: "bgCard",     label: "Card",     cssVar: "--color-bg-card",     hex: "#322921" },
  { key: "bgElevated", label: "Elevated", cssVar: "--color-bg-elevated", hex: "#453a30" },
] as const;

// Component-level colors — accent + text that stay consistent across every section.
const COMPONENT_COLORS = [
  { key: "ember",          label: "Brand Accent",  cssVar: "--color-ember",          hex: "#c8643a" },
  { key: "emberLight",     label: "Accent Light",  cssVar: "--color-ember-light",    hex: "#e08a5e" },
  { key: "textPrimary",    label: "Text Primary",  cssVar: "--color-text-primary",   hex: "#e8dfd0" },
  { key: "textSecondary",  label: "Text Secondary", cssVar: "--color-text-secondary", hex: "#a69882" },
  { key: "textMuted",      label: "Text Muted",    cssVar: "--color-text-muted",     hex: "#a09484" },
] as const;

type SectionKey = "modes" | "adjust" | "theme" | "layout" | "app" | "fx" | "type" | "presets" | "debug";

interface Config {
  mode: string;
  theme: string;
  accent: string;
  radius: string;
  motion: string;
  shadow: string;
  hero: string;
  dropState: string;
  displayFont: string;
  bodyFont: string;
  intensity: number;
  vignette: number;
  grain: number;
  animSpeed: number;
  blendHeight: number;
  sectionPad: number;
  uiScale: number;
  contentWidth: number;
  heroBrightness: number;
  darkOverlay: number;
  imgSat: number;
  imgContrast: number;
  cardOpacity: number;
  navbarBlur: number;
  navbarSize: number;
  navbarTextSize: number;
  letterSpacing: number;
  vignetteOn: boolean;
  showBounds: boolean;
  showImgNames: boolean;
  revealAnim: boolean;
  smoothScroll: boolean;
  glow: boolean;
  cursor: string;
  ambient: string;
  revealStyle: string;
  grainAnim: string;
  scrollProgress: boolean;
  emberPulse: boolean;
  hero2Scale: number;
  hero2X: number;
  hero2Y: number;
  depthColors: Record<string, string>;
  surfaceColors: Record<string, string>;
  componentColors: Record<string, string>;
}

const DEFAULTS: Config = {
  mode: "side-engulf",
  theme: "default",
  accent: "default",
  radius: "default",
  motion: "default",
  shadow: "default",
  hero: "outdoor-lights",
  dropState: "upcoming",
  displayFont: "default",
  bodyFont: "system",
  intensity: 100,
  vignette: 100,
  grain: 100,
  animSpeed: 100,
  blendHeight: 100,
  sectionPad: 100,
  uiScale: 100,
  contentWidth: 100,
  heroBrightness: 100,
  darkOverlay: 0,
  imgSat: 105,
  imgContrast: 100,
  cardOpacity: 100,
  navbarBlur: 8,
  navbarSize: 120,
  navbarTextSize: 135,
  letterSpacing: 100,
  vignetteOn: true,
  showBounds: false,
  showImgNames: false,
  revealAnim: true,
  smoothScroll: true,
  glow: false,
  cursor: "off",
  ambient: "off",
  revealStyle: "fade-up",
  grainAnim: "static",
  scrollProgress: true,
  emberPulse: false,
  hero2Scale: 100,
  hero2X: 50,
  hero2Y: 50,
  depthColors: {
    mocha:     "#352617",
    roast:     "#2b1f13",
    espresso:  "#22190f",
    americano: "#1a130b",
    noir:      "#160f07",
    grounds:   "#130e08",
  },
  surfaceColors: {
    bgDeep:     "#1a1410",
    bgDark:     "#211a15",
    bgMedium:   "#2a221b",
    bgCard:     "#322921",
    bgElevated: "#453a30",
  },
  componentColors: {
    ember:         "#c8643a",
    emberLight:    "#e08a5e",
    textPrimary:   "#e8dfd0",
    textSecondary: "#a69882",
    textMuted:     "#a09484",
  },
};

const CONFIG_KEY = "oxus-blend-config";
const PRESETS_KEY = "oxus-blend-presets";

interface SliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

function Slider({ label, value, onChange, min = 0, max = 100, step = 1, unit = "%" }: SliderProps) {
  return (
    <label className="flex flex-col gap-1 py-1">
      <div className="flex items-center justify-between">
        <span className="text-[0.62rem] text-text-secondary">{label}</span>
        <span className="text-[0.6rem] text-text-muted tabular-nums font-mono">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="blend-slider w-full h-1 bg-bg-elevated rounded-full appearance-none cursor-pointer accent-ember"
      />
    </label>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? "" : "-rotate-90"}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}

function SectionHeader({ title, open, onToggle, right }: { title: string; open: boolean; onToggle: () => void; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5 border-b border-border/20">
      <button onClick={onToggle} className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer">
        <ChevronIcon open={open} />
        <span className="text-[0.55rem] font-display tracking-[0.22em] uppercase">{title}</span>
      </button>
      {right}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-[28px] h-[14px] rounded-full relative transition-colors duration-200 shrink-0 cursor-pointer ${checked ? "bg-ember" : "bg-bg-elevated"}`}
      aria-pressed={checked}
    >
      <span className={`absolute top-[2px] w-[10px] h-[10px] rounded-full bg-white transition-transform duration-200 ${checked ? "left-[16px]" : "left-[2px]"}`} />
    </button>
  );
}

function PresetGrid<T extends { id: string; label: string }>({
  options,
  value,
  onChange,
  cols = 4,
}: {
  options: T[];
  value: string;
  onChange: (id: string) => void;
  cols?: number;
}) {
  return (
    <div className={`grid gap-1 mb-2`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`text-[0.58rem] font-medium py-1.5 px-1 rounded-[2px] transition-all cursor-pointer ${
            value === o.id ? "bg-ember text-white" : "bg-bg-elevated/50 text-text-secondary hover:bg-bg-elevated"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function loadConfig(): Config {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULTS,
        ...parsed,
        depthColors: { ...DEFAULTS.depthColors, ...(parsed.depthColors ?? {}) },
        surfaceColors: { ...DEFAULTS.surfaceColors, ...(parsed.surfaceColors ?? {}) },
        componentColors: { ...DEFAULTS.componentColors, ...(parsed.componentColors ?? {}) },
      };
    }
  } catch {}
  return DEFAULTS;
}

// Tailwind v4's `@theme inline` bakes literal colors into utility classes,
// so runtime CSS-var overrides don't reach `.bg-depth-*` / `.text-ember` etc.
// We emit a stylesheet that overrides those utilities at the same specificity
// but later in cascade (body beats head) to win.
function buildColorOverrideCSS(config: Config): string {
  const lines: string[] = [];
  DEPTH_COLORS.forEach((c) => {
    const v = config.depthColors?.[c.key];
    if (v) lines.push(`.bg-depth-${c.key}{background-color:${v}}`);
  });
  const surfaceClassMap: Record<string, string> = {
    bgDeep: "bg-bg-deep",
    bgDark: "bg-bg-dark",
    bgMedium: "bg-bg-medium",
    bgElevated: "bg-bg-elevated",
    // bgCard: globals.css already overrides .bg-bg-card via color-mix(var(--color-bg-card))
  };
  SURFACE_COLORS.forEach((c) => {
    const cls = surfaceClassMap[c.key];
    const v = config.surfaceColors?.[c.key];
    if (cls && v) lines.push(`.${cls}{background-color:${v}}`);
  });
  const cc = config.componentColors;
  if (cc?.ember) {
    lines.push(`.bg-ember{background-color:${cc.ember}}`);
    lines.push(`.text-ember{color:${cc.ember}}`);
    lines.push(`.border-ember{border-color:${cc.ember}}`);
    lines.push(`.fill-ember{fill:${cc.ember}}`);
    lines.push(`.stroke-ember{stroke:${cc.ember}}`);
    lines.push(`.accent-ember{accent-color:${cc.ember}}`);
  }
  if (cc?.emberLight) {
    lines.push(`.bg-ember-light{background-color:${cc.emberLight}}`);
    lines.push(`.text-ember-light{color:${cc.emberLight}}`);
    lines.push(`.hover\\:bg-ember-light:hover{background-color:${cc.emberLight}}`);
  }
  if (cc?.textPrimary) lines.push(`.text-text-primary{color:${cc.textPrimary}}`);
  if (cc?.textSecondary) lines.push(`.text-text-secondary{color:${cc.textSecondary}}`);
  if (cc?.textMuted) lines.push(`.text-text-muted{color:${cc.textMuted}}`);
  return lines.join("\n");
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);

  const pickFromScreen = async () => {
    const Ctor = (window as unknown as { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
    if (!Ctor) {
      alert("Your browser doesn't support the screen eyedropper. Try Chrome, Edge, or Opera.");
      return;
    }
    try {
      const { sRGBHex } = await new Ctor().open();
      onChange(sRGBHex);
    } catch { /* user canceled — no-op */ }
  };

  return (
    <div className="flex items-center gap-1.5 py-0.5">
      <span className="text-[0.62rem] text-text-secondary flex-1 truncate">{label}</span>
      <label
        className="relative w-5 h-5 rounded-[2px] border border-border/50 overflow-hidden cursor-pointer shrink-0"
        style={{ background: value }}
        title="Open color picker"
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
      <input
        type="text"
        value={local}
        onChange={(e) => {
          const v = e.target.value;
          setLocal(v);
          if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
        }}
        className="w-[68px] text-[0.58rem] font-mono bg-bg-elevated/50 px-1.5 py-0.5 rounded-[2px] border border-border/40 text-text-secondary focus:outline-none focus:border-ember/50"
        spellCheck={false}
        aria-label={`${label} hex value`}
      />
      <button
        onClick={pickFromScreen}
        title="Match a color from anywhere on screen"
        aria-label="Pick color from screen"
        className="w-5 h-5 rounded-[2px] text-text-muted hover:text-ember hover:bg-bg-elevated transition-colors cursor-pointer flex items-center justify-center shrink-0"
      >
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22l1-1h3l9-9" />
          <path d="M3 21v-3l9-9" />
          <path d="M15 6l3.4-3.4a2.1 2.1 0 013 3L18 9l.4.4a2.1 2.1 0 01-3 3l-3.8-3.8a2.1 2.1 0 013-3l.4.4z" />
        </svg>
      </button>
    </div>
  );
}

export default function BlendSwitcher() {
  const [config, setConfig] = useState<Config>(DEFAULTS);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const [sections, setSections] = useState<Record<SectionKey, boolean>>({
    modes: true,
    adjust: false,
    theme: false,
    layout: false,
    app: false,
    fx: false,
    type: false,
    presets: false,
    debug: false,
  });
  const [presets, setPresets] = useState<Record<string, Config>>({});

  // Load persisted config + presets on mount
  useEffect(() => {
    setConfig(loadConfig());
    try {
      const raw = localStorage.getItem(PRESETS_KEY);
      if (raw) setPresets(JSON.parse(raw));
    } catch {}

    // URL params override persisted
    const params = new URLSearchParams(window.location.search);
    if (params.size > 0) {
      const next: Partial<Config> = {};
      params.forEach((v, k) => {
        if (k in DEFAULTS) {
          const def = DEFAULTS[k as keyof Config];
          if (typeof def === "number") (next as any)[k] = Number(v);
          else if (typeof def === "boolean") (next as any)[k] = v === "true";
          else if (typeof def === "string") (next as any)[k] = v;
        }
      });
      setConfig((c) => ({ ...c, ...next }));
    }
    setMounted(true);
  }, []);

  const update = useCallback(<K extends keyof Config>(key: K, value: Config[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem(CONFIG_KEY, JSON.stringify(config)); } catch {}
  }, [config, mounted]);

  // Apply all attributes & CSS vars to the demo root element
  useEffect(() => {
    if (!mounted) return;
    const root = (document.querySelector(".oxus-edge") as HTMLElement | null) ?? document.documentElement;
    const displayFont = DISPLAY_FONTS.find((f) => f.id === config.displayFont)?.css ?? DISPLAY_FONTS[0].css;
    const bodyFont = BODY_FONTS.find((f) => f.id === config.bodyFont)?.css ?? BODY_FONTS[0].css;

    root.setAttribute("data-blend", config.mode);
    root.setAttribute("data-theme", config.theme);
    root.setAttribute("data-accent", config.accent);
    root.setAttribute("data-radius", config.radius);
    root.setAttribute("data-motion", config.motion);
    root.setAttribute("data-shadow", config.shadow);
    root.setAttribute("data-hero", config.hero);
    root.setAttribute("data-drop-state", config.dropState);
    root.setAttribute("data-vignette", config.vignetteOn ? "on" : "off");
    root.setAttribute("data-debug-bounds", config.showBounds ? "on" : "off");
    root.setAttribute("data-debug-img-names", config.showImgNames ? "on" : "off");
    root.setAttribute("data-no-reveal", config.revealAnim ? "off" : "on");
    root.setAttribute("data-glow", config.glow ? "on" : "off");
    root.setAttribute("data-cursor", config.cursor);
    root.setAttribute("data-ambient", config.ambient);
    root.setAttribute("data-reveal-style", config.revealStyle);
    root.setAttribute("data-grain-anim", config.grainAnim);
    root.setAttribute("data-scroll-progress", config.scrollProgress ? "on" : "off");
    root.setAttribute("data-ember-pulse", config.emberPulse ? "on" : "off");
    root.style.setProperty("--hero2-scale", String(config.hero2Scale / 100));
    root.style.setProperty("--hero2-x", `${config.hero2X}%`);
    root.style.setProperty("--hero2-y", `${config.hero2Y}%`);

    root.style.setProperty("--blend-intensity", String(config.intensity / 100));
    root.style.setProperty("--vignette-strength", String(config.vignette / 100));
    root.style.setProperty("--grain-mult", String(config.grain / 100));
    root.style.setProperty("--anim-speed-mult", String(100 / Math.max(1, config.animSpeed)));
    root.style.setProperty("--blend-height-mult", String(config.blendHeight / 100));
    root.style.setProperty("--section-pad-mult", String(config.sectionPad / 100));
    root.style.setProperty("--ui-scale", String(config.uiScale / 100));
    root.style.setProperty("--content-max-mult", String(config.contentWidth / 100));
    root.style.setProperty("--hero-brightness", String(config.heroBrightness / 100));
    root.style.setProperty("--dark-overlay", String(config.darkOverlay / 100));
    root.style.setProperty("--img-saturation", String(config.imgSat / 100));
    root.style.setProperty("--img-contrast", String(config.imgContrast / 100));
    root.style.setProperty("--card-opacity", String(config.cardOpacity / 100));
    root.style.setProperty("--navbar-blur", `${(config.navbarBlur / 100) * 30}px`);
    root.style.setProperty("--navbar-scale", String(config.navbarSize / 100));
    root.style.setProperty("--navbar-text-scale", String(config.navbarTextSize / 100));
    root.style.setProperty("--letter-spacing-mult", String(config.letterSpacing / 100));
    root.style.setProperty("--font-display-override", displayFont);
    root.style.setProperty("--font-body-override", bodyFont);
    root.style.scrollBehavior = config.smoothScroll ? "smooth" : "auto";

    // Home page section colors — inline styles beat the data-theme stylesheet rules.
    DEPTH_COLORS.forEach(({ key, cssVar }) => {
      const v = config.depthColors?.[key];
      if (v) root.style.setProperty(cssVar, v);
    });
    // Site-wide base surfaces (page background, cards, elevated layers).
    SURFACE_COLORS.forEach(({ key, cssVar }) => {
      const v = config.surfaceColors?.[key];
      if (v) root.style.setProperty(cssVar, v);
    });
    // Component colors — accent + text that stay consistent across sections.
    COMPONENT_COLORS.forEach(({ key, cssVar }) => {
      const v = config.componentColors?.[key];
      if (v) root.style.setProperty(cssVar, v);
    });
    // Keep the ember glow in sync with a custom ember color.
    const ember = config.componentColors?.ember;
    if (ember && /^#[0-9a-fA-F]{6}$/.test(ember)) {
      const r = parseInt(ember.slice(1, 3), 16);
      const g = parseInt(ember.slice(3, 5), 16);
      const b = parseInt(ember.slice(5, 7), 16);
      root.style.setProperty("--color-ember-glow", `rgba(${r}, ${g}, ${b}, 0.12)`);
    }
  }, [config, mounted]);

  // Debug: show hovered image filename in a cursor-following tooltip.
  useEffect(() => {
    if (!mounted || !config.showImgNames) return;

    const tip = document.createElement("div");
    tip.setAttribute("data-img-name-tip", "");
    tip.style.cssText =
      "position:fixed;z-index:2147483647;pointer-events:none;background:rgba(20,16,10,0.95);color:#e8dfd0;font:500 10px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;padding:4px 8px;border-radius:3px;border:1px solid rgba(200,100,58,0.5);box-shadow:0 4px 12px rgba(0,0,0,0.5);max-width:360px;word-break:break-all;display:none;";
    document.body.appendChild(tip);

    const resolveName = (img: HTMLImageElement): string => {
      const src = img.currentSrc || img.src || "";
      try {
        const u = new URL(src, window.location.href);
        if (u.pathname === "/_next/image") {
          const urlParam = u.searchParams.get("url");
          if (urlParam) return decodeURIComponent(urlParam);
        }
        return decodeURIComponent(u.pathname);
      } catch {
        return src;
      }
    };

    let current: HTMLImageElement | null = null;
    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const img = target?.closest?.("img") as HTMLImageElement | null;
      if (img) {
        if (img !== current) {
          current = img;
          tip.textContent = resolveName(img);
        }
        tip.style.display = "block";
        const offset = 14;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const rect = tip.getBoundingClientRect();
        let x = e.clientX + offset;
        let y = e.clientY + offset;
        if (x + rect.width > vw - 4) x = e.clientX - offset - rect.width;
        if (y + rect.height > vh - 4) y = e.clientY - offset - rect.height;
        tip.style.left = `${Math.max(4, x)}px`;
        tip.style.top = `${Math.max(4, y)}px`;
      } else if (current) {
        current = null;
        tip.style.display = "none";
      }
    };
    const onLeave = () => {
      current = null;
      tip.style.display = "none";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      tip.remove();
    };
  }, [mounted, config.showImgNames]);

  const cycle = useCallback(
    (dir: 1 | -1) => {
      const idx = ALL_IDS.indexOf(config.mode);
      const next = (idx + dir + ALL_IDS.length) % ALL_IDS.length;
      update("mode", ALL_IDS[next]);
    },
    [config.mode, update],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "[") { e.preventDefault(); cycle(-1); }
      if (e.key === "]") { e.preventDefault(); cycle(1); }
      if (e.key === "\\") { e.preventDefault(); update("vignetteOn", !config.vignetteOn); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cycle, config.vignetteOn, update]);

  const toggle = (key: SectionKey) => setSections((p) => ({ ...p, [key]: !p[key] }));
  const resetAll = () => setConfig(DEFAULTS);

  const savePreset = () => {
    const name = prompt("Preset name?");
    if (!name) return;
    const next = { ...presets, [name]: config };
    setPresets(next);
    try { localStorage.setItem(PRESETS_KEY, JSON.stringify(next)); } catch {}
  };
  const loadPreset = (name: string) => {
    const p = presets[name];
    if (p) setConfig({
      ...DEFAULTS,
      ...p,
      depthColors: { ...DEFAULTS.depthColors, ...(p.depthColors ?? {}) },
      surfaceColors: { ...DEFAULTS.surfaceColors, ...(p.surfaceColors ?? {}) },
      componentColors: { ...DEFAULTS.componentColors, ...(p.componentColors ?? {}) },
    });
  };
  const deletePreset = (name: string) => {
    const next = { ...presets };
    delete next[name];
    setPresets(next);
    try { localStorage.setItem(PRESETS_KEY, JSON.stringify(next)); } catch {}
  };
  const copyConfigURL = () => {
    const params = new URLSearchParams();
    Object.entries(config).forEach(([k, v]) => {
      if (v !== null && typeof v === "object") return; // skip complex values like depthColors
      params.set(k, String(v));
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url).catch(() => {});
  };

  return (
    <>
      {/* These styles must stay mounted regardless of panel state — allBlendCSS
          provides every blend mode's CSS (engulf, tide, etc.), and the color
          overrides keep custom theme colors applied. Collapsing the studio
          would otherwise strip the visual effects from the page. */}
      <style dangerouslySetInnerHTML={{ __html: allBlendCSS }} />
      <style dangerouslySetInnerHTML={{ __html: buildColorOverrideCSS(config) }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        [data-no-reveal="on"] .reveal {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      `,
        }}
      />

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-[100] bg-bg-card/90 backdrop-blur-sm border border-border/60 rounded-[3px] px-3.5 py-2 shadow-lg text-text-muted hover:text-ember text-[0.6rem] font-display tracking-[0.18em] uppercase transition-colors cursor-pointer"
        >
          Studio
        </button>
      ) : (
        <>
          <style
            dangerouslySetInnerHTML={{
              __html: `
        .blend-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px; height: 12px;
          background: var(--color-ember);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 4px rgba(200,100,58,0.4);
        }
        .blend-slider::-moz-range-thumb {
          width: 12px; height: 12px;
          background: var(--color-ember);
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `,
            }}
          />
          <div className="fixed bottom-4 right-4 z-[100] font-body w-[290px] bg-bg-deep/95 backdrop-blur-md border border-border/40 rounded-[3px] shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 pt-3 pb-1.5 border-b border-border/30">
          <span className="text-text-muted text-[0.55rem] font-display tracking-[0.22em] uppercase">
            Blend Studio
          </span>
          <div className="flex items-center gap-1">
            <button onClick={copyConfigURL} title="Copy sharable URL" className="text-text-muted/60 hover:text-ember text-[0.55rem] font-display tracking-[0.15em] uppercase transition-colors cursor-pointer px-1.5 py-0.5 rounded-[2px] hover:bg-bg-elevated">
              Share
            </button>
            <button onClick={resetAll} title="Reset defaults" className="text-text-muted/60 hover:text-ember text-[0.55rem] font-display tracking-[0.15em] uppercase transition-colors cursor-pointer px-1.5 py-0.5 rounded-[2px] hover:bg-bg-elevated">
              Reset
            </button>
            <button onClick={() => setOpen(false)} className="text-text-muted/60 hover:text-text-primary text-[0.7rem] leading-none w-5 h-5 flex items-center justify-center rounded-[2px] hover:bg-bg-elevated transition-colors cursor-pointer" aria-label="Collapse">
              &times;
            </button>
          </div>
        </div>

        <div className="max-h-[75vh] overflow-y-auto">
          {/* ── MODES ── */}
          <SectionHeader title="Modes" open={sections.modes} onToggle={() => toggle("modes")} />
          {sections.modes && (
            <div className="px-1.5 py-1.5">
              {GROUPS.map((group) => (
                <div key={group.title} className="mb-1">
                  <p className="text-text-muted/50 text-[0.5rem] font-display tracking-[0.2em] uppercase px-2 pt-1.5 pb-1">{group.title}</p>
                  <div className="flex flex-col gap-px">
                    {group.modes.map((m) => {
                      const active = config.mode === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => update("mode", m.id)}
                          className={`flex items-center gap-2.5 text-left px-2.5 py-[6px] rounded-[2px] transition-all duration-150 text-[0.7rem] leading-tight cursor-pointer ${active ? "bg-ember/15 text-ember" : "text-text-secondary hover:bg-bg-elevated/60 hover:text-text-primary"}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? "bg-ember" : "bg-border"}`} />
                          <span className="flex-1">
                            <span className={`font-medium ${active ? "text-ember" : ""}`}>{m.label}</span>
                            <span className="text-[0.58rem] opacity-50 ml-1.5">{m.description}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ADJUST ── */}
          <SectionHeader title="Adjust" open={sections.adjust} onToggle={() => toggle("adjust")} />
          {sections.adjust && (
            <div className="px-3 py-2">
              <Slider label="Blend Intensity" value={config.intensity} onChange={(v) => update("intensity", v)} />
              <Slider label="Blend Height" value={config.blendHeight} onChange={(v) => update("blendHeight", v)} min={30} max={250} />
              <Slider label="Vignette Strength" value={config.vignette} onChange={(v) => update("vignette", v)} />
              <Slider label="Grain Texture" value={config.grain} onChange={(v) => update("grain", v)} max={400} />
              <Slider label="Animation Speed" value={config.animSpeed} onChange={(v) => update("animSpeed", v)} min={25} max={300} />
              <Slider label="Hero Brightness" value={config.heroBrightness} onChange={(v) => update("heroBrightness", v)} min={20} max={180} />
              <Slider label="Dark Overlay" value={config.darkOverlay} onChange={(v) => update("darkOverlay", v)} max={60} />
            </div>
          )}

          {/* ── THEME & COLOR ── */}
          <SectionHeader title="Theme & Color" open={sections.theme} onToggle={() => toggle("theme")} />
          {sections.theme && (
            <div className="px-3 py-2">
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5">Depth Palette</p>
              <PresetGrid options={THEMES} value={config.theme} onChange={(v) => update("theme", v)} cols={5} />
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5 mt-2">Accent Color</p>
              <div className="grid grid-cols-6 gap-1">
                {ACCENTS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => update("accent", a.id)}
                    title={a.label}
                    className={`aspect-square rounded-[2px] transition-all cursor-pointer border ${config.accent === a.id ? "border-white/50 scale-110" : "border-transparent hover:border-white/20"}`}
                    style={{ background: a.hex }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 mb-1">
                <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display">Section Colors</p>
                <button
                  onClick={() => update("depthColors", DEFAULTS.depthColors)}
                  title="Restore default section colors"
                  className="text-text-muted/60 hover:text-ember text-[0.5rem] font-display tracking-[0.15em] uppercase transition-colors cursor-pointer px-1 py-0.5 rounded-[2px] hover:bg-bg-elevated"
                >
                  Reset
                </button>
              </div>
              <div className="flex flex-col">
                {DEPTH_COLORS.map((c) => (
                  <ColorRow
                    key={c.key}
                    label={c.label}
                    value={config.depthColors?.[c.key] ?? c.hex}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        depthColors: { ...prev.depthColors, [c.key]: v },
                      }))
                    }
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 mb-1">
                <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display">Base Surfaces</p>
                <button
                  onClick={() => update("surfaceColors", DEFAULTS.surfaceColors)}
                  title="Restore default surface colors"
                  className="text-text-muted/60 hover:text-ember text-[0.5rem] font-display tracking-[0.15em] uppercase transition-colors cursor-pointer px-1 py-0.5 rounded-[2px] hover:bg-bg-elevated"
                >
                  Reset
                </button>
              </div>
              <div className="flex flex-col">
                {SURFACE_COLORS.map((c) => (
                  <ColorRow
                    key={c.key}
                    label={c.label}
                    value={config.surfaceColors?.[c.key] ?? c.hex}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        surfaceColors: { ...prev.surfaceColors, [c.key]: v },
                      }))
                    }
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 mb-1">
                <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display">Components</p>
                <button
                  onClick={() => update("componentColors", DEFAULTS.componentColors)}
                  title="Restore default accent + text colors"
                  className="text-text-muted/60 hover:text-ember text-[0.5rem] font-display tracking-[0.15em] uppercase transition-colors cursor-pointer px-1 py-0.5 rounded-[2px] hover:bg-bg-elevated"
                >
                  Reset
                </button>
              </div>
              <div className="flex flex-col">
                {COMPONENT_COLORS.map((c) => (
                  <ColorRow
                    key={c.key}
                    label={c.label}
                    value={config.componentColors?.[c.key] ?? c.hex}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        componentColors: { ...prev.componentColors, [c.key]: v },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── LAYOUT ── */}
          <SectionHeader title="Layout" open={sections.layout} onToggle={() => toggle("layout")} />
          {sections.layout && (
            <div className="px-3 py-2">
              <Slider label="Section Padding" value={config.sectionPad} onChange={(v) => update("sectionPad", v)} min={25} max={200} />
              <Slider label="UI Scale" value={config.uiScale} onChange={(v) => update("uiScale", v)} min={75} max={125} />
              <Slider label="Content Width" value={config.contentWidth} onChange={(v) => update("contentWidth", v)} min={60} max={130} />
            </div>
          )}

          {/* ── APP (WHOLE SITE) ── */}
          <SectionHeader title="App-wide Style" open={sections.app} onToggle={() => toggle("app")} />
          {sections.app && (
            <div className="px-3 py-2">
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5">Drop State</p>
              <PresetGrid options={DROP_STATES} value={config.dropState} onChange={(v) => update("dropState", v)} cols={5} />
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5 mt-2">Hero Image</p>
              <PresetGrid options={HERO_OPTIONS} value={config.hero} onChange={(v) => update("hero", v)} cols={3} />
              {config.hero === "zoomed-knife-cutting" && (
                <div className="mt-1 mb-2 p-2 rounded-[2px] bg-bg-elevated/30 border border-border/20">
                  <p className="text-[0.5rem] text-text-muted/50 uppercase tracking-[0.18em] font-display mb-1">Zoomed Knife Framing</p>
                  <Slider label="Zoom" value={config.hero2Scale} onChange={(v) => update("hero2Scale", v)} min={80} max={180} />
                  <Slider label="Focus X" value={config.hero2X} onChange={(v) => update("hero2X", v)} min={0} max={100} />
                  <Slider label="Focus Y" value={config.hero2Y} onChange={(v) => update("hero2Y", v)} min={0} max={100} />
                </div>
              )}
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5 mt-2">Border Radius</p>
              <PresetGrid options={RADIUS} value={config.radius} onChange={(v) => update("radius", v)} cols={4} />
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5 mt-2">Motion Speed</p>
              <PresetGrid options={MOTION} value={config.motion} onChange={(v) => update("motion", v)} cols={4} />
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5 mt-2">Shadow Depth</p>
              <PresetGrid options={SHADOW} value={config.shadow} onChange={(v) => update("shadow", v)} cols={5} />
              <Slider label="Image Saturation" value={config.imgSat} onChange={(v) => update("imgSat", v)} min={0} max={200} />
              <Slider label="Image Contrast" value={config.imgContrast} onChange={(v) => update("imgContrast", v)} min={50} max={150} />
              <Slider label="Card Surface" value={config.cardOpacity} onChange={(v) => update("cardOpacity", v)} min={40} max={150} />
              <Slider label="Navbar Blur" value={config.navbarBlur} onChange={(v) => update("navbarBlur", v)} min={0} max={100} />
              <Slider label="Navbar Size" value={config.navbarSize} onChange={(v) => update("navbarSize", v)} min={70} max={160} />
              <Slider label="Navbar Text Size" value={config.navbarTextSize} onChange={(v) => update("navbarTextSize", v)} min={70} max={170} />
              <label className="flex items-center justify-between text-[0.65rem] text-text-secondary cursor-pointer pt-2">
                <span>Glow accents</span>
                <Toggle checked={config.glow} onChange={(v) => update("glow", v)} />
              </label>
            </div>
          )}

          {/* ── MOTION & FX ── */}
          <SectionHeader title="Motion & FX" open={sections.fx} onToggle={() => toggle("fx")} />
          {sections.fx && (
            <div className="px-3 py-2">
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5">Cursor Effect</p>
              <PresetGrid options={CURSORS} value={config.cursor} onChange={(v) => update("cursor", v)} cols={4} />
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5 mt-2">Ambient Atmosphere</p>
              <PresetGrid options={AMBIENTS} value={config.ambient} onChange={(v) => update("ambient", v)} cols={5} />
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5 mt-2">Reveal Style</p>
              <PresetGrid options={REVEAL_STYLES} value={config.revealStyle} onChange={(v) => update("revealStyle", v)} cols={5} />
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5 mt-2">Grain Animation</p>
              <PresetGrid options={GRAIN_ANIMS} value={config.grainAnim} onChange={(v) => update("grainAnim", v)} cols={3} />
              <label className="flex items-center justify-between text-[0.65rem] text-text-secondary cursor-pointer pt-2">
                <span>Scroll progress bar</span>
                <Toggle checked={config.scrollProgress} onChange={(v) => update("scrollProgress", v)} />
              </label>
              <label className="flex items-center justify-between text-[0.65rem] text-text-secondary cursor-pointer pt-1.5">
                <span>Ember pulse CTAs</span>
                <Toggle checked={config.emberPulse} onChange={(v) => update("emberPulse", v)} />
              </label>
            </div>
          )}

          {/* ── TYPOGRAPHY ── */}
          <SectionHeader title="Typography" open={sections.type} onToggle={() => toggle("type")} />
          {sections.type && (
            <div className="px-3 py-2">
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5">Heading Font</p>
              <PresetGrid options={DISPLAY_FONTS} value={config.displayFont} onChange={(v) => update("displayFont", v)} cols={4} />
              <p className="text-[0.55rem] text-text-muted/60 uppercase tracking-[0.15em] font-display mb-1.5 mt-2">Body Font</p>
              <PresetGrid options={BODY_FONTS} value={config.bodyFont} onChange={(v) => update("bodyFont", v)} cols={4} />
              <Slider label="Letter Spacing" value={config.letterSpacing} onChange={(v) => update("letterSpacing", v)} min={70} max={150} />
            </div>
          )}

          {/* ── PRESETS ── */}
          <SectionHeader
            title="Presets"
            open={sections.presets}
            onToggle={() => toggle("presets")}
            right={sections.presets && (
              <button onClick={savePreset} className="text-[0.55rem] text-ember font-display tracking-[0.15em] uppercase hover:underline cursor-pointer">+ Save</button>
            )}
          />
          {sections.presets && (
            <div className="px-3 py-2">
              {Object.keys(presets).length === 0 ? (
                <p className="text-[0.6rem] text-text-muted/60 italic">No saved presets. Tweak settings then click "+ Save".</p>
              ) : (
                <div className="flex flex-col gap-1">
                  {Object.keys(presets).map((name) => (
                    <div key={name} className="flex items-center gap-1">
                      <button onClick={() => loadPreset(name)} className="flex-1 text-left text-[0.65rem] px-2 py-1.5 rounded-[2px] bg-bg-elevated/50 hover:bg-ember/15 hover:text-ember text-text-secondary transition-colors cursor-pointer truncate">
                        {name}
                      </button>
                      <button onClick={() => deletePreset(name)} className="text-text-muted/40 hover:text-danger text-[0.8rem] w-5 h-5 flex items-center justify-center rounded-[2px] hover:bg-bg-elevated transition-colors cursor-pointer" title="Delete">
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── DEBUG ── */}
          <SectionHeader title="Debug & Page" open={sections.debug} onToggle={() => toggle("debug")} />
          {sections.debug && (
            <div className="px-3 py-2 flex flex-col gap-2">
              <label className="flex items-center justify-between text-[0.65rem] text-text-secondary cursor-pointer">
                <span>Show section bounds</span>
                <Toggle checked={config.showBounds} onChange={(v) => update("showBounds", v)} />
              </label>
              <label className="flex items-center justify-between text-[0.65rem] text-text-secondary cursor-pointer">
                <span>Show image names (hover)</span>
                <Toggle checked={config.showImgNames} onChange={(v) => update("showImgNames", v)} />
              </label>
              <label className="flex items-center justify-between text-[0.65rem] text-text-secondary cursor-pointer">
                <span>Reveal animations</span>
                <Toggle checked={config.revealAnim} onChange={(v) => update("revealAnim", v)} />
              </label>
              <label className="flex items-center justify-between text-[0.65rem] text-text-secondary cursor-pointer">
                <span>Vignette overlay</span>
                <Toggle checked={config.vignetteOn} onChange={(v) => update("vignetteOn", v)} />
              </label>
              <label className="flex items-center justify-between text-[0.65rem] text-text-secondary cursor-pointer">
                <span>Smooth scroll</span>
                <Toggle checked={config.smoothScroll} onChange={(v) => update("smoothScroll", v)} />
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/30 px-3 py-1.5 flex items-center justify-between text-[0.5rem] text-text-muted/50 font-mono tracking-tight">
          <span>[ ] cycle &nbsp; \ vignette</span>
          <span className="text-ember/60 truncate max-w-[110px]">{config.mode}</span>
        </div>
          </div>
        </>
      )}
    </>
  );
}
