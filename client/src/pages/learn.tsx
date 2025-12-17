import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Trophy, Star, Lock, Zap, BookOpen, BrainCircuit, Languages } from "lucide-react";
import { Link } from "wouter";
import learnIcon from "@assets/generated_images/3d_icon_of_a_sprouting_seedling.png";
import quizIcon from "@assets/generated_images/3d_icon_of_a_quiz_game_show_buzzer.png";
import { useAtom } from "jotai";
import { pointsAtom } from "./course";
import { useState } from "react";

export default function Learn() {
  const [points] = useAtom(pointsAtom);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const subjects = [
    {
      id: "soil",
      title: { en: "Soil Mastery", hi: "मिट्टी में महारत" },
      description: { en: "Learn to treat your soil right", hi: "मिट्टी का सही उपचार करना सीखें" },
      level: 1,
      maxLevel: 5,
      progress: 60,
      color: "bg-amber-100 text-amber-800",
      icon: "🌱"
    },
    {
      id: "water",
      title: { en: "Water Wisdom", hi: "जल ज्ञान" },
      description: { en: "Irrigation techniques", hi: "सिंचाई की तकनीकें" },
      level: 2,
      maxLevel: 5,
      progress: 30,
      color: "bg-blue-100 text-blue-800",
      icon: "💧"
    },
    {
      id: "pests",
      title: { en: "Pest Control", hi: "कीट नियंत्रण" },
      description: { en: "Protect from bugs", hi: "कीड़ों से बचाव" },
      level: 1,
      maxLevel: 5,
      progress: 0,
      color: "bg-red-100 text-red-800",
      icon: "🐞"
    },
    {
      id: "fertilizer",
      title: { en: "Fertilizer 101", hi: "उर्वरक 101" },
      description: { en: "Nutrient balance", hi: "पोषक तत्व संतुलन" },
      level: 1,
      maxLevel: 3,
      progress: 0,
      color: "bg-purple-100 text-purple-800",
      icon: "💊"
    }
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <Layout>
      <div className="bg-primary/5 min-h-screen pb-20">
        {/* Header with Stats */}
        <div className="bg-primary pt-8 pb-12 px-4 rounded-b-[2rem] shadow-lg relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-3xl"></div>
             <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl"></div>
           </div>

           <div className="relative z-10 flex items-center justify-between mb-6 text-primary-foreground">
             <div>
               <h1 className="font-display text-2xl font-bold">{language === 'en' ? "Hello, Farmer!" : "नमस्ते किसान!"}</h1>
               <p className="opacity-90 text-sm">{language === 'en' ? "Ready to learn today?" : "आज सीखने के लिए तैयार हैं?"}</p>
             </div>
             <div className="flex flex-col items-end gap-2">
                <Button variant="ghost" size="sm" onClick={toggleLanguage} className="h-8 w-8 p-0 rounded-full bg-white/10 text-white hover:bg-white/20">
                   <Languages className="h-4 w-4" />
                </Button>
                <div className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold border border-white/20 shadow-sm">
                   <Trophy className="h-4 w-4 text-yellow-300 mr-1 fill-yellow-300" />
                   {points}
                </div>
             </div>
           </div>

           {/* Daily Challenge Card - Gamified Call to Action */}
           <div className="relative z-20 mt-2">
             <Link href="/game">
               <Card className="border-0 shadow-xl bg-gradient-to-r from-accent to-yellow-400 cursor-pointer hover:scale-[1.02] transition-transform">
                 <CardContent className="p-4 flex items-center justify-between">
                   <div className="text-accent-foreground">
                     <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-white/30 border-none text-accent-foreground font-bold">
                            {language === 'en' ? "Daily Challenge" : "दैनिक चुनौती"}
                        </Badge>
                     </div>
                     <h3 className="font-display text-xl font-bold leading-tight">
                         {language === 'en' ? "Test Your Knowledge!" : "अपने ज्ञान का परीक्षण करें!"}
                     </h3>
                     <p className="text-sm font-medium opacity-80 mt-1">
                         {language === 'en' ? "Win +50 Points today" : "आज +50 अंक जीतें"}
                     </p>
                   </div>
                   <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner shrink-0">
                      <Zap className="h-8 w-8 text-accent-foreground fill-current" />
                   </div>
                 </CardContent>
               </Card>
             </Link>
           </div>
        </div>

        <div className="container px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
             <h2 className="font-display text-xl font-bold flex items-center gap-2">
               <BookOpen className="h-5 w-5 text-primary" />
               {language === 'en' ? "Learning Paths" : "सीखने के रास्ते"}
             </h2>
          </div>

          <div className="grid gap-4">
            {subjects.map((subject) => (
              <Card key={subject.id} className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex h-full">
                    {/* Left Icon Strip */}
                    <div className={`w-16 flex flex-col items-center justify-center shrink-0 ${subject.color}`}>
                       <span className="text-3xl filter drop-shadow-sm">{subject.icon}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg">{subject.title[language]}</h3>
                        {subject.progress > 0 && (
                           <span className="text-xs font-bold text-muted-foreground">Lvl {subject.level}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{subject.description[language]}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Progress value={subject.progress} className="h-2 flex-1" />
                          <span className="text-xs font-bold text-muted-foreground w-8 text-right">{subject.progress}%</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                           <div className="flex -space-x-2">
                              {[1,2,3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-500">
                                  {i}
                                </div>
                              ))}
                           </div>
                           <Link href={`/course/${subject.id}`}>
                             <Button size="sm" className="h-8 rounded-full px-4 text-xs">
                               {language === 'en' ? "Resume" : "फिर शुरू करें"} <Play className="h-3 w-3 ml-1 fill-current" />
                             </Button>
                           </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 mb-4">
            <h2 className="font-display text-xl font-bold flex items-center gap-2 mb-4">
               <BrainCircuit className="h-5 w-5 text-primary" />
               {language === 'en' ? "Mini Games" : "मिनी गेम्स"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
               <Link href="/game">
                 <Card className="cursor-pointer hover:shadow-md border-none shadow-sm bg-purple-50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                       <img src={quizIcon} alt="Quiz" className="w-16 h-16 mb-2 drop-shadow-md object-contain" />
                       <h3 className="font-bold text-purple-900">{language === 'en' ? "Crop Quiz" : "फसल प्रश्नोत्तरी"}</h3>
                       <p className="text-xs text-purple-700/70">{language === 'en' ? "Identify diseases" : "रोगों को पहचानें"}</p>
                    </CardContent>
                 </Card>
               </Link>
               <Link href="/water-game">
                 <Card className="cursor-pointer hover:shadow-md border-none shadow-sm bg-blue-50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                       <div className="w-16 h-16 mb-2 bg-blue-200 rounded-full flex items-center justify-center">
                          <span className="text-3xl">💧</span>
                       </div>
                       <h3 className="font-bold text-blue-900">{language === 'en' ? "Water Catch" : "जल पकड़"}</h3>
                       <p className="text-xs text-blue-700/70">{language === 'en' ? "Save water!" : "पानी बचाएं!"}</p>
                    </CardContent>
                 </Card>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
