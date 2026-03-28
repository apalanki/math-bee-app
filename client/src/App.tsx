import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import QuizPage from "./pages/QuizPage";
import SpeedDrillPage from "./pages/SpeedDrillPage";
import ResultsPage from "./pages/ResultsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/topic/:topicId" component={TopicPage} />
      <Route path="/quiz/:topicId" component={QuizPage} />
      <Route path="/speed-drill" component={SpeedDrillPage} />
      <Route path="/results" component={ResultsPage} />
      <Route>{() => <Home />}</Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
