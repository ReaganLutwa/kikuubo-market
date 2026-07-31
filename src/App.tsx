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
import Legal from '@/pages/Legal'
import Food from '@/pages/Food'
import Mall from '@/pages/Mall'
import Fresh from '@/pages/Fresh'
import Send from '@/pages/Send'
import Pay from '@/pages/Pay'

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
        <Route path="privacy" element={<Legal />} />
        <Route path="terms" element={<Legal />} />
        <Route path="returns" element={<Legal />} />
        <Route path="cookies" element={<Legal />} />
        <Route path="seller-terms" element={<Legal />} />
        <Route path="food" element={<Food />} />
        <Route path="mall" element={<Mall />} />
        <Route path="fresh" element={<Fresh />} />
        <Route path="send" element={<Send />} />
        <Route path="pay" element={<Pay />} />
      </Route>
    </Routes>
  )
}
