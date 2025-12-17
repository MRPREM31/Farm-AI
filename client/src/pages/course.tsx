import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, BookOpen, Clock, Languages } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAtom } from "jotai";
import { atom } from "jotai";

// Global state for user points (simplified for mockup)
export const pointsAtom = atom(350);

// Mock data for courses with bilingual support
const coursesData: Record<string, any> = {
  "soil": {
    title: { en: "Soil Mastery", hi: "मिट्टी में महारत" },
    chapters: [
      {
        title: { en: "Understanding Soil pH", hi: "मिट्टी के पीएच को समझना" },
        content: {
          en: `
          <h3>What is Soil pH?</h3>
          <p>Soil pH is a measure of the acidity or alkalinity of the soil. The pH scale ranges from 0 to 14, with 7 being neutral. Most crops prefer a slightly acidic to neutral pH (6.0 to 7.0).</p>
          
          <h3>Why does it matter?</h3>
          <p>Soil pH affects nutrient availability. If the soil is too acidic or too alkaline, nutrients like nitrogen, phosphorus, and potassium become locked up and unavailable to plants.</p>
          `,
          hi: `
          <h3>मिट्टी का पीएच क्या है?</h3>
          <p>मिट्टी का पीएच मिट्टी की अम्लता या क्षारीयता का माप है। पीएच पैमाना 0 से 14 तक होता है, जिसमें 7 तटस्थ होता है। अधिकांश फसलें थोड़ा अम्लीय से तटस्थ पीएच (6.0 से 7.0) पसंद करती हैं।</p>
          
          <h3>यह क्यों मायने रखता है?</h3>
          <p>मिट्टी का पीएच पोषक तत्वों की उपलब्धता को प्रभावित करता है। यदि मिट्टी बहुत अम्लीय या बहुत क्षारीय है, तो नाइट्रोजन, फास्फोरस और पोटेशियम जैसे पोषक तत्व पौधों के लिए अनुपलब्ध हो जाते हैं।</p>
          `
        },
        duration: "5 min read"
      },
      {
        title: { en: "Organic Matter Basics", hi: "जैविक पदार्थ की मूल बातें" },
        content: {
          en: `
          <h3>The Life of Soil</h3>
          <p>Organic matter is the decomposed remains of plants and animals. It acts like a sponge, holding water and nutrients.</p>
          <p>Adding compost or manure is the best way to increase organic matter.</p>
          `,
          hi: `
          <h3>मिट्टी का जीवन</h3>
          <p>जैविक पदार्थ पौधों और जानवरों के विघटित अवशेष हैं। यह स्पंज की तरह काम करता है, पानी और पोषक तत्वों को धारण करता है।</p>
          <p>कम्पोस्ट या खाद डालना जैविक पदार्थ बढ़ाने का सबसे अच्छा तरीका है।</p>
          `
        },
        duration: "3 min read"
      }
    ]
  },
  "water": {
    title: { en: "Water Wisdom", hi: "जल ज्ञान" },
    chapters: [
      {
        title: { en: "Drip Irrigation", hi: "ड्रिप सिंचाई" },
        content: {
          en: `
          <h3>Drop by Drop</h3>
          <p>Drip irrigation delivers water directly to the plant roots. This reduces evaporation and weed growth.</p>
          <p>It can save up to 50% more water compared to flood irrigation.</p>
          `,
          hi: `
          <h3>बूंद-बूंद करके</h3>
          <p>ड्रिप सिंचाई पानी को सीधे पौधों की जड़ों तक पहुंचाती है। इससे वाष्पीकरण और खरपतवार की वृद्धि कम होती है।</p>
          <p>बाढ़ सिंचाई की तुलना में यह 50% तक अधिक पानी बचा सकता है।</p>
          `
        },
        duration: "4 min read"
      }
    ]
  },
  "pests": {
    title: { en: "Pest Control", hi: "कीट नियंत्रण" },
    chapters: [
      {
        title: { en: "Identifying Aphids", hi: "एफिड्स की पहचान" },
        content: {
          en: `
          <h3>Tiny Troublemakers</h3>
          <p>Aphids are small, soft-bodied insects that suck sap from plants. They often appear in large groups on the underside of leaves.</p>
          <p>Look for curled leaves or sticky "honeydew" residue.</p>
          `,
          hi: `
          <h3>छोटे संकटमोचक</h3>
          <p>एफिड्स छोटे, नरम शरीर वाले कीड़े हैं जो पौधों से रस चूसते हैं। वे अक्सर पत्तियों के नीचे बड़े समूहों में दिखाई देते हैं।</p>
          <p>मुड़ी हुई पत्तियों या चिपचिपे अवशेषों की तलाश करें।</p>
          `
        },
        duration: "3 min read"
      }
    ]
  },
  "fertilizer": {
    title: { en: "Fertilizer 101", hi: "उर्वरक 101" },
    chapters: [
      {
        title: { en: "NPK Ratios", hi: "NPK अनुपात" },
        content: {
            en: "<p>Learn about Nitrogen, Phosphorus, and Potassium balance.</p>",
            hi: "<p>नाइट्रोजन, फास्फोरस और पोटेशियम संतुलन के बारे में जानें।</p>"
        },
        duration: "6 min read"
      }
    ]
  },
   "harvest": {
    title: { en: "Harvest Timing", hi: "कटाई का समय" },
    chapters: [
      {
        title: { en: "Signs of Maturity", hi: "परिपक्वता के संकेत" },
        content: {
            en: "<p>Know exactly when to harvest for maximum yield.</p>",
            hi: "<p>अधिकतम उपज के लिए वास्तव में कब कटाई करनी है, यह जानें।</p>"
        },
        duration: "4 min read"
      }
    ]
  }
};

export default function Course() {
  const [match, params] = useRoute("/course/:id");
  const courseId = params?.id || "soil";
  const course = coursesData[courseId] || coursesData["soil"];
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [points, setPoints] = useAtom(pointsAtom);
  const { toast } = useToast();

  const handleNext = () => {
    if (currentChapter < course.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else {
      if (!isCompleted) {
          setIsCompleted(true);
          setPoints(p => p + 50);
          toast({
              title: language === 'en' ? "Course Completed!" : "कोर्स पूरा हुआ!",
              description: language === 'en' ? "You earned +50 points" : "आपने +50 अंक अर्जित किए",
              className: "bg-green-500 text-white border-none"
          });
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <Layout>
      <div className="container px-4 py-6 max-w-2xl mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/learn">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted/50">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold leading-tight">{course.title[language]}</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
               <BookOpen className="h-3 w-3" />
               <span>
                   {language === 'en' ? "Chapter" : "अध्याय"} {currentChapter + 1} / {course.chapters.length}
               </span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={toggleLanguage}>
             <Languages className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
           <Progress value={((currentChapter + (isCompleted ? 1 : 0)) / course.chapters.length) * 100} className="h-2" />
        </div>

        {/* Content Card */}
        <div className="flex-1">
           {isCompleted ? (
             <Card className="bg-green-50 border-green-200 animate-in zoom-in duration-300">
               <CardContent className="p-8 flex flex-col items-center text-center">
                 <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                   <CheckCircle2 className="h-10 w-10 text-green-600" />
                 </div>
                 <h2 className="text-2xl font-bold text-green-900 mb-2">{language === 'en' ? "Course Completed!" : "कोर्स पूरा हुआ!"}</h2>
                 <p className="text-green-800/80 mb-6">
                     {language === 'en' ? "You've earned 50 points for mastering this topic." : "इस विषय में महारत हासिल करने के लिए आपने 50 अंक अर्जित किए हैं।"}
                 </p>
                 <Link href="/learn">
                   <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                     {language === 'en' ? "Back to Learning" : "सीखने पर वापस जाएं"}
                   </Button>
                 </Link>
               </CardContent>
             </Card>
           ) : (
             <div className="animate-in fade-in slide-in-from-right-4 duration-300" key={currentChapter}>
               <Card className="border-none shadow-sm mb-4">
                 <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                       <h2 className="text-2xl font-bold text-primary">{course.chapters[currentChapter].title[language]}</h2>
                       <div className="flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                         <Clock className="h-3 w-3 mr-1" />
                         {course.chapters[currentChapter].duration}
                       </div>
                    </div>
                    
                    <div 
                      className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: course.chapters[currentChapter].content[language] }} 
                    />
                 </CardContent>
               </Card>

               <div className="flex gap-4 mt-8">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                    disabled={currentChapter === 0}
                  >
                    {language === 'en' ? "Previous" : "पिछला"}
                  </Button>
                  <Button className="flex-1 shadow-lg shadow-primary/20" onClick={handleNext}>
                    {currentChapter === course.chapters.length - 1 
                        ? (language === 'en' ? "Finish" : "समाप्त") 
                        : (language === 'en' ? "Next Chapter" : "अगला अध्याय")}
                  </Button>
               </div>
             </div>
           )}
        </div>
      </div>
    </Layout>
  );
}
