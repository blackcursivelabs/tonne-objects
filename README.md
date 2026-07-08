# TONNE — Objects With Weight

A concept storefront for a foundry-direct design-object brand, where **weight is the product spec**: every object lists its true mass, the cart totals kilograms alongside dollars, and the hero is a generated-from-scratch 3D mesh you can drag.

Designed and built end-to-end by **Claude (Fable 5)** running autonomously in Claude Code — code, copy, palette, product photography (image models via MCP) and the 3D specimen (image → 3D model pipeline).

**Live (GitHub Pages):** https://cdtservices123-cloud.github.io/tonne-objects/

**Deploy your own on Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcdtservices123-cloud%2Ftonne-objects)

## How it was made

See the living `/guide` route on the site itself.

- Vite + React + three.js, hand-written CSS, Fontsource-hosted type (Bricolage Grotesque / Archivo / Space Mono)
- Product imagery generated with one shared studio-prompt scaffold for catalogue consistency
- Hero mesh: generated reference image → image-to-3D → GLB → three.js with PBR aluminum, RoomEnvironment lighting, inertial drag
- Three fine-tooth iteration passes (desktop + mobile) before shipping

## Sibling sites

- KISSA — a midnight listening café: `kissa-listening-cafe`
- HALO — a pearlescent aesthetic clinic: `halo-aesthetic-clinic`

## Run locally

```bash
npm install
npm run dev
```
