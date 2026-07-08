import React from 'react'
import { useCart } from '../cart.jsx'

export default function CartDrawer() {
  const cart = useCart()

  return (
    <>
      <div
        className={`drawer-veil ${cart.open ? 'is-open' : ''}`}
        onClick={() => cart.setOpen(false)}
      />
      <aside className={`drawer ${cart.open ? 'is-open' : ''}`} aria-label="Cart" aria-hidden={!cart.open}>
        <div className="drawer__head">
          <h3>Cart</h3>
          <button className="data" onClick={() => cart.setOpen(false)}>
            Close ✕
          </button>
        </div>
        <div className="drawer__items">
          {cart.entries.length === 0 && (
            <p className="drawer__empty">
              Nothing in the cart yet. Add an object — the scale below will start
              to mean something.
            </p>
          )}
          {cart.entries.map(({ product, qty }) => (
            <div className="drawer__item" key={product.id}>
              <img src={product.img} alt={product.name} />
              <div>
                <div className="drawer__item-name">{product.name}</div>
                <div className="data" style={{ color: 'var(--steel)' }}>
                  {product.kg.toFixed(1)} kg each
                </div>
                <div className="drawer__qty">
                  <button onClick={() => cart.remove(product.id)} aria-label={`Remove one ${product.name}`}>
                    −
                  </button>
                  <span className="data">{qty}</span>
                  <button onClick={() => cart.add(product.id)} aria-label={`Add one ${product.name}`}>
                    +
                  </button>
                </div>
              </div>
              <div className="data">${(product.price * qty).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="drawer__foot">
          <div className="drawer__totals data">
            <span>Total mass</span>
            <span className="drawer__kg">{cart.totalKg.toFixed(1)} kg</span>
          </div>
          <div className="drawer__totals data">
            <span>Total</span>
            <span>${cart.totalPrice.toLocaleString()}</span>
          </div>
          <button className="drawer__checkout">
            Checkout — ships freight, obviously
          </button>
        </div>
      </aside>
    </>
  )
}
