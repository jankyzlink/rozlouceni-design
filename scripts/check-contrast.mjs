// Ověří kontrast textových tokenů vůči plochám (WCAG AA, 4,5:1).
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../tokens.css", import.meta.url), "utf8");
const token = (name) => {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`Token ${name} nenalezen nebo není hex`);
  return m[1];
};
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const pairs = [
  ["on-surface", "surface"], ["on-surface", "surface-raised"],
  ["on-surface-secondary", "surface"], ["on-surface-secondary", "surface-raised"],
  ["on-surface-muted", "surface"], ["on-surface-muted", "surface-raised"],
  ["on-surface-muted", "surface-sunken"], ["on-surface-muted", "surface-tint"],
  ["link", "surface"], ["link", "surface-raised"],
  ["button-primary-text", "button-primary"], ["on-surface-inverse", "on-surface"],
  ["success", "success-muted"], ["warn", "warn-muted"], ["danger", "danger-muted"],
  ["danger", "surface-raised"], ["check-text", "check-bg"], ["section-label", "surface"],
];

let failed = false;
for (const [fg, bg] of pairs) {
  const r = ratio(token(fg), token(bg));
  const ok = r >= 4.5;
  if (!ok) failed = true;
  console.log(`${ok ? "OK  " : "FAIL"} ${r.toFixed(2).padStart(5)}:1  ${fg} na ${bg}`);
}
process.exit(failed ? 1 : 0);
