import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SchoolDetails from "./pages/SchoolDetails";
import CafeteriaDetails from "./pages/CafeteriaDetails";
import LocationDetails, {
  AthleticFacilitiesPage,
  AuditoriumPage,
  FreidaBrownPage,
  LibraryPage,
} from "./pages/LocationDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/schools/:slug" element={<SchoolDetails />} />
          <Route path="/cafeterias/:slug" element={<CafeteriaDetails />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/auditorium" element={<AuditoriumPage />} />
          <Route path="/freida-brown" element={<FreidaBrownPage />} />
          <Route path="/athletic-facilities" element={<AthleticFacilitiesPage />} />
          <Route path="/locations/:slug" element={<LocationDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
