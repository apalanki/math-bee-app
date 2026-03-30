import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import QuizPage from "./pages/QuizPage";
import SpeedDrillPage from "./pages/SpeedDrillPage";
import ResultsPage from "./pages/ResultsPage";
import ParentReportPage from "./pages/ParentReportPage";
import MockExamPage from "./pages/MockExamPage";

// Use hash-based routing so GitHub Pages static hosting works correctly
// (no server-side routing needed — all navigation is handled via #hash)
function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/speed-drill" component={SpeedDrillPage} />
        <Route path="/results" component={ResultsPage} />
        <Route path="/report" component={ParentReportPage} />
        <Route path="/mock-exam" component={MockExamPage} />
        <Route path="/topic/:topicId" component={TopicPage} />
        <Route<{ topicId: string }> path="/quiz/:topicId">{(p) => <QuizPage key={p.topicId} topicId={p.topicId} />}</Route>
        <Route>{() => <Home />}</Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
