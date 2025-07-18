import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PersonalityTest from "@/pages/personality-test";
import Results from "@/pages/results";
import NotFound from "@/pages/not-found";
import FillInfoPlaceholder from "@/pages/fill-info-placeholder";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PersonalityTest} />
      <Route path="/test" component={PersonalityTest} />
      <Route path="/results/:sessionId" component={Results} />
      <Route path="/fill-info-placeholder" component={FillInfoPlaceholder} />
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
