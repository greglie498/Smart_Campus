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
import LocationDetails from "./pages/LocationDetails";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/schools/:slug" element={<SchoolDetails />} />
          <Route path="/cafeterias/:slug" element={<CafeteriaDetails />} />
          {/* Library, Auditorium, Freida Brown and Athletic Facilities
              used to each have their own fixed route + wrapper component
              duplicating LocationDetails. Now that LocationDetails fetches
              by slug from the backend, one dynamic route covers all of
              them — /locations/library, /locations/auditorium, etc. */}
          <Route path="/locations/:slug" element={<LocationDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

createRoot(document.getElementById("root")!).render(<App />);