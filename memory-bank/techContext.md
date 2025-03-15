# Contexto Tecnológico do LaciaVisionLLM

## Stack Tecnológico

### Frontend
- **Framework**: React 18.3.1 com TypeScript
- **Build Tool**: Vite
- **Estilização**: TailwindCSS
- **Componentes UI**: Shadcn/UI (baseado em Radix UI)
- **Roteamento**: React Router DOM 6.26.2
- **Gerenciamento de Estado**: React Query (TanStack Query 5.56.2)
- **Animações**: Framer Motion 12.2.0
- **Formulários**: React Hook Form 7.53.0 + Zod 3.24.2
- **Visualização de Dados**: Recharts 2.12.7
- **Ícones**: Lucide React 0.462.0
- **Notificações**: Sonner 1.5.0 e Radix Toast
- **3D**: Three.js 0.173.0

### Backend
- **Plataforma**: Supabase
- **Banco de Dados**: PostgreSQL
- **Serverless Functions**: Edge Functions (Deno)
- **Autenticação**: Supabase Auth
- **Storage**: Google Cloud Storage (GCS)
- **API de IA**: Google Gemini 1.5 Pro

### DevOps
- **Versionamento**: Git
- **CI/CD**: GitHub Actions
- **Hospedagem**: Supabase Platform + Custom Hosting

## Estrutura de Diretórios

```
src/
├── components/        # Componentes React
│   ├── analysis/      # Componentes de análise de vídeos
│   ├── auth/          # Componentes de autenticação
│   ├── checklists/    # Componentes de gerenciamento de checklists
│   ├── dashboard/     # Componentes do dashboard
│   ├── evaluation/    # Componentes de avaliação médica
│   ├── landing/       # Componentes da landing page
│   ├── shared/        # Componentes compartilhados
│   ├── ui/            # Componentes de UI base (Shadcn)
│   └── videos/        # Componentes de gerenciamento de vídeos
│
├── hooks/             # React Hooks customizados
├── integrations/      # Integrações com APIs externas
│   └── supabase/      # Cliente e tipos do Supabase
│
├── lib/               # Utilitários e funções auxiliares
├── pages/             # Componentes de página
│   ├── auth/          # Páginas de autenticação
│   └── dashboard/     # Páginas do dashboard
│
├── types/             # Definições de tipos TypeScript
└── utils/             # Funções utilitárias

supabase/
├── functions/         # Edge Functions
│   ├── _shared/       # Código compartilhado entre funções
│   ├── analyze-video/ # Função de análise de vídeo
│   ├── manage-video/  # Função de gerenciamento de vídeo
│   └── send-contact/  # Função de envio de contato
│
└── migrations/        # Scripts de migração do banco de dados
```

## Ambientes e Configuração

### Variáveis de Ambiente
- `SUPABASE_URL`: URL da instância Supabase
- `SUPABASE_ANON_KEY`: Chave anônima do Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Chave de serviço do Supabase
- `GCS_CREDENTIALS`: Credenciais do Google Cloud Storage
- `GEMINI_API_KEY`: Chave de API do Google Gemini

### Integração com Gemini API
O sistema utiliza a API Gemini 1.5 Pro para análise multimodal de vídeos médicos. A integração é feita através da Edge Function `analyze-video`, que:
1. Recebe o URI do vídeo no GCS
2. Envia para a API Gemini com o prompt específico
3. Processa a resposta e extrai avaliações estruturadas
4. Salva os resultados no banco de dados

### Fluxo de Dados dos Vídeos
1. Frontend solicita URL de upload via função `manage-video`
2. Recebe URL assinada do GCS para upload direto
3. Upload é feito diretamente do navegador para o GCS
4. Após conclusão do upload, a função `analyze-video` é acionada
5. Resultados da análise são armazenados no banco de dados
6. Frontend é notificado via subscription do Supabase

## Dependências e Versões Críticas
- Node.js >= 18.0.0
- React 18.3.1
- TypeScript 5.x
- Supabase JS Client 2.48.1
- TanStack Query 5.56.2
- Gemini API 1.5 Pro
- Google Cloud Storage API 7.9.0
