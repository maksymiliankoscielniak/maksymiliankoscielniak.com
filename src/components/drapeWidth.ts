/** Keep in sync with --drape-w in index.css: clamp(10px, 3.6vw, 60px) */
export function drapeWidth(viewportWidth: number) {
  return Math.min(60, Math.max(10, viewportWidth * 0.036))
}
