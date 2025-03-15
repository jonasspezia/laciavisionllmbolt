# Padrões de Sistema do LaciaVisionLLM

## Arquitetura Geral
O LaciaVisionLLM segue uma arquitetura baseada em:
- Frontend React com Vite e TypeScript
- Backend serverless com Supabase (PostgreSQL + Edge Functions)
- Armazenamento de vídeos no Google Cloud Storage (GCS)
- Integração com API Gemini para análise multimodal
- Sistema de autenticação e autorização via Supabase Auth

```mermaid
flowchart TD
    Client[Cliente Web] --> Frontend[Frontend React]
    Frontend --> Auth[Supabase Auth]
    Frontend --> API[Edge Functions]
    API --> DB[PostgreSQL - Supabase]
    API --> GCS[Google Cloud Storage]
    API --> Gemini[Google Gemini API]
    GCS --> Gemini
```

## Padrões de Design
1. **Component-Based Architecture**
   - Componentes pequenos e reutilizáveis
   - Separação clara de responsabilidades
   - Composição para construir interfaces complexas

2. **Custom Hooks Pattern**
   - Lógica de negócio encapsulada em hooks personalizados
   - Separação entre UI e lógica
   - Reutilização de lógica entre componentes

3. **Context API Pattern**
   - Contextos para gerenciamento de estado global
   - AuthContext para gerenciar autenticação
   - Evita prop drilling

4. **Service Layer Pattern**
   - Serviços encapsulados para integração com APIs
   - FileService, GCSService, AnalysisService
   - Isolamento da lógica de comunicação externa

5. **Protected Routes Pattern**
   - Componente ProtectedRoute para segurança
   - Redirecionamento automático para login
   - Verificação de permissões baseada em roles

## Fluxos de Dados Principais

### Fluxo de Upload e Análise de Vídeo
```mermaid
sequenceDiagram
    participant User as Usuário
    participant Frontend as Frontend React
    participant API as Supabase Edge Functions
    participant GCS as Google Cloud Storage
    participant Gemini as Google Gemini API
    participant DB as Supabase Database
    
    User->>Frontend: Seleciona vídeo para upload
    Frontend->>API: Solicita URL para upload
    API->>GCS: Gera URL assinada
    API->>DB: Cria registro de vídeo (status: uploading)
    API->>DB: Cria registro de análise (status: aguardando_upload)
    API->>Frontend: Retorna URL de upload
    Frontend->>GCS: Realiza upload do vídeo
    API->>GCS: Verifica upload completo
    API->>DB: Atualiza status do vídeo (uploaded)
    API->>Gemini: Envia vídeo para análise
    Gemini->>API: Retorna resultados da análise
    API->>DB: Salva resultados da análise
    Frontend->>DB: Consulta resultados (via subscription)
    DB->>Frontend: Notifica sobre nova análise
    Frontend->>User: Exibe resultados da análise
```

### Fluxo de Autenticação
```mermaid
sequenceDiagram
    participant User as Usuário
    participant Auth as AuthComponent
    participant Supabase as Supabase Auth
    participant DB as Database
    
    User->>Auth: Fornece credenciais
    Auth->>Supabase: Solicita autenticação
    Supabase->>DB: Verifica credenciais
    DB->>Supabase: Retorna resultado
    Supabase->>Auth: Retorna token JWT
    Auth->>User: Redireciona para Dashboard
```

## Estratégias de Dados
1. **Row Level Security (RLS)**
   - Políticas de segurança no nível do banco de dados
   - Controle de acesso granular baseado em roles e IDs

2. **Realtime Subscriptions**
   - Uso de canais realtime do Supabase
   - Atualizações instantâneas da interface

3. **Optimistic Updates**
   - Atualizações na UI antes da confirmação do servidor
   - Melhora percepção de performance

4. **Lazy Loading**
   - Carregamento sob demanda de componentes pesados
   - Melhora performance inicial
