
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import ProcessingQueue from "./pages/ProcessingQueue";
import KnowledgeSearch from "./pages/KnowledgeSearch";
import Analytics from "./pages/Analytics";
import TraceTrace from "./pages/TraceTrace";
import ExceptionDetail from "./pages/ExceptionDetail";
import LabDipDetail from "./pages/LabDipDetail";
import PipelineInsight from "./pages/PipelineInsight";
import NotFound from "./pages/NotFound";
import ChaseUps from "./pages/ChaseUps";
import Exceptions from "./pages/Exceptions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider defaultOpen={true}>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/processing" element={<ProcessingQueue />} />
                  <Route path="/search" element={<KnowledgeSearch />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/trace" element={<TraceTrace />} />
                  <Route path="/chaseups" element={<ChaseUps />} />
                  <Route path="/exceptions" element={<Exceptions />} />
                  <Route path="/exception/:id" element={<ExceptionDetail />} />
                  <Route path="/labdip/:id" element={<LabDipDetail />} />
                  <Route path="/pipeline-insight" element={<PipelineInsight />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
