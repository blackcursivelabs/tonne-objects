import React, { useEffect, useRef, useState } from 'react'
import { PRODUCTS } from '../data/products.js'
import { useCart } from '../cart.jsx'
import Specimen3D from '../components/Specimen3D.jsx'
import Marquee from '../components/Marquee.jsx'
import Footer from '../components/Footer.jsx'
import { useReveal } from '../useReveal.js'

const CATALOG_KG = PRODUCTS.reduce((s, p) => s + p.kg, 0)

function Card({ product, index }) {
  const cart = useCart()
  const [added, setAdded] = useState(false)

  const add = () => {
    cart.add(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
  }

  return (
    <article className="card reveal" style={{ '--i': index % 3 }}>
      <div className="card__imgwrap">
        <img src={product.img} alt={`${product.name} — ${product.material}`} loading="lazy" />
        <span className="card__kg">{product.kg.toFixed(1)} kg</span>
      </div>
      <div className="card__body">
        <h3 className="card__name">{product.name}</h3>
        <p className="card__mat">
          {product.material} · {product.process}
        </p>
        <p className="data" style={{ color: 'var(--steel)' }}>{product.edition}</p>
        <div className="card__row">
          <span className="card__price">${product.price.toLocaleString()}</span>
          <button className={`card__add ${added ? 'is-added' : ''}`} onClick={add}>
            {added ? 'Added' : `Add ${product.kg.toFixed(1)} kg`}
          </button>
        </div>
      </div>
    </article>
  )
}

function ScaleCounter() {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        if (reduced) {
          setVal(CATALOG_KG)
          return
        }
        const t0 = performance.now()
        const dur = 1600
        const step = (t) => {
          const p = Math.min((t - t0) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(CATALOG_KG * ease)
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="scale__total">
      {val.toFixed(1)} kg
    </div>
  )
}

export default function Home() {
  const cart = useCart()
  useReveal()

  return (
    <>
      <section className="hero">
        <h1 className="hero__headline display">
          <span className="hero__line">
            <span>Objects</span>
          </span>
          <span className="hero__line hero__line--outline">
            <span>With</span>
          </span>
          <span className="hero__line hero__line--klein">
            <span>Weight</span>
          </span>
        </h1>
        <div className="hero__stage">
          <Specimen3D />
          <div className="hero__spec data">
            <span>Specimen 000 — Continuous Loop</span>
            <span>Sand-cast aluminum · <strong>6.3 kg</strong> · not for sale</span>
          </div>
          <span className="hero__hint data">Drag to rotate</span>
        </div>
        <div className="hero__meta data">
          <div>Foundry-direct, limited editions</div>
          <div>Every object listed with its true mass</div>
          <div>Ships freight from Cleveland, OH</div>
        </div>
      </section>

      <Marquee />

      <section className="manifesto" id="studio">
        <span className="data reveal">The position</span>
        <p className="reveal">
          The industry hollowed everything out to save on shipping. We refuse.
          A candlestick should <em>land</em> when you set it down. Every piece
          here is cast, carved or bent from solid material — and we print the
          mass on the label like it's a spec, because <em>it is one.</em>
        </p>
      </section>

      <section id="index">
        <div className="index__head">
          <h2 className="display">Index</h2>
          <span className="data">
            {PRODUCTS.length} objects · {CATALOG_KG.toFixed(1)} kg combined
          </span>
        </div>
        <div className="grid">
          {PRODUCTS.map((p, i) => (
            <Card key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <section className="scale">
        <h2 className="display reveal">The whole catalogue weighs</h2>
        <ScaleCounter />
        <p className="reveal">
          For scale: that's a grand piano's worth of aluminum, bronze, glass,
          steel and Roman stone. Your cart currently holds{' '}
          {cart.totalKg.toFixed(1)} kg of it.
        </p>
      </section>

      <Footer />
    </>
  )
}
