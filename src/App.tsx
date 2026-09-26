import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import MobileContactBar from "./components/MobileContactBar";
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const DynamicPage = lazy(() => import("./pages/DynamicPage"));
import Index from "./pages/Index";
const NotFound = lazy(() => import("./pages/NotFound"));
const EmployeeLogin = lazy(() => import("./pages/EmployeeLogin"));
const EventsNews = lazy(() => import("./pages/EventsNews"));
const EmployeeBlog = lazy(() => import("./pages/EmployeeBlog"));
const Blog = lazy(() => import("./pages/Blog"));
const Network = lazy(() => import("./pages/Network"));
const Technology = lazy(() => import("./pages/Technology"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Careers = lazy(() => import("./pages/Careers"));
const CustomerPortal = lazy(() => import("./pages/CustomerPortal"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const CargoProtection = lazy(() => import("./pages/CargoProtection"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/legal/TermsAndConditions"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
import { QuoteProvider } from "./context/QuoteContext";
import QuoteDialog from "./components/QuoteDialog";

import { useVersionCheck } from "./hooks/useVersionCheck";

const queryClient = new QueryClient();

const VersionWatcher = () => {
  useVersionCheck();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <VersionWatcher />
        <QuoteProvider>
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/employee-login" element={<EmployeeLogin />} />
              <Route path="/events-news" element={<EventsNews />} />
              <Route path="/employee-portal/blog" element={<EmployeeBlog />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/industries/:slug" element={<IndustryDetail />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/customer-portal" element={<CustomerPortal />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/network" element={<Network />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/cargo-protection" element={<CargoProtection />} />
              <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/legal/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/legal/disclaimer" element={<Disclaimer />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/p/:slug" element={<DynamicPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
            <MobileContactBar />
            <QuoteDialog />


          </BrowserRouter>
        </QuoteProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
