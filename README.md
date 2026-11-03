# Strong Wood Floors — website

Next.js 15 (App Router) · Tailwind 4 · React Three Fiber · Lenis. PT / EN / ES.

```bash
npm install
npm run dev   # http://localhost:3000 → redirects to /pt
npm run build
```

## Structure
- `src/data/catalog.ts` — every product line, reference, width and thickness (from strongexport.com), species, company and Portugal 2030 data.
- `src/i18n/dict.ts` — all UI copy in PT, EN and ES.
- `src/components/three/` — procedural 3D plank (multilayer, solid, deck, triplex, skirting, underlay) with real species textures.
- `src/components/showcase/` — pinned scroll showcase used on every product line page.
- `src/components/product/Configurator.tsx` — species / line / width / thickness / finish configurator with exploded view.
- `public/textures/` — species textures, generated from Strong's own product photos and colour-calibrated against them.
- `public/img/products/` — Strong's real product photos (from the current site).

## Notes
- Ipê has no product photo on the current site, so its texture is a generic species reference.
- The contact form opens the visitor's mail client (no backend yet).
- Deploy: import the repo in Vercel (framework preset: Next.js), no env vars needed.
