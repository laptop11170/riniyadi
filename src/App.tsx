import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SelectExperience from "./pages/SelectExperience";
import Gallery from "./pages/Gallery";
import SweetMemories from "./pages/SweetMemories";
import MemoryEditor from "./components/MemoryEditor";
import NotFound from "./pages/NotFound";
import { UserProvider } from "@/lib/userContext";

const queryClient = new QueryClient();

import Jan12Story from "./pages/Jan12Story";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/enter-world" element={<SelectExperience />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/memories" element={<SweetMemories />} />
            <Route path="/memories/:id" element={<MemoryEditor />} />
            <Route path="/jan-12-story" element={<Jan12Story />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
