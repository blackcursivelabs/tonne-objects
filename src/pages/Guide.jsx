import React from 'react'
import Footer from '../components/Footer.jsx'

export default function Guide() {
  return (
    <>
      <div className="guide">
        <span className="data">Meta — how this site was made</span>
        <h1 className="display">Guide</h1>
        <p>
          This storefront is one of three demonstration sites designed and built
          end-to-end by <strong>Claude (Fable 5)</strong>, running autonomously in
          Claude Code. No human touched the code, the copy, the palette or the
          imagery. Here is the exact workflow, so you can reproduce it.
        </p>

        <h2>1. Design direction first</h2>
        <p>
          Before any code, Claude wrote a compact design plan: a named palette
          (bone paper, ink, Klein ultramarine), a three-role type system
          (Bricolage Grotesque for display, Archivo for body, Space Mono for
          data), and one <em>signature idea</em> — weight. Every object on this
          site is annotated with its true mass, the cart totals kilograms
          alongside dollars, and the closing section weighs the whole catalogue.
          A single organizing idea beats ten decorative ones.
        </p>

        <h2>2. Generated imagery</h2>
        <p>
          All product photography was generated with image models via the
          Higgsfield MCP server, using one shared prompt scaffold — same
          warm-grey seamless, same north light, same contact shadow — so six
          separate generations read as one catalogue shoot. Consistency of
          lighting, not quality of any single image, is what makes generated
          imagery feel art-directed.
        </p>

        <h2>3. A real 3D asset, generated</h2>
        <p>
          The hero specimen is not a video: it's a GLB mesh you can drag.
          Claude generated a reference image of a cast-aluminum loop, converted
          it to geometry with an image-to-3D model, then rendered it in the
          browser with <code>three.js</code> — PBR aluminum material, room
          environment lighting, inertial drag controls, ACES tone mapping.
        </p>

        <h2>4. Motion with a point of view</h2>
        <ul>
          <li>Page-load headline reveal: staggered clip-path rise, 900 ms.</li>
          <li>A marquee whose speed reacts to your scroll velocity.</li>
          <li>Weight stamps that drop onto product photos on hover.</li>
          <li>A catalogue-mass counter that eases up when scrolled into view.</li>
          <li>
            Everything respects <code>prefers-reduced-motion</code>.
          </li>
        </ul>

        <h2>5. Stack & deployment</h2>
        <p>
          Vite + React + <code>three.js</code>, self-hosted fonts via
          Fontsource, no UI framework. Pushed to GitHub with the <code>gh</code>{' '}
          CLI and deployed on Vercel. Then three full iteration passes:
          screenshot, critique, refine — checking rhythm, contrast, spacing,
          responsive breakpoints and keyboard focus before calling it done.
        </p>

        <h2>The other two sites</h2>
        <p>
          This site's siblings — a midnight listening café and a pearlescent
          aesthetic clinic — were built the same way but share zero design DNA
          with this one, deliberately. Links live in the project README.
        </p>
      </div>
      <Footer />
    </>
  )
}
