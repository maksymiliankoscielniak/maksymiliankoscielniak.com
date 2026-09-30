/** Permanent velvet drapes framing the page once the curtain has opened. */
export function SideDrapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-0 right-0 z-40">
      <div
        className="velvet absolute inset-y-0 left-0"
        style={{ width: 'var(--drape-w)', boxShadow: '10px 0 26px rgb(0 0 0 / 0.65)' }}
      />
      <div
        className="velvet absolute inset-y-0 right-0"
        style={{ width: 'var(--drape-w)', boxShadow: '-10px 0 26px rgb(0 0 0 / 0.65)' }}
      />
    </div>
  )
}
