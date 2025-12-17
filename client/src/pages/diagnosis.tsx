import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic, Upload, FileText, Loader2, PlayCircle, Download, X, Languages } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type DiagnosisResult = {
  diagnosis: { en: string; hi: string };
  treatment: { en: string; hi: string }[];
  confidence: number;
};

export default function Diagnosis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI delay and randomize result to address "same output" feedback
    setTimeout(() => {
      setIsAnalyzing(false);
      
      const diagnoses = [
        {
          diagnosis: { en: "Leaf Rust (Puccinia triticina)", hi: "पत्ती का रतुआ (Leaf Rust)" },
          treatment: [
            { en: "Apply fungicide containing Tebuconazole.", hi: "टेबुकोनाज़ोल युक्त फफूंदनाशक का प्रयोग करें।" },
            { en: "Reduce irrigation frequency.", hi: "सिंचाई की आवृत्ति कम करें।" }
          ],
          confidence: 94
        },
        {
          diagnosis: { en: "Corn Leaf Blight", hi: "मक्का पत्ती झुलसा" },
          treatment: [
             { en: "Use resistant crop varieties.", hi: "प्रतिरोधी फसल किस्मों का उपयोग करें।" },
             { en: "Crop rotation with non-host crops.", hi: "गैर-मेजबान फसलों के साथ फसल चक्रण।" }
          ],
          confidence: 89
        },
        {
          diagnosis: { en: "Fall Armyworm", hi: "फॉल आर्मीवॉर्म (कीट)" },
          treatment: [
             { en: "Apply Neem oil based pesticides.", hi: "नीम के तेल आधारित कीटनाशकों का प्रयोग करें।" },
             { en: "Install pheromone traps.", hi: "फेरोमोन ट्रैप स्थापित करें।" }
          ],
          confidence: 92
        }
      ];

      // Pick a random diagnosis for the mockup
      const randomResult = diagnoses[Math.floor(Math.random() * diagnoses.length)];
      setResult(randomResult);
    }, 2000);
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF. 
    // For this prototype, we'll trigger the browser's print to PDF function.
    window.print();
    toast({
      title: language === 'en' ? "Downloading Report" : "रिपोर्ट डाउनलोड हो रही है",
      description: language === 'en' ? "Please select 'Save as PDF' in the print dialog." : "कृपया प्रिंट संवाद में 'पीडीएफ के रूप में सहेजें' चुनें।",
    });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <Layout>
      <div className="container px-4 py-8 max-w-2xl mx-auto print:max-w-none print:p-0">
        <div className="mb-8 print:hidden">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display text-3xl font-bold">Crop Doctor</h1>
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-2">
              <Languages className="h-4 w-4" />
              {language === 'en' ? "हिंदी में देखें" : "View in English"}
            </Button>
          </div>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? "Describe your crop's symptoms or upload a photo for instant AI diagnosis."
              : "अपनी फसल के लक्षणों का वर्णन करें या तत्काल एआई निदान के लिए एक तस्वीर अपलोड करें।"}
          </p>
        </div>

        <div className="grid gap-6 print:block">
          {/* Input Section - Hidden when printing */}
          <div className="print:hidden">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            <input 
              type="file" 
              ref={cameraInputRef} 
              className="hidden" 
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
            />
            
            <Card className={cn("border-2 border-dashed shadow-none overflow-hidden transition-all", selectedImage ? "border-primary" : "border-muted-foreground/25")}>
               <CardContent className="p-0">
                  {selectedImage ? (
                    <div className="relative w-full aspect-video bg-black/5">
                      <img src={selectedImage} alt="Selected crop" className="w-full h-full object-contain" />
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-md"
                        onClick={clearImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-center min-h-[160px] p-6">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors" onClick={triggerCameraInput}>
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="cursor-pointer">
                        <p className="font-medium">
                          {language === 'en' ? "Tap to upload photo" : "फोटो अपलोड करने के लिए टैप करें"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? "or take a picture of the affected area" : "या प्रभावित क्षेत्र की तस्वीर लें"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={triggerFileInput}>
                          {language === 'en' ? "Gallery" : "गैलरी"}
                        </Button>
                        <Button size="sm" onClick={triggerCameraInput}>
                          {language === 'en' ? "Camera" : "कैमरा"}
                        </Button>
                      </div>
                    </div>
                  )}
               </CardContent>
            </Card>
          </div>

          <div className="print:hidden">
            <Card>
              <CardContent className="p-4">
                 <div className="relative">
                  <Textarea 
                    placeholder={language === 'en' ? "Or describe the problem (e.g., yellow spots on leaves...)" : "या समस्या का वर्णन करें (जैसे, पत्तियों पर पीले धब्बे...)"}
                    className="min-h-[120px] pr-12 resize-none text-base"
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-2 bottom-2 text-primary hover:text-primary hover:bg-primary/10"
                  >
                    <Mic className="h-6 w-6" />
                  </Button>
                 </div>
              </CardContent>
            </Card>
          </div>

          <div className="print:hidden">
            <Button 
              size="lg" 
              className="w-full text-lg" 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                  {language === 'en' ? "Analyzing..." : "विश्लेषण कर रहा है..."}
                </>
              ) : (
                language === 'en' ? "Diagnose Problem" : "समस्या का निदान करें"
              )}
            </Button>
          </div>

          {/* Result Section */}
          {result && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 print:animate-none">
              <Card className="border-primary/20 bg-primary/5 overflow-hidden print:border-none print:bg-white print:shadow-none">
                <div className="bg-primary/10 p-4 border-b border-primary/10 flex items-center justify-between print:bg-transparent print:border-b-2 print:border-black print:px-0">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary print:text-black" />
                    <span className="font-bold text-primary print:text-black">
                      {language === 'en' ? "Diagnosis Report" : "निदान रिपोर्ट"}
                    </span>
                  </div>
                   <Button variant="ghost" size="sm" className="h-8 text-primary print:hidden" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-1" /> PDF
                  </Button>
                </div>
                <CardContent className="p-6 print:px-0">
                  {/* Print-only Header */}
                  <div className="hidden print:block mb-8">
                     <h1 className="text-3xl font-bold mb-2">EduFarma AI</h1>
                     <p className="text-gray-500">Smart Farming Assistance</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{result.diagnosis[language]}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground print:text-black">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 print:bg-black"></span>
                      {result.confidence}% {language === 'en' ? "Confidence Match" : "विश्वास मिलान"}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                       {language === 'en' ? "Recommended Treatment" : "अनुशंसित उपचार"}
                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full print:hidden">
                         <PlayCircle className="h-5 w-5 text-primary" />
                       </Button>
                    </h4>
                    <ul className="space-y-3">
                      {result.treatment.map((step, i) => (
                        <li key={i} className="flex gap-3 text-base">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold print:bg-black print:text-white">
                            {i + 1}
                          </span>
                          <span>{step[language]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-primary/10 print:border-black">
                     <p className="text-sm text-muted-foreground italic print:text-black">
                       * {language === 'en' ? "Disclaimer: This is an AI generated diagnosis. Please consult an expert for critical issues." : "अस्वीकरण: यह एआई जनित निदान है। कृपया गंभीर समस्याओं के लिए किसी विशेषज्ञ से सलाह लें।"}
                     </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
