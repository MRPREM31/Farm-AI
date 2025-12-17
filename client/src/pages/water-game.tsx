import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Droplets, Trophy, RefreshCw, Star } from "lucide-react";
import { Link } from "wouter";
import confetti from "canvas-confetti";
import waterMascot from "@assets/generated_images/3d_icon_of_a_water_drop_character_game.png";
import { useAtom } from "jotai";
import { pointsAtom } from "./course";

export default function WaterGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [drops, setDrops] = useState<{id: number, x: number, y: number, type: 'good' | 'bad'}[]>([]);
  const gameLoopRef = useRef<number>();
  const [points, setPoints] = useAtom(pointsAtom);

  // Game Logic
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('end');
            if (score > 50) {
               confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
               setPoints(p => p + Math.floor(score / 2)); // Add coins based on score
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Spawn drops
      const spawnInterval = setInterval(() => {
         setDrops(prev => [
            ...prev, 
            {
               id: Date.now(),
               x: Math.random() * 80 + 10, // 10% to 90% width
               y: -10,
               type: Math.random() > 0.3 ? 'good' : 'bad'
            }
         ]);
      }, 800);

      // Move drops
      const moveInterval = setInterval(() => {
         setDrops(prev => prev.map(d => ({ ...d, y: d.y + 2 })).filter(d => d.y < 110));
      }, 50);

      return () => {
        clearInterval(interval);
        clearInterval(spawnInterval);
        clearInterval(moveInterval);
      };
    }
  }, [gameState, score, setPoints]);

  const handleCatch = (id: number, type: 'good' | 'bad') => {
     if (type === 'good') {
         setScore(s => s + 10);
     } else {
         setScore(s => Math.max(0, s - 5));
     }
     setDrops(prev => prev.filter(d => d.id !== id));
  };

  return (
    <Layout>
      <div className="container px-4 py-6 min-h-screen flex flex-col bg-blue-50">
        <div className="flex items-center justify-between mb-4">
          <Link href="/learn">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 bg-white px-4 py-1 rounded-full shadow-sm">
             <Trophy className="h-4 w-4 text-yellow-500" />
             <span className="font-bold">{score}</span>
          </div>
          <div className="font-mono font-bold text-xl w-10 text-center">{timeLeft}s</div>
        </div>

        {gameState === 'start' && (
           <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in">
              <img src={waterMascot} className="h-40 w-40 object-contain mb-6 animate-bounce" />
              <h1 className="font-display text-4xl font-bold text-blue-600 mb-2">Water Catch!</h1>
              <p className="text-muted-foreground mb-8">Catch the blue drops 💧<br/>Avoid the red bugs 🐞</p>
              <Button size="lg" className="w-48 text-lg h-14 rounded-full bg-blue-500 hover:bg-blue-600" onClick={() => setGameState('playing')}>
                 Play Now
              </Button>
           </div>
        )}

        {gameState === 'playing' && (
           <div className="flex-1 relative border-4 border-blue-200 rounded-2xl bg-white overflow-hidden shadow-inner">
              {drops.map(drop => (
                 <button
                    key={drop.id}
                    className={`absolute w-12 h-12 flex items-center justify-center text-3xl transition-transform active:scale-90`}
                    style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
                    onClick={() => handleCatch(drop.id, drop.type)}
                 >
                    {drop.type === 'good' ? '💧' : '🐞'}
                 </button>
              ))}
              <div className="absolute bottom-0 w-full h-1 bg-blue-500 animate-pulse"></div>
           </div>
        )}

        {gameState === 'end' && (
           <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in">
              <h1 className="font-display text-4xl font-bold mb-4">Time's Up!</h1>
              <Card className="w-full max-w-xs mb-8 border-2 border-blue-200 bg-white">
                 <CardContent className="p-6">
                    <p className="text-muted-foreground uppercase text-xs font-bold mb-2">Final Score</p>
                    <div className="text-5xl font-black text-blue-600 mb-4">{score}</div>
                    <div className="flex justify-center gap-1">
                       {[1,2,3].map(i => (
                         <Star key={i} className={`h-8 w-8 ${score > i * 30 ? 'fill-yellow-400 text-yellow-500' : 'text-gray-200'}`} />
                       ))}
                    </div>
                    <p className="mt-4 text-sm text-green-600 font-bold">+{Math.floor(score/2)} Coins Added!</p>
                 </CardContent>
              </Card>
              <Button size="lg" onClick={() => { setScore(0); setTimeLeft(30); setGameState('playing'); }}>
                 <RefreshCw className="mr-2 h-5 w-5" /> Play Again
              </Button>
           </div>
        )}
      </div>
    </Layout>
  );
}
