import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { TestSession } from "@shared/schema";

const traitDescriptions = {
  openness: {
    name: "Openness to Experience",
    description: "Reflects your willingness to try new things and think outside the box.",
  },
  conscientiousness: {
    name: "Conscientiousness", 
    description: "Measures how organized, disciplined, and goal-oriented you are.",
  },
  extraversion: {
    name: "Extraversion",
    description: "Indicates how outgoing, energetic, and socially confident you are.",
  },
  agreeableness: {
    name: "Agreeableness",
    description: "Reflects how cooperative, trusting, and empathetic you are.",
  },
  neuroticism: {
    name: "Neuroticism",
    description: "Measures emotional stability and your tendency to experience negative emotions.",
  },
};

export default function Results() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const sessionId = params.sessionId;

  const { data: session, isLoading } = useQuery<TestSession>({
    queryKey: ["/api/test-sessions", sessionId],
    enabled: !!sessionId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading your results...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!session || !session.results) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Results Not Found</h1>
              <p className="text-gray-600 mb-6">
                We couldn't find your test results. Please try taking the test again.
              </p>
              <Button onClick={() => setLocation("/")}>
                Start New Test
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const results = session.results;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-black mb-4">
              Your Big 5 Personality Results
            </h1>
            <p className="text-lg text-gray-600">
              Discover insights about your personality traits and characteristics.
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            {Object.entries(results).map(([trait, score]) => {
              if (trait === 'sessionId' || trait === 'descriptions') return null;
              
              const traitKey = trait as keyof typeof traitDescriptions;
              const traitInfo = traitDescriptions[traitKey];
              const percentage = Math.round(score * 100);
              
              return (
                <Card key={trait} className="w-full">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span className="text-xl font-semibold">{traitInfo.name}</span>
                      <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={percentage} className="mb-3" />
                    <p className="text-gray-600">{traitInfo.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setLocation("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg mr-4"
            >
              Take Test Again
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.print()}
              className="px-8 py-3 rounded-lg"
            >
              Save Results
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
