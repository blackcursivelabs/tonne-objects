import React, { useEffect, useRef } from 'react'

// Marquee whose speed reacts to scroll velocity.
export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let x = 0
    let lastScroll = window.scrollY
    let boost = 0
    let raf

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const s = window.scrollY
      boost += (Math.min(Math.abs(s - lastScroll), 60) - boost) * 0.08
      lastScroll = s
      x -= 1.2 + boost * 0.25
      const half = track.scrollWidth / 2
      if (-x >= half) x += half
      track.style.transform = `translate3d(${x}px,0,0)`
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  const items = Array.from({ length: 10 }, (_, i) => (
    <span className="marquee__item" key={i}>
      Mass is honest <i>●</i> Weight is a feature <i>●</i> Nothing hollow <i>●</i>
    </span>
  ))

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={trackRef}>
        {items}
      </div>
    </div>
  )
}
