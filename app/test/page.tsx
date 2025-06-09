"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { questions } from "@/lib/questions"

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion] !== undefined ? answers[currentQuestion] : null)
  }, [currentQuestion, answers])

  const handleAnswer = (value: number) => {
    setSelectedAnswer(value)
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }))
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Test completed, calculate results
      const results = calculateResults(answers)
      localStorage.setItem("politicalCompassResults", JSON.stringify(results))
      router.push("/results")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculateResults = (answers: Record<number, number>) => {
    let economicScore = 0
    let socialScore = 0
    let totalWeight = 0
    const categoryTallies: Record<string, Record<string, number>> = {}

    // Define categories to track for specific focuses
    const trackedCategories: Record<string, string[]> = {
      accelerationistFocus: ["accelerationism"], // "disruption", "techno-solutionism", "technocracy" were merged into "accelerationism" in questions.ts
      postLiberalFocus: ["post_liberal", "neo_reactionary", "alt_right"], // Includes NRx and Alt-Right as forms of post-liberalism for broader theme tracking. "nationalism", "ethnicity", "hierarchy", "anti-democracy", "anti-enlightenment" were changed.
      anarchistFocus: ["anarchist", "crypto_anarchist", "cooperative", "decentralization"], // decentralization was changed to crypto_anarchist or anarchist
      falgscFocus: ["falgsc"],
      cryptoAnarchistFocus: ["crypto_anarchist"],
      neoReactionaryFocus: ["neo_reactionary"],
      ecoSocialistFocus: ["eco_socialist"],
      altRightFocus: ["alt_right"],
    }

    const answerMap = ["stronglyDisagree", "disagree", "neutral", "agree", "stronglyAgree"]

    questions.forEach((question, index) => {
      const answer = answers[index] // This is the numerical value 0-4
      if (answer !== undefined) {
        const weight = question.weight || 1
        const adjustedScore = (answer - 2) * weight // Convert 0-4 scale to -2 to +2

        if (question.dimension === "economic") {
          economicScore += adjustedScore * (question.reverse ? -1 : 1)
        } else {
          socialScore += adjustedScore * (question.reverse ? -1 : 1)
        }
        totalWeight += weight

        // Tally answers for tracked categories
        const qCategory = question.category
        if (qCategory) {
          for (const focusName in trackedCategories) {
            if (trackedCategories[focusName].includes(qCategory)) {
              if (!categoryTallies[focusName]) {
                categoryTallies[focusName] = { stronglyAgree: 0, agree: 0, neutral: 0, disagree: 0, stronglyDisagree: 0 }
              }
              const answerString = answerMap[answer]
              if (answerString) {
                categoryTallies[focusName][answerString]++
              }
            }
          }
        }
      }
    })

    // Normalize scores to -10 to +10 range
    // Handle cases where totalWeight might be zero if no questions are answered (though UI prevents this path)
    const normalizedEconomic = totalWeight === 0 ? 0 : (economicScore / totalWeight) * 5
    const normalizedSocial = totalWeight === 0 ? 0 : (socialScore / totalWeight) * 5


    return {
      economic: Math.max(-10, Math.min(10, normalizedEconomic)),
      social: Math.max(-10, Math.min(10, normalizedSocial)),
      answers,
      timestamp: new Date().toISOString(),
      categoryTallies, // Add the tallies to the results
    }
  }

  const question = questions[currentQuestion]
  const responseOptions = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Political Compass Test</h1>
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
              <CardTitle className="text-lg leading-relaxed text-gray-800">{question.text}</CardTitle>
              {question.context && <p className="text-sm text-gray-600 mt-2 italic">{question.context}</p>}
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup
                value={selectedAnswer?.toString() || ""}
                onValueChange={(value) => handleAnswer(Number.parseInt(value))}
                className="space-y-3"
              >
                {responseOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-blue-600" />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm font-medium">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button onClick={handleNext} disabled={selectedAnswer === null} className="flex items-center gap-2">
              {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
