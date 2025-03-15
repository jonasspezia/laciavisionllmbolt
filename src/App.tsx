import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Documents from "./pages/Documents";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import Analytics from "./pages/dashboard/Analytics";
import Checklists from "./pages/dashboard/Checklists";
import Videos from "./pages/dashboard/Videos";
import Settings from "./pages/dashboard/Settings";
import Administrative from "./pages/dashboard/Administrative";
import Sitemap from "./pages/Sitemap";
import { StrictMode } from "react";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Index />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/auth/update-password" element={<UpdatePassword />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/documents" element={<Documents />} />
                
                {/* Rotas protegidas do dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                >
                  {/* Subrotas do dashboard */}
                  <Route index element={<DashboardIndex />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="videos" element={<Videos />} />
                  <Route path="checklists" element={<Checklists />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="administrative" element={<Administrative />} />
                </Route>

                {/* Rota 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </StrictMode>
    </QueryClientProvider>
  );
};

export default App;
