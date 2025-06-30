import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import ProgressBar from "@/components/progress-bar";
import QuestionCard from "@/components/question-card";
import Footer from "@/components/footer";
import { questions } from "@/lib/test-data";
import { calculateResults } from "@/lib/scoring";
import { apiRequest } from "@/lib/queryClient";
import type { TestSession } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PersonalityTest() {
  const [, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const queryClient = useQueryClient();

  // Create session on component mount
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/test-sessions");
      return response.json() as Promise<TestSession>;
    },
    onSuccess: (session) => {
      setSessionId(session.sessionId);
    },
  });

  // Get session data
  const { data: sessionData } = useQuery({
    queryKey: ["/api/test-sessions", sessionId],
    enabled: !!sessionId,
  });

  // Update session
  const updateSessionMutation = useMutation({
    mutationFn: async (updates: Partial<TestSession>) => {
      if (!sessionId) throw new Error("No session ID");
      const response = await apiRequest("PATCH", `/api/test-sessions/${sessionId}`, updates);
      return response.json() as Promise<TestSession>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/test-sessions", sessionId] });
    },
  });

  useEffect(() => {
    if (!sessionId) {
      createSessionMutation.mutate();
    }
  }, []);

  useEffect(() => {
    if (sessionData) {
      setCurrentQuestionIndex(sessionData.currentQuestionIndex);
      setSelectedAnswers(sessionData.answers);
    }
  }, [sessionData]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionToggle = (questionId: string, optionId: string) => {
    const newAnswers = { ...selectedAnswers };
    if (!newAnswers[questionId]) {
      newAnswers[questionId] = [];
    }

    const currentOptions = newAnswers[questionId];
    if (currentOptions.includes(optionId)) {
      newAnswers[questionId] = currentOptions.filter(id => id !== optionId);
    } else {
      newAnswers[questionId] = [...currentOptions, optionId];
    }

    setSelectedAnswers(newAnswers);

    // Save to backend
    updateSessionMutation.mutate({
      answers: newAnswers,
      currentQuestionIndex,
    });
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    let newIndex = currentQuestionIndex;
    
    if (direction === 'prev' && currentQuestionIndex > 0) {
      newIndex = currentQuestionIndex - 1;
    } else if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      newIndex = currentQuestionIndex + 1;
    }

    if (newIndex !== currentQuestionIndex) {
      setCurrentQuestionIndex(newIndex);
      updateSessionMutation.mutate({
        currentQuestionIndex: newIndex,
      });
    }
  };

  const handleComplete = async () => {
    if (!sessionId) return;

    const results = calculateResults(selectedAnswers, questions);
    
    await updateSessionMutation.mutateAsync({
      isCompleted: 1,
      results,
    });

    setLocation(`/results/${sessionId}`);
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ProgressBar progress={progressPercentage} />
      
      <div className="flex-1 flex items-center px-6 py-12 min-h-questionnaire">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Question */}
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-3xl md:text-4xl text-black leading-relaxed">
                {currentQuestion.text}
              </h2>
              
              {/* Navigation arrows for mobile */}
              <div className="flex items-center space-x-4 mt-8 lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleNavigation('prev')}
                  disabled={currentQuestionIndex === 0}
                  className="p-3 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => isLastQuestion ? handleComplete() : handleNavigation('next')}
                  className="p-3 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Right side - Answer Options */}
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                {/* Left navigation arrow for desktop */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleNavigation('prev')}
                  disabled={currentQuestionIndex === 0}
                  className="hidden lg:flex p-3 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </Button>

                {/* Answer options - vertical stack */}
                <div className="flex flex-col space-y-4 w-full max-w-2xl">
                  {currentQuestion.options.map((option) => (
                    <QuestionCard
                      key={option.id}
                      option={option}
                      isSelected={selectedAnswers[currentQuestion.id]?.includes(option.id) || false}
                      onToggle={() => handleOptionToggle(currentQuestion.id, option.id)}
                    />
                  ))}
                </div>

                {/* Right navigation arrow for desktop */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => isLastQuestion ? handleComplete() : handleNavigation('next')}
                  className="hidden lg:flex p-3 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>

          {/* Complete test button */}
          {isLastQuestion && (
            <div className="text-center mt-12">
              <Button
                onClick={handleComplete}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                disabled={updateSessionMutation.isPending}
              >
                {updateSessionMutation.isPending ? "Completing..." : "Complete Test"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
