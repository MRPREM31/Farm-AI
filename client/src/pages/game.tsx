import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RefreshCw, Star } from "lucide-react";
import { Link } from "wouter";
import confetti from "canvas-confetti";
import cornMascot from "@assets/generated_images/3d_icon_of_a_corn_character.png";

const questions = [
  {
    id: 1,
    question: "Which of these is a sign of Nitrogen deficiency in corn?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maize_nitrogen_deficiency.JPG/640px-Maize_nitrogen_deficiency.JPG",
    options: [
      "Yellowing in a V-shape down the leaf",
      "Purple spots on leaves",
      "White powdery spots",
      "Holes in the leaves"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "When is the best time to water your crops to avoid evaporation?",
    options: [
      "Early Morning",
      "Noon",
      "Late Afternoon",
      "Midnight"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "What is the best way to prevent soil erosion?",
    options: [
      "Deep plowing every week",
      "Cover crops and mulching",
      "Burning crop residue",
      "Leaving soil bare"
    ],
    correctAnswer: 1
  }
];

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent double clicking

    setSelectedOption(index);
    const correct = index === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 10);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
        if (score > 10) { // Simple check for "good" score
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
              });
        }
      }
    }, 1500);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  if (showResult) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] container px-4">
           <div className="relative mb-8">
              <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>
              <img src={cornMascot} alt="Mascot" className="h-40 w-40 object-contain relative z-10 animate-in zoom-in duration-500" />
           </div>
           
           <h1 className="font-display text-4xl font-bold mb-2">Great Job!</h1>
           <p className="text-muted-foreground mb-6">You completed the quiz.</p>

           <Card className="w-full max-w-sm mb-8 border-2 border-primary/20 bg-primary/5">
             <CardContent className="p-6 flex flex-col items-center">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Total Score</span>
                <div className="text-5xl font-black text-primary flex items-center gap-2">
                  <Trophy className="h-10 w-10 fill-yellow-400 text-yellow-600" />
                  {score}
                </div>
                <div className="mt-4 flex gap-1">
                   {[1,2,3].map(i => (
                     <Star key={i} className={`h-8 w-8 ${score >= i * 10 ? 'fill-yellow-400 text-yellow-500' : 'text-gray-300'}`} />
                   ))}
                </div>
             </CardContent>
           </Card>

           <div className="flex gap-4 w-full max-w-sm">
             <Link href="/learn" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">Back to Learn</Button>
             </Link>
             <Button size="lg" className="flex-1" onClick={restartGame}>
                <RefreshCw className="mr-2 h-4 w-4" /> Play Again
             </Button>
           </div>
        </div>
      </Layout>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Layout>
      <div className="container px-4 py-6 max-w-md mx-auto min-h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <Link href="/learn">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
            <Trophy className="h-4 w-4 text-accent-foreground" />
            <span className="font-bold text-sm">{score}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1}/{questions.length}</span>
            <span>Agriculture Basics</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>

        <div className="flex-1">
           <Card className="mb-6 border-none shadow-lg overflow-hidden">
             {question.image && (
                <div className="h-40 w-full bg-gray-100 overflow-hidden">
                   <img src={question.image} alt="Question" className="h-full w-full object-cover" />
                </div>
             )}
             <CardContent className={`p-6 ${question.image ? '' : 'pt-8'}`}>
               <h2 className="text-xl font-bold leading-relaxed">{question.question}</h2>
             </CardContent>
           </Card>

           <div className="grid gap-3">
             {question.options.map((option, index) => (
               <button
                 key={index}
                 onClick={() => handleOptionClick(index)}
                 disabled={selectedOption !== null}
                 className={`
                    relative w-full p-4 rounded-xl text-left font-medium text-sm transition-all border-2
                    ${selectedOption === null 
                      ? 'bg-background border-border hover:border-primary/50 hover:bg-primary/5 shadow-sm' 
                      : selectedOption === index 
                        ? isCorrect 
                          ? 'bg-green-100 border-green-500 text-green-800' 
                          : 'bg-red-100 border-red-500 text-red-800'
                        : index === question.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : 'bg-background border-transparent opacity-50'
                    }
                 `}
               >
                 <div className="flex items-center justify-between">
                   <span>{option}</span>
                   {selectedOption !== null && index === question.correctAnswer && (
                     <CheckCircle2 className="h-5 w-5 text-green-600 animate-in zoom-in" />
                   )}
                   {selectedOption === index && !isCorrect && (
                     <XCircle className="h-5 w-5 text-red-600 animate-in zoom-in" />
                   )}
                 </div>
               </button>
             ))}
           </div>
        </div>
      </div>
    </Layout>
  );
}
