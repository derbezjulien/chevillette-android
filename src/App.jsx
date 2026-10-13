import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import MobileHeader from '@/components/MobileHeader';
import MobileNav from '@/components/MobileNav';
import { ThemeProvider } from 'next-themes';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import Home from '@/pages/Home';
import Estimation from '@/pages/Estimation';
import MentionsLegales from '@/pages/MentionsLegales';
import Confidentialite from '@/pages/Confidentialite';
import ConditionsUtilisation from '@/pages/ConditionsUtilisation';
import CommentCaMarche from '@/pages/CommentCaMarche';
import APropos from '@/pages/APropos';
import EnHome from '@/pages/en/Home';
import EnEstimate from '@/pages/en/Estimate';
import EnHowItWorks from '@/pages/en/HowItWorks';
import EnAbout from '@/pages/en/About';
import EnPrivacyPolicy from '@/pages/en/PrivacyPolicy';
import SiteFooter from '@/components/SiteFooter';
import AnimatedLayout from '@/components/AnimatedLayout';
import { EstimationFormProvider } from '@/context/EstimationFormContext';
import { MotionConfig } from 'framer-motion';

const AuthenticatedApp = () => {
  const { isLoadingPublicSettings } = useAuth();

  if (isLoadingPublicSettings) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <EstimationFormProvider>
      <Routes>
        <Route element={<AnimatedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/estimation" element={<Estimation />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
          <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/en" element={<EnHome />} />
          <Route path="/en/estimate" element={<EnEstimate />} />
          <Route path="/en/how-it-works" element={<EnHowItWorks />} />
          <Route path="/en/about" element={<EnAbout />} />
          <Route path="/en/privacy-policy" element={<EnPrivacyPolicy />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </EstimationFormProvider>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <AuthProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <ScrollToTop />
              <ErrorBoundary>
                <MobileHeader />
                <div className="pb-20 md:pb-0">
                  <AuthenticatedApp />
                  <SiteFooter />
                </div>
                <MobileNav />
              </ErrorBoundary>
            </Router>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App