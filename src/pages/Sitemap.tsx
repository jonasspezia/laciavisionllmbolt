import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { generateSitemapXml } from "@/utils/generateSitemap";

// Define public routes that should appear in sitemap
const publicRoutes = [
  { path: "/", label: "Página Inicial" },
  { path: "/auth/login", label: "Login" },
  { path: "/auth/signup", label: "Cadastro" },
  { path: "/documents", label: "Documentos" },
  { path: "/privacy-policy", label: "Política de Privacidade" },
  { path: "/terms-of-service", label: "Termos de Serviço" },
];

// Define dashboard routes
const dashboardRoutes = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/videos", label: "Vídeos" },
  { path: "/dashboard/analytics", label: "Análises" },
  { path: "/dashboard/checklists", label: "Checklists" },
  { path: "/dashboard/settings", label: "Configurações" },
];

export default function Sitemap() {
  useEffect(() => {
    // Generate sitemap.xml
    const baseUrl = window.location.origin;
    const allRoutes = [...publicRoutes, ...dashboardRoutes];
    const sitemapXml = generateSitemapXml(baseUrl, allRoutes);
    
    // Create Blob and download link
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Save sitemap.xml to public directory
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    
    // Create a function to handle automatic updates
    const updateSitemap = async () => {
      try {
        const response = await fetch('/sitemap.xml', {
          method: 'PUT',
          body: sitemapXml,
          headers: {
            'Content-Type': 'application/xml',
          },
        });
        
        if (!response.ok) {
          console.error('Failed to update sitemap.xml');
        }
      } catch (error) {
        console.error('Error updating sitemap.xml:', error);
      }
    };

    // Update sitemap when component mounts
    updateSitemap();

    // Cleanup
    return () => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Mapa do Site - LaciaVisionLLM</title>
        <meta name="robots" content="noindex" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-8">Mapa do Site</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Páginas Públicas</h2>
          <ul className="space-y-2">
            {publicRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className="text-primary hover:underline"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Área do Dashboard</h2>
          <ul className="space-y-2">
            {dashboardRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className="text-primary hover:underline"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
