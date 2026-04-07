'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 4 + 'px'
        cursorRef.current.style.top = e.clientY - 4 + 'px'
      }
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x - 18 + 'px'
        ringRef.current.style.top = ring.current.y - 18 + 'px'
      }
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animate()

    const hoverEls = document.querySelectorAll('a, button, [data-hover]')
    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(2)'
      if (ringRef.current) {
        ringRef.current.style.transform = 'scale(1.5)'
        ringRef.current.style.borderColor = 'rgba(201,168,76,0.8)'
      }
    }
    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)'
      if (ringRef.current) {
        ringRef.current.style.transform = 'scale(1)'
        ringRef.current.style.borderColor = 'rgba(201,168,76,0.5)'
      }
    }
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999] transition-transform duration-100"
        style={{ background: 'var(--gold)' }}
      />
      <div
        ref={ringRef}
        className="fixed w-9 h-9 rounded-full pointer-events-none z-[9998] transition-all duration-150"
        style={{ border: '1px solid rgba(201,168,76,0.5)' }}
      />
    </>
  )
}