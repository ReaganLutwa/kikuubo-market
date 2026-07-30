import { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Category from '@/pages/Category'
import Product from '@/pages/Product'
import Cart from '@/pages/Cart'
import Sell from '@/pages/Sell'
import Deals from '@/pages/Deals'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="product" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="sell" element={<Sell />} />
        <Route path="deals" element={<Deals />} />
      </Route>
    </Routes>
  )
}
