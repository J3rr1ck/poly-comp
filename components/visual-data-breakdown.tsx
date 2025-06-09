"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, PieChart, Activity } from "lucide-react"

interface VisualDataBreakdownProps {
  results: {
    economic: number
    social: number
    answers: Record<number, number>
  }
  analysis: {
    color: string
    primaryIdeology: string
  }
}

export function VisualDataBreakdown({ results, analysis }: VisualDataBreakdownProps) {
  const [animatedValues, setAnimatedValues] = useState({
    economic: 0,
    social: 0,
    economicProgress: 0,
    socialProgress: 0,
  })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      setAnimatedValues({
        economic: results.economic * easeProgress,
        social: results.social * easeProgress,
        economicProgress: (Math.abs(results.economic) / 10) * 100 * easeProgress,
        socialProgress: (Math.abs(results.social) / 10) * 100 * easeProgress,
      })

      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [results])

  const getIntensityLabel = (score: number) => {
    const abs = Math.abs(score)
    if (abs < 2) return "Moderate"
    if (abs < 5) return "Leaning"
    if (abs < 7) return "Strong"
    return "Extreme"
  }

  const getEconomicLabel = (score: number) => {
    return score > 0 ? "Right-wing" : "Left-wing"
  }

  const getSocialLabel = (score: number) => {
    return score > 0 ? "Authoritarian" : "Libertarian"
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* Economic Breakdown */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <BarChart3 className="w-5 h-5" />
            Economic Axis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: analysis.color }}>
                {animatedValues.economic.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">
                {getIntensityLabel(results.economic)} {getEconomicLabel(results.economic)}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Left</span>
                  <span>Right</span>
                </div>
                <div className="relative">
                  <Progress value={50} className="h-3 bg-gradient-to-r from-red-200 to-blue-200" />
                  <div
                    className="absolute top-0 w-3 h-3 rounded-full border-2 border-white shadow-lg transition-all duration-1000"
                    style={{
                      left: `calc(${50 + (animatedValues.economic / 10) * 50}% - 6px)`,
                      backgroundColor: analysis.color,
                    }}
                  />
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                {results.economic < 0 ? "Favors government intervention" : "Favors free markets"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Breakdown */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <PieChart className="w-5 h-5" />
            Social Axis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: analysis.color }}>
                {animatedValues.social.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">
                {getIntensityLabel(results.social)} {getSocialLabel(results.social)}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Libertarian</span>
                  <span>Authoritarian</span>
                </div>
                <div className="relative">
                  <Progress value={50} className="h-3 bg-gradient-to-r from-green-200 to-red-200" />
                  <div
                    className="absolute top-0 w-3 h-3 rounded-full border-2 border-white shadow-lg transition-all duration-1000"
                    style={{
                      left: `calc(${50 + (animatedValues.social / 10) * 50}% - 6px)`,
                      backgroundColor: analysis.color,
                    }}
                  />
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                {results.social < 0 ? "Values individual freedom" : "Values social order"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Intensity */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 pb-4">
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Activity className="w-5 h-5" />
            Ideological Intensity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: analysis.color }}>
                {((Math.abs(animatedValues.economic) + Math.abs(animatedValues.social)) / 2).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Overall Strength</div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Moderate</span>
                  <span>Extreme</span>
                </div>
                <Progress
                  value={((Math.abs(results.economic) + Math.abs(results.social)) / 20) * 100}
                  className="h-3"
                  style={{
                    background: `linear-gradient(to right, ${analysis.color}20, ${analysis.color})`,
                  }}
                />
              </div>

              <div className="text-xs text-gray-500 text-center">Distance from political center</div>
            </div>

            {/* Quadrant Indicator */}
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: analysis.color + "10" }}>
              <div className="text-center">
                <div className="text-sm font-semibold" style={{ color: analysis.color }}>
                  {results.economic < 0 ? "Left" : "Right"}-{results.social < 0 ? "Libertarian" : "Authoritarian"}
                </div>
                <div className="text-xs text-gray-600 mt-1">Primary Quadrant</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
