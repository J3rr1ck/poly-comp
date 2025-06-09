import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, Users, Share2, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-full">
              <Compass className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Political Compass Test</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover your political ideology through our comprehensive assessment. Navigate the complex landscape of
            political thought with precision and nuance.
          </p>
          <Link href="/test">
            <Button size="lg" className="text-lg px-8 py-4">
              Start the Test
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 p-2 bg-green-100 rounded-full w-fit">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Comprehensive Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                50+ carefully crafted questions covering economic, social, and governance dimensions
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 p-2 bg-purple-100 rounded-full w-fit">
                <Compass className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Sophisticated Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Advanced algorithm considers question weighting, response nuances, and ideological consistency
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 p-2 bg-blue-100 rounded-full w-fit">
                <Share2 className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Share & Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Save your results, share with friends, and compare political positions</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 p-2 bg-orange-100 rounded-full w-fit">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Detailed Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                In-depth analysis of your political ideology with historical context and related thinkers
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Economic Dimension</h3>
                <p className="text-gray-600">
                  Measures your views on economic policy, from free-market capitalism to state-controlled socialism.
                  Questions cover taxation, regulation, welfare, and wealth distribution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-600">Social Dimension</h3>
                <p className="text-gray-600">
                  Evaluates your stance on social issues and government authority, from libertarian to authoritarian.
                  Covers civil liberties, traditional values, and individual rights.
                </p>
              </div>
            </div>
            <div className="text-center pt-4">
              <p className="text-gray-600 mb-6">
                Your results will be plotted on a two-dimensional compass, providing a nuanced view of your political
                position beyond the traditional left-right spectrum.
              </p>
              <Link href="/test">
                <Button variant="outline" size="lg">
                  Begin Assessment
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
