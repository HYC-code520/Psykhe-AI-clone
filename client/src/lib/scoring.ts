import type { Question, PersonalityTraits } from "@shared/schema";

export function calculateResults(
  answers: Record<string, string[]>,
  questions: Question[]
): PersonalityTraits {
  const traits: PersonalityTraits = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  };

  const traitCounts = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  };

  // Calculate scores for each trait
  questions.forEach((question) => {
    const selectedOptions = answers[question.id] || [];
    
    selectedOptions.forEach((optionId) => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option) {
        const trait = option.trait as keyof PersonalityTraits;
        traits[trait] += option.score;
        traitCounts[trait]++;
      }
    });
  });

  // Average the scores and normalize to 0-1 range
  Object.keys(traits).forEach((trait) => {
    const traitKey = trait as keyof PersonalityTraits;
    if (traitCounts[traitKey] > 0) {
      traits[traitKey] = traits[traitKey] / traitCounts[traitKey];
      // Normalize to 0-1 range (assuming scores can be from -1 to 1)
      traits[traitKey] = (traits[traitKey] + 1) / 2;
      // Ensure it's between 0 and 1
      traits[traitKey] = Math.max(0, Math.min(1, traits[traitKey]));
    } else {
      traits[traitKey] = 0.5; // Default neutral score
    }
  });

  return traits;
}
