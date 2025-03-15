import { useState, useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

// Componentes carregados imediatamente (críticos para UX inicial)
import Navbar from "@/components/landing/Navbar";
import Hero3D from "@/components/landing/Hero3D";
import USP from "@/components/landing/USP";

// Lazy loading para componentes não críticos
const Features = lazy(() => import("@/components/landing/Features"));
const LaciaFeatures = lazy(() => import("@/components/landing/LaciaFeatures"));
const LaciaWorkflow = lazy(() => import("@/components/landing/LaciaWorkflow"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const CTA = lazy(() => import("@/components/landing/CTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const EmailCapture = lazy(() => import("@/components/landing/EmailCapture"));
const LiveChat = lazy(() => import("@/components/chat/LiveChat"));
const ContactDialog = lazy(() => import("@/components/shared/ContactDialog").then(mod => ({ default: mod.ContactDialog })));

// Componentes de Loading otimizados
const FeatureLoadingFallback = () => (
  <div className="w-full space-y-4 p-8 animate-pulse">
    <Skeleton className="h-8 w-3/4 mx-auto" />
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-48 w-full rounded-xl" />
      ))}
    </div>
  </div>
);

const SimpleLoadingFallback = () => (
  <div className="w-full h-[200px] flex items-center justify-center">
    <Skeleton className="h-full w-full max-w-3xl mx-auto rounded-xl" />
  </div>
);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const preloadResources = async () => {
      if (typeof window !== 'undefined') {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        const handleResize = () => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        window.addEventListener('resize', handleResize);
        setIsLoaded(true);

        return () => window.removeEventListener('resize', handleResize);
      }
    };

    preloadResources();
  }, []);

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LaciaVisionLLM",
    "applicationCategory": "HealthcareApplication",
    "operatingSystem": "Web browser",
    "description": "Plataforma revolucionária de IA multimodal para avaliação médica. Automatize e gere feedback avaliativo para procedimentos médicos e exames práticos.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "applicationSubCategory": "Medical Education",
    "releaseNotes": "Avaliação automatizada de procedimentos médicos usando IA multimodal",
    "contentRating": "General",
    "url": "https://laciavisionllm.com",
    "provider": {
      "@type": "Organization",
      "name": "LaciaVisionLLM",
      "url": "https://laciavisionllm.com"
    }
  };

  return (
    <div 
      className="min-h-screen min-h-[calc(var(--vh,1vh)*100)] w-screen max-w-[100vw] overflow-x-hidden"
      role="main"
      aria-label="Landing page principal content"
    >
      <Helmet>
        <title>LaciaVisionLLM | Inteligência artificial multimodal para avaliação médica</title>
        <meta name="description" content="Plataforma revolucionária de IA multimodal para avaliação médica. Automatize e gere feedback avaliativo para procedimentos médicos e exames práticos com precisão e eficiência." />
        <meta name="keywords" content="IA multimodal, avaliação médica em vídeo, educação médica, avaliação por IA, avaliação de procedimentos médicos, análise automatizada, feedback médico" />
        <meta property="og:title" content="LaciaVisionLLM - Plataforma de Avaliação Médica por IA" />
        <meta property="og:description" content="Transforme a educação médica com avaliações de vídeo potencializadas por IA multimodal. Feedback preciso e automático para procedimentos médicos." />
        <meta property="og:image" content="https://i.postimg.cc/MGS2jT0X/logo-laciavisionllm-512x512.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://laciavisionllm.com" />
        <meta property="og:site_name" content="LaciaVisionLLM" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LaciaVisionLLM - Avaliação Médica por IA" />
        <meta name="twitter:description" content="Plataforma de IA multimodal para avaliação automática de procedimentos médicos." />
        <meta name="twitter:image" content="https://i.postimg.cc/MGS2jT0X/logo-laciavisionllm-512x512.png" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="LaciaVisionLLM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://laciavisionllm.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <html lang="pt-BR" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Componentes críticos carregados imediatamente */}
      <Navbar />
      <Hero3D isLoaded={isLoaded} />
      <USP />

      {/* Contact Dialog com loading personalizado */}
      <div className="container mx-auto px-4 text-center my-24">
        <Suspense fallback={<SimpleLoadingFallback />}>
          <ContactDialog />
        </Suspense>
      </div>

      {/* Features com loading personalizado */}
      <Suspense fallback={<FeatureLoadingFallback />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<FeatureLoadingFallback />}>
        <LaciaFeatures />
      </Suspense>
      
      <Suspense fallback={<FeatureLoadingFallback />}>
        <LaciaWorkflow />
      </Suspense>

      {/* Seções secundárias com loading simples */}
      <Suspense fallback={<SimpleLoadingFallback />}>
        <EmailCapture />
      </Suspense>
      
      <Suspense fallback={<SimpleLoadingFallback />}>
        <FAQ />
      </Suspense>
      
      <Suspense fallback={<SimpleLoadingFallback />}>
        <CTA />
      </Suspense>
      
      <Suspense fallback={<SimpleLoadingFallback />}>
        <Footer />
      </Suspense>

      {/* LiveChat carregado por último */}
      <Suspense fallback={null}>
        <LiveChat />
      </Suspense>
    </div>
  );
};

export default Index;
