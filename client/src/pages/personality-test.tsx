import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import CircularProgress from "@/components/circular-progress";
import QuestionCard from "@/components/question-card";
import Footer from "@/components/footer";
import { questions } from "@/lib/test-data";
import { calculateResults } from "@/lib/scoring";
import { apiRequest } from "@/lib/queryClient";
import type { TestSession } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, SkipBack, SkipForward } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PersonalityTest() {
  const [, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const queryClient = useQueryClient();
  const { toast } = useToast();

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

  // useEffect(() => {
  //   if (currentQuestionIndex === 9) {
  //     toast({
  //       title: "Nice! You're a third of the way through 💪",
  //     });
  //   } else if (currentQuestionIndex === 19) {
  //     toast({
  //       title: "Just 10 more to go! You're doing great 🎯",
  //     });
  //   }
  // }, [currentQuestionIndex, toast]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Check if current question is multi-select
  const isMultiSelect = currentQuestion?.text.includes("(Select all that apply.)");

  const handleOptionToggle = (questionId: string, optionId: string) => {
    const newAnswers = { ...selectedAnswers };
    
    if (isMultiSelect) {
      // Multi-select logic (existing behavior)
      if (!newAnswers[questionId]) {
        newAnswers[questionId] = [];
      }

      const currentOptions = newAnswers[questionId];
      if (currentOptions.includes(optionId)) {
        newAnswers[questionId] = currentOptions.filter(id => id !== optionId);
      } else {
        newAnswers[questionId] = [...currentOptions, optionId];
      }
    } else {
      // Single-select logic - replace with new selection
      newAnswers[questionId] = [optionId];
    }

    setSelectedAnswers(newAnswers);

    // Save to backend
    updateSessionMutation.mutate({
      answers: newAnswers,
      currentQuestionIndex,
    });

    // Auto-advance for single-select questions (unless it's the last question)
    if (!isMultiSelect && !isLastQuestion) {
      // Add a small delay to show the selection briefly
      setTimeout(() => {
        handleNavigation('next');
      }, 300);
    }
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

    // Navigate to the placeholder page instead of results
    setLocation(`/fill-info-placeholder?sessionId=${sessionId}`);
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="flex-1 flex items-center px-6 py-6 min-h-questionnaire">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Question with Circular Progress */}
            <div className="flex flex-col justify-center items-center">
              <p className="text-gray-300 text-sm font-medium mb-6">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              
              {/* Desktop version with circular progress */}
              <div className="hidden lg:block">
                <CircularProgress progress={progressPercentage}>
                  <h2 className="font-serif text-3xl md:text-4xl text-black leading-relaxed text-center">
                    {currentQuestion.text}
                  </h2>
                </CircularProgress>
              </div>
              
              {/* Mobile version without circular progress */}
              <div className="lg:hidden">
                <h2 className="font-serif text-2xl md:text-3xl text-black leading-relaxed text-center max-w-md">
                  {currentQuestion.text}
                </h2>
              </div>
            </div>

            {/* Right side - Answer Options with Navigation */}
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center space-x-2 lg:space-x-6 w-full max-w-none">
                {/* Left navigation arrow - visible on all screen sizes */}
                {currentQuestionIndex > 0 ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleNavigation('prev')}
                    className="flex p-3 lg:p-4 hover:bg-gray-100 rounded-full flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16"
                  >
                    <ArrowLeft className="w-6 h-6 lg:w-10 lg:h-10 text-gray-600" />
                  </Button>
                ) : (
                  <div className="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0" />
                )}

                {/* Answer options - vertical stack */}
                <div className="flex flex-col space-y-4 w-full">
                  {currentQuestion.options.map((option, index) => (
                    <QuestionCard
                      key={option.id}
                      option={option}
                      isSelected={selectedAnswers[currentQuestion.id]?.includes(option.id) || false}
                      onToggle={() => handleOptionToggle(currentQuestion.id, option.id)}
                      index={index}
                      totalOptions={currentQuestion.options.length}
                      isMultiSelect={isMultiSelect}
                    />
                  ))}
                </div>

                {/* Right navigation arrow - visible on all screen sizes */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => isLastQuestion ? handleComplete() : handleNavigation('next')}
                  className="flex p-3 lg:p-4 hover:bg-gray-100 rounded-full flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16"
                >
                  <ArrowRight className="w-6 h-6 lg:w-10 lg:h-10 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
