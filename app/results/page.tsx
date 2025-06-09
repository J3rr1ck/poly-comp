"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, Download, RotateCcw, Home, TrendingUp, Users, Brain } from "lucide-react"
import { PoliticalCompass } from "@/components/political-compass"
import { getIdeologyAnalysis, ideologyDetailsMap, IdeologyAnalysisInput } from "@/lib/ideology-analysis" // Import IdeologyAnalysisInput
import { VisualDataBreakdown } from "@/components/visual-data-breakdown"
import Link from "next/link"
import { questions } from "@/lib/questions"
// Optional: Import Lightbulb if you decide to use it. For now, skipping.
// import { Lightbulb } from "lucide-react";

// Define CategoryTally locally as it's part of the Results structure
interface CategoryTally {
  stronglyAgree: number
  agree: number
  neutral: number
  disagree: number
  stronglyDisagree: number
}

interface Results {
  economic: number
  social: number
  answers: Record<number, number>
  timestamp: string
  categoryTallies?: Record<string, CategoryTally> // Added categoryTallies
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<Results | null>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedResults = localStorage.getItem("politicalCompassResults")
    if (savedResults) {
      let parsedResults: Results = JSON.parse(savedResults)
      // If categoryTallies is missing, recalculate it from answers
      if (!parsedResults.categoryTallies) {
        // Recalculate categoryTallies logic (copied from test page)
        const trackedCategories: Record<string, string[]> = {
          accelerationistFocus: ["accelerationism"],
          postLiberalFocus: ["post_liberal", "neo_reactionary", "alt_right"],
          anarchistFocus: ["anarchist", "crypto_anarchist", "cooperative", "decentralization"],
          falgscFocus: ["falgsc"],
          cryptoAnarchistFocus: ["crypto_anarchist"],
          neoReactionaryFocus: ["neo_reactionary"],
          ecoSocialistFocus: ["eco_socialist"],
          altRightFocus: ["alt_right"],
        }
        const answerMap = ["stronglyDisagree", "disagree", "neutral", "agree", "stronglyAgree"]
        const categoryTallies: Record<string, CategoryTally> = {}
        questions.forEach((question, index) => {
          const answer = parsedResults.answers[index]
          if (answer !== undefined) {
            const qCategory = question.category
            if (qCategory) {
              for (const focusName in trackedCategories) {
                if (trackedCategories[focusName].includes(qCategory)) {
                  if (!categoryTallies[focusName]) {
                    categoryTallies[focusName] = { stronglyAgree: 0, agree: 0, neutral: 0, disagree: 0, stronglyDisagree: 0 }
                  }
                  const answerString = answerMap[answer] as keyof CategoryTally
                  if (answerString) {
                    categoryTallies[focusName][answerString]++
                  }
                }
              }
            }
          }
        })
        parsedResults = { ...parsedResults, categoryTallies }
      }
      setResults(parsedResults)
      setAnalysis(getIdeologyAnalysis(parsedResults as IdeologyAnalysisInput))
      setTimeout(() => setIsLoading(false), 500)
    } else {
      router.push("/test")
    }
  }, [router])

  const handleShare = async () => {
    if (!results) return

    const shareData = {
      title: "My Political Compass Results",
      text: `I'm ${analysis?.primaryIdeology} on the political compass! Economic: ${results.economic.toFixed(1)}, Social: ${results.social.toFixed(1)}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`)
      alert("Results copied to clipboard!")
    }
  }

  const handleDownload = () => {
    if (!results) return

    const dataStr = JSON.stringify(results, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `political-compass-results-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading || !results || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <div
              className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-200 border-r-purple-600 mx-auto animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
          </div>
          <p className="text-lg font-medium text-gray-700 animate-pulse">Analyzing your political ideology...</p>
          <p className="text-sm text-gray-500 mt-2">Calculating your position on the compass</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ backgroundColor: analysis.color + "20" }}
            >
              <Brain className="w-10 h-10" style={{ color: analysis.color }} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Political Identity
            </h1>
            <div className="inline-block mb-6">
              <Badge
                variant="secondary"
                className="text-xl px-6 py-3 font-bold text-white shadow-lg"
                style={{ backgroundColor: analysis.color }}
              >
                {analysis.primaryIdeology}
              </Badge>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{analysis.description}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                onClick={handleShare}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                Share Results
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center gap-2 border-2 hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                Download Data
              </Button>
              <Link href="/test">
                <Button variant="outline" className="flex items-center gap-2 border-2 hover:bg-gray-50">
                  <RotateCcw className="w-4 h-4" />
                  Retake Test
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2 border-2 hover:bg-gray-50">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Political Compass */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Your Position
                </CardTitle>
                <CardDescription className="text-lg font-medium">
                  Economic: <span className="font-bold text-blue-600">{results.economic.toFixed(1)}</span> | Social:{" "}
                  <span className="font-bold text-purple-600">{results.social.toFixed(1)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <PoliticalCompass economicScore={results.economic} socialScore={results.social} animated={true} />
              </CardContent>
            </Card>

            {/* Ideology Analysis */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Ideology Deep Dive
                </CardTitle>
                <CardDescription>Understanding your political worldview</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: analysis.color + "10" }}>
                  <p className="text-gray-700 leading-relaxed">{analysis.modernContext}</p>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: analysis.color }}></div>
                    Key Characteristics
                  </h4>
                  <ul className="space-y-2">
                    {analysis.characteristics.map((char: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: analysis.color }}
                        ></div>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                {/*
                  The existing secondary ideologies display as badges was here.
                  It has been removed as per instructions to create a new detailed card.
                */}
              </CardContent>
            </Card>
          </div>

          {/* Visual Data Breakdown */}
          <VisualDataBreakdown results={results} analysis={analysis} />

          {/* Notable Figures */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Notable Figures & Thinkers
              </CardTitle>
              <CardDescription>Historical and contemporary figures with similar ideological positions</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                {analysis.notableFigures.map((figure: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: analysis.color }}></div>
                      <div>
                        <span className="font-semibold text-gray-800">{figure.name}</span>
                        <p className="text-sm text-gray-600">{figure.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Explore Related Ideologies Card */}
          {analysis.secondaryIdeologies && analysis.secondaryIdeologies.length > 0 && (
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  {/* <Lightbulb className="w-5 h-5 text-yellow-600" /> */}
                  Explore Related Ideologies
                </CardTitle>
                <CardDescription>These are other ideological areas you show some alignment with.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {analysis.secondaryIdeologies.map((ideology: string, index: number) => {
                  const details = ideologyDetailsMap.get(ideology)
                  return (
                    <div key={index} className="p-3 rounded-lg bg-gray-50 border border-gray-200 hover:shadow-sm transition-shadow">
                      <h4 className="font-semibold text-gray-800 mb-1">{ideology}</h4>
                      {details && <p className="text-sm text-gray-600">{details.description}</p>}
                      {!details && <p className="text-sm text-gray-500">Description not available.</p>}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}

          {/* Test Metadata */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Test completed on {new Date(results.timestamp).toLocaleDateString()} at{" "}
              {new Date(results.timestamp).toLocaleTimeString()}
            </p>
            <p className="mt-1">Based on {Object.keys(results.answers).length} questions • Political Compass v2.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
