interface Route {
  path: string;
  label: string;
}

export const generateSitemapXml = (baseUrl: string, routes: Route[]) => {
  const today = new Date().toISOString();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
};
