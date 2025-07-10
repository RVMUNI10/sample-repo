import { Routes, Route } from "react-router-dom";
import PromptRefiner from "./prompt-refiner";
import CodingPage from "./CodingPage";
import WebSearchPage from "./WebSearchPage";
import ResearchPage from "./ResearchPage";
import AITeachingPage from "./AITeachingPage";
import SummaryPage from "./SummaryPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PromptRefiner />} />
      <Route path="/coding" element={<CodingPage />} />
      <Route path="/web-search" element={<WebSearchPage />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/ai-teaching" element={<AITeachingPage />} />
      <Route path="/summary-generator" element={<SummaryPage />} />
    </Routes>
  );
}
