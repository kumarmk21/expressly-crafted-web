import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import DynamicPage from "./pages/DynamicPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeBlog from "./pages/EmployeeBlog";
import Network from "./pages/Network";
import ServiceDetail from "./pages/ServiceDetail";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import CustomerPortal from "./pages/CustomerPortal";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsAndConditions from "./pages/legal/TermsAndConditions";
import Disclaimer from "./pages/legal/Disclaimer";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
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
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/employee-login" element={<EmployeeLogin />} />
              <Route path="/employee-portal/blog" element={<EmployeeBlog />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/customer-portal" element={<CustomerPortal />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/network" element={<Network />} />
              <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/legal/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/legal/disclaimer" element={<Disclaimer />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/p/:slug" element={<DynamicPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <QuoteDialog />
          </BrowserRouter>
        </QuoteProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
