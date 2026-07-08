import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row data">
        <div>
          <span style={{ color: 'var(--steel)' }}>Visit</span>
          <br />
          1100 Foundry Row
          <br />
          Cleveland, OH 44113
        </div>
        <div>
          <span style={{ color: 'var(--steel)' }}>Write</span>
          <br />
          objects@tonne.example
        </div>
        <div>
          <span style={{ color: 'var(--steel)' }}>Elsewhere</span>
          <br />
          <a href="#top">Instagram</a>
          <br />
          <a href="#top">Are.na</a>
        </div>
        <div>
          <span style={{ color: 'var(--steel)' }}>Meta</span>
          <br />
          <Link to="/guide">How this site was made</Link>
        </div>
      </div>
      <div className="footer__big display" aria-hidden="true">
        TONNE<sup style={{ fontSize: '0.2em', color: 'var(--klein)' }}>®</sup>
      </div>
      <div className="footer__row data" style={{ color: 'var(--steel)' }}>
        <span>© 2026 Tonne Objects — a concept storefront</span>
        <span>Designed & built by Claude (Fable 5)</span>
      </div>
    </footer>
  )
}
