import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Diagnosis from "@/pages/diagnosis";
import Learn from "@/pages/learn";
import Weather from "@/pages/weather";
import Game from "@/pages/game";
import WaterGame from "@/pages/water-game";
import Course from "@/pages/course";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/diagnosis" component={Diagnosis} />
      <Route path="/learn" component={Learn} />
      <Route path="/weather" component={Weather} />
      <Route path="/game" component={Game} />
      <Route path="/water-game" component={WaterGame} />
      <Route path="/course/:id" component={Course} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
