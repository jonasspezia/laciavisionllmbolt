import { useNavigate } from "react-router-dom";
import { ContactDialog } from "@/components/shared/ContactDialog";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <footer 
      className="bg-gradient-to-br from-[rgba(0,20,40,0.9)] to-[rgba(1,25,44,0.95)] backdrop-blur-sm text-gray-50 py-12"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gradient-primary font-semibold mb-4">Sobre</h3>
            <p className="text-sm text-gray-200">
              Plataforma líder em análise de vídeos para avaliações práticas.
            </p>
          </div>
          <nav aria-label="Links rápidos">
            <h3 className="text-gradient-primary font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://teledocmedical.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-neural-start transition-colors duration-300"
                  aria-label="Site oficial Teledoc"
                >
                  Site Teledoc
                </a>
              </li>
              <li>
                <a 
                  href="https://ucpel.edu.br" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-neural-start transition-colors duration-300"
                  aria-label="Site oficial UCPEL"
                >
                  Site UCPEL
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Redes Sociais">
            <h3 className="text-gradient-primary font-semibold mb-4">Redes Sociais</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.instagram.com/teledocjourney/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-neural-start transition-colors duration-300 flex items-center gap-2"
                  aria-label="Instagram Teledoc"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/teledocjourney"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-neural-start transition-colors duration-300 flex items-center gap-2"
                  aria-label="Twitter Teledoc"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                  </svg>
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/@drjonasspezia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-neural-start transition-colors duration-300 flex items-center gap-2"
                  aria-label="YouTube Teledoc"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                  </svg>
                  YouTube
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h3 className="text-gradient-primary font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation('/privacy-policy')}
                  className="text-gray-200 hover:text-neural-start transition-colors duration-300"
                  aria-label="Ir para política de privacidade"
                >
                  Privacidade
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/terms-of-service')}
                  className="text-gray-200 hover:text-neural-start transition-colors duration-300"
                  aria-label="Ir para termos de uso"
                >
                  Termos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/documents')}
                  className="text-gray-200 hover:text-neural-start transition-colors duration-300"
                  aria-label="Ir para documentos"
                >
                  Documentos
                </button>
              </li>
              <li className="pt-2">
                <ContactDialog />
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col items-center space-y-6">
          <div className="flex items-center justify-center space-x-8">
            <img 
              src="https://i.postimg.cc/fRZXKtYX/favicon.png"
              alt="Teledoc Logo" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            <img 
              src="https://i.postimg.cc/7Y5yFjYP/logo-ucpel-512x512.png"
              alt="UCPEL Logo" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="mt-12 pt-8 border-t border-neural-middle/20 text-center text-sm text-gray-300">
            <p>&copy; 2025 Teledoc Journey Medical. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
