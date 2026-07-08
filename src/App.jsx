import React, { useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useCart } from './cart.jsx'
import CartDrawer from './components/CartDrawer.jsx'

export default function App() {
  const cart = useCart()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <header className="nav">
        <Link to="/" className="nav__logo">
          TONNE<sup>®</sup>
        </Link>
        <nav className="nav__links data" aria-label="Primary">
          <a href={import.meta.env.BASE_URL + '#index'}>Index</a>
          <a href={import.meta.env.BASE_URL + '#studio'} className="hide-sm">Studio</a>
          <Link to="/guide">Guide</Link>
        </nav>
        <button
          className="nav__cart data"
          onClick={() => cart.setOpen(true)}
          aria-label={`Open cart, ${cart.count} items, ${cart.totalKg.toFixed(1)} kilograms`}
        >
          <span>Cart ({cart.count})</span>
          <span className="nav__cart-kg">{cart.totalKg.toFixed(1)} kg</span>
        </button>
      </header>
      <main>
        <Outlet />
      </main>
      <CartDrawer />
    </>
  )
}
