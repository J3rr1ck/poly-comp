"use client"

import { useEffect, useState } from "react"

interface PoliticalCompassProps {
  economicScore: number
  socialScore: number
  size?: number
  animated?: boolean
}

export function PoliticalCompass({ economicScore, socialScore, size = 400, animated = true }: PoliticalCompassProps) {
  const [animatedEconomic, setAnimatedEconomic] = useState(0)
  const [animatedSocial, setAnimatedSocial] = useState(0)
  const [showDot, setShowDot] = useState(false)

  useEffect(() => {
    if (animated) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic

        setAnimatedEconomic(economicScore * easeProgress)
        setAnimatedSocial(socialScore * easeProgress)

        if (currentStep >= steps) {
          clearInterval(interval)
          setShowDot(true)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    } else {
      setAnimatedEconomic(economicScore)
      setAnimatedSocial(socialScore)
      setShowDot(true)
    }
  }, [economicScore, socialScore, animated])

  const centerX = size / 2
  const centerY = size / 2
  const maxRadius = size / 2 - 50

  const userX = centerX + (animatedEconomic / 10) * maxRadius
  const userY = centerY - (animatedSocial / 10) * maxRadius

  const quadrants = [
    {
      x: centerX - maxRadius / 2,
      y: centerY - maxRadius / 2,
      label: "Libertarian\nLeft",
      color: "#10B981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      x: centerX + maxRadius / 2,
      y: centerY - maxRadius / 2,
      label: "Libertarian\nRight",
      color: "#F59E0B",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
    {
      x: centerX - maxRadius / 2,
      y: centerY + maxRadius / 2,
      label: "Authoritarian\nLeft",
      color: "#EF4444",
      bgColor: "rgba(239, 68, 68, 0.1)",
    },
    {
      x: centerX + maxRadius / 2,
      y: centerY + maxRadius / 2,
      label: "Authoritarian\nRight",
      color: "#8B5CF6",
      bgColor: "rgba(139, 92, 246, 0.1)",
    },
  ]

  return (
    <div className="flex justify-center">
      <svg
        width={size}
        height={size}
        className="border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-lg"
      >
        <defs>
          <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="url(#compassGradient)" />

        {/* Grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Quadrant backgrounds with gradients */}
        {quadrants.map((quad, index) => (
          <rect
            key={index}
            x={index % 2 === 0 ? 50 : centerX}
            y={index < 2 ? 50 : centerY}
            width={centerX - 50}
            height={centerY - 50}
            fill={quad.bgColor}
            className="transition-all duration-300"
          />
        ))}

        {/* Main axes with gradients */}
        <defs>
          <linearGradient id="verticalAxis" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <linearGradient id="horizontalAxis" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        <line x1={centerX} y1={50} x2={centerX} y2={size - 50} stroke="url(#verticalAxis)" strokeWidth="3" />
        <line x1={50} y1={centerY} x2={size - 50} y2={centerY} stroke="url(#horizontalAxis)" strokeWidth="3" />

        {/* Axis labels with better styling */}
        <text x={centerX} y={35} textAnchor="middle" className="text-sm font-bold fill-green-600">
          LIBERTARIAN
        </text>
        <text x={centerX} y={size - 15} textAnchor="middle" className="text-sm font-bold fill-red-600">
          AUTHORITARIAN
        </text>
        <text
          x={25}
          y={centerY - 10}
          textAnchor="middle"
          className="text-sm font-bold fill-red-600"
          transform={`rotate(-90, 25, ${centerY - 10})`}
        >
          LEFT
        </text>
        <text
          x={size - 25}
          y={centerY - 10}
          textAnchor="middle"
          className="text-sm font-bold fill-yellow-600"
          transform={`rotate(90, ${size - 25}, ${centerY - 10})`}
        >
          RIGHT
        </text>

        {/* Quadrant labels with better positioning */}
        {quadrants.map((quad, index) => (
          <text
            key={index}
            x={quad.x}
            y={quad.y}
            textAnchor="middle"
            className="text-xs font-bold opacity-70"
            fill={quad.color}
          >
            {quad.label.split("\n").map((line, i) => (
              <tspan key={i} x={quad.x} dy={i === 0 ? 0 : 14}>
                {line}
              </tspan>
            ))}
          </text>
        ))}

        {/* Animated trail effect */}
        {animated && (
          <path
            d={`M ${centerX} ${centerY} L ${userX} ${userY}`}
            stroke="#DC2626"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.5"
            className="animate-pulse"
          />
        )}

        {/* User position with glow effect */}
        {showDot && (
          <g>
            <circle cx={userX} cy={userY} r="12" fill="#DC2626" filter="url(#glow)" className="animate-pulse" />
            <circle cx={userX} cy={userY} r="8" fill="#FFFFFF" />
            <circle cx={userX} cy={userY} r="5" fill="#DC2626" />

            {/* Ripple effect */}
            <circle
              cx={userX}
              cy={userY}
              r="20"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2"
              opacity="0.3"
              className="animate-ping"
            />
          </g>
        )}

        {/* Position label with background */}
        {showDot && (
          <g>
            <rect x={userX - 35} y={userY - 45} width="70" height="20" rx="10" fill="rgba(0,0,0,0.8)" />
            <text x={userX} y={userY - 32} textAnchor="middle" className="text-xs font-bold fill-white">
              YOU
            </text>
            <rect x={userX - 45} y={userY + 25} width="90" height="18" rx="9" fill="rgba(0,0,0,0.7)" />
            <text x={userX} y={userY + 37} textAnchor="middle" className="text-xs fill-white">
              ({animatedEconomic.toFixed(1)}, {animatedSocial.toFixed(1)})
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
