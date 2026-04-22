import type { BlendMode } from "./types";

// ── Basic ──
import off from "./off";
import continuous from "./continuous";
import sectionFade from "./section-fade";
import softBlend from "./soft-blend";

// ── Lines & Rules ──
import emberStitch from "./ember-stitch";
import doubleRule from "./double-rule";
import horizon from "./horizon";
import emberPulse from "./ember-pulse";

// ── Spotlight ──
import spotlight from "./spotlight";
import spotlightCurtain from "./spotlight-curtain";
import spotlightSeam from "./spotlight-seam";
import spotlightVeil from "./spotlight-veil";

// ── Edge Merge ──
import edgeMist from "./edge-mist";
import edgeForge from "./edge-forge";
import edgeDrift from "./edge-drift";
import edgeShadow from "./edge-shadow";
import edgeWhisper from "./edge-whisper";

// ── Immersive ──
import diagonal from "./diagonal";
import smoke from "./smoke";
import woven from "./woven";
import ridge from "./ridge";
import dissolve from "./dissolve";

// ── Corner Blend ──
import sideWash from "./side-wash";
import sideSweep from "./side-sweep";
import sideCradle from "./side-cradle";
import sidePinch from "./side-pinch";
import sideCascade from "./side-cascade";
import sideFlood from "./side-flood";
import sideDrape from "./side-drape";
import sideEngulf from "./side-engulf";
import sideTide from "./side-tide";
import sideEmbrace from "./side-embrace";
import sideImmerse from "./side-immerse";
import sideBreathe from "./side-breathe";

// ── Cinematic ──
import cinema from "./cinema";
import parchment from "./parchment";
import frostLine from "./frost-line";

/** All blend modes in display order */
export const blends: BlendMode[] = [
  // Basic
  off,
  continuous,
  sectionFade,
  softBlend,
  // Lines & Rules
  emberStitch,
  doubleRule,
  horizon,
  emberPulse,
  // Spotlight
  spotlight,
  spotlightCurtain,
  spotlightSeam,
  spotlightVeil,
  // Edge Merge
  edgeMist,
  edgeForge,
  edgeDrift,
  edgeShadow,
  edgeWhisper,
  // Corner Blend
  sideWash,
  sideSweep,
  sideCradle,
  sidePinch,
  sideCascade,
  sideFlood,
  sideDrape,
  sideEngulf,
  sideTide,
  sideEmbrace,
  sideImmerse,
  sideBreathe,
  // Immersive
  diagonal,
  smoke,
  woven,
  ridge,
  dissolve,
  // Cinematic
  cinema,
  parchment,
  frostLine,
];

/** All CSS concatenated — injected once, only active mode matches */
export const allBlendCSS = blends.map((b) => b.css).join("\n");

/** Group blends for the switcher UI */
export function groupedBlends() {
  const order = ["Basic", "Lines & Rules", "Spotlight", "Edge Merge", "Corner Blend", "Immersive", "Cinematic"];
  const groups: { title: string; modes: BlendMode[] }[] = [];

  for (const title of order) {
    const modes = blends.filter((b) => b.group === title);
    if (modes.length > 0) groups.push({ title, modes });
  }
  return groups;
}
