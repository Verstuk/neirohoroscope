"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Node class
    class Node {
      x: number
      y: number
      size: number
      color: string
      speed: number
      isHexagon: boolean
      rotation: number
      rotationSpeed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 2 + 1
        this.color = Math.random() > 0.85 ? "#7eeeff" : Math.random() > 0.7 ? "#f8d64e" : "rgba(248, 214, 78, 0.5)"
        this.speed = Math.random() * 0.2 - 0.1
        this.isHexagon = Math.random() > 0.95
        this.rotation = 0
        this.rotationSpeed = Math.random() * 0.01
      }

      update() {
        this.x += this.speed
        this.y += this.speed
        this.rotation += this.rotationSpeed

        // Reset position if out of bounds
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x, this.y)

        if (this.isHexagon) {
          ctx.rotate(this.rotation)
          ctx.beginPath()
          const size = this.size * 6
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const x = size * Math.cos(angle)
            const y = size * Math.sin(angle)
            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.closePath()
          ctx.fillStyle = "#f8a832"
          ctx.fill()
          ctx.strokeStyle = "#f8d64e"
          ctx.lineWidth = 1
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, this.size, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Create nodes
    const nodeCount = Math.floor((canvas.width * canvas.height) / 10000)
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    // Draw connections between nodes
    function drawConnections() {
      if (!ctx) return

      ctx.strokeStyle = "rgba(248, 214, 78, 0.15)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw glow in the center
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 3,
      )
      gradient.addColorStop(0, "rgba(248, 214, 78, 0.2)")
      gradient.addColorStop(0.5, "rgba(126, 238, 255, 0.05)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update()
        node.draw()
      })

      drawConnections()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#052e36]/30 via-transparent to-[#063a47]/30 z-0"></div>

      {/* Floating hexagons */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-0 opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 30 + 20}px`,
            height: `${Math.random() * 30 + 20}px`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-[#f8a832] rotate-45"></div>
        </motion.div>
      ))}
    </>
  )
}

