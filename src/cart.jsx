import React, { createContext, useContext, useMemo, useState } from 'react'
import { PRODUCTS } from './data/products.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState({}) // id -> qty
  const [open, setOpen] = useState(false)

  const api = useMemo(() => {
    const entries = Object.entries(items)
      .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
      .filter((e) => e.product && e.qty > 0)

    const totalKg = entries.reduce((s, e) => s + e.product.kg * e.qty, 0)
    const totalPrice = entries.reduce((s, e) => s + e.product.price * e.qty, 0)
    const count = entries.reduce((s, e) => s + e.qty, 0)

    return {
      entries,
      totalKg,
      totalPrice,
      count,
      open,
      setOpen,
      add(id) {
        setItems((m) => ({ ...m, [id]: (m[id] || 0) + 1 }))
      },
      remove(id) {
        setItems((m) => {
          const next = { ...m, [id]: Math.max(0, (m[id] || 0) - 1) }
          if (next[id] === 0) delete next[id]
          return next
        })
      },
    }
  }, [items, open])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
