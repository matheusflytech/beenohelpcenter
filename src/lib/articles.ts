export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  icon: string;
  content: string;
};

export type Category = {
  key: string;
  label: string;
  items: { slug: string; title: string }[];
};

export const articles: Article[] = [
  //  PRIMEIROS PASSOS 
  {
    slug: "visao-geral",
    title: "Visão geral do Beeno",
    description: "O que é o Beeno CRM, sua estrutura e como começar.",
    category: "primeiros-passos",
    categoryLabel: "Primeiros passos",
    icon: "inicio",
    content: `## O que é o Beeno

O **Beeno** é um CRM completo desenvolvido pela Skeps para gestão comercial, marketing e atendimento. Centraliza dados de clientes, automatiza processos e integra canais de comunicação em um único lugar.

## Objetos principais

| Objeto | Descrição |
|--------|-----------|
| **Contatos** | Leads e clientes, com histórico completo |
| **Negócios** | Oportunidades de venda organizadas em pipelines |
| **Empresas** | Organizações associadas a contatos |
| **Pipelines** | Funis com etapas customizáveis |
| **Propriedades** | Campos customizados por objeto |
| **Tarefas** | Atividades e follow-ups do time |
| **Segmentos** | Grupos filtrados de contatos |
| **Automações** | Fluxos, chatbots e agentes de IA |

## Autenticação na API

Todas as requisições à API usam o header \`ELOZ-APIKEY\`. Gere sua chave em **Configurações → Integrações → API Tokens**.

\`\`\`bash
curl https://app.beeno.ai/{CLIENT_ID}/api/v1/contacts \\
  -H "ELOZ-APIKEY: sua_chave_aqui"
\`\`\`

## Formato de resposta padrão

\`\`\`json
{
  "total": 150,
  "results": [{ "id": 1, "properties": { "firstname": "João" } }],
  "cursor": { "next": "abc123", "nextLink": "?cursor=abc123" },
  "hasMore": true
}
\`\`\`

## Paginação

A API usa **paginação por cursor**. Parâmetros: \`limit\` (máx 100) e \`cursor\`. Quando \`hasMore\` for \`true\`, use \`cursor.next\` na próxima requisição.

## Códigos de erro

| Código | Descrição |
|--------|-----------|
| 400 | BadRequestError — parâmetros inválidos |
| 401 | UnauthorizedError — chave inválida |
| 402 | LimitExceededError — limite do plano |
| 404 | NotFoundError — recurso não encontrado |
| 409 | ConflictError — registro duplicado |
| 429 | ManyRequestError — rate limit excedido |
| 500 | InternalError — erro interno |`,
  },
  {
    slug: "glossario",
    title: "Glossário CRM",
    description: "Principais termos e conceitos do Beeno CRM.",
    category: "primeiros-passos",
    categoryLabel: "Primeiros passos",
    icon: "glossario",
    content: `## Objetos

Objetos são os tipos de registros no CRM: **Contatos**, **Negócios** e **Empresas**. Cada objeto possui propriedades que armazenam informações específicas.

## Propriedades

Campos que descrevem e armazenam informações sobre cada objeto. Podem ser padrão (nome, e-mail, telefone) ou **customizadas** (criadas pela sua equipe).

## Segmentos

Grupos específicos de contatos filtrados com base em critérios de propriedades. Úteis para campanhas e automações segmentadas.

## Pipeline

Representação visual das etapas do processo de vendas ou qualquer fluxo operacional. Acompanha o progresso de leads desde o primeiro contato até o fechamento.

## Landing Page

Página web criada para capturar leads com foco em uma única ação (CTA). No Beeno, pode ser criada nativamente e integrada ao CRM.

## Lead Score (Pontuação)

Sistema de pontuação que avalia o nível de interesse de um lead com base em suas ações (e-mails abertos, páginas visitadas, formulários preenchidos). Ajuda a priorizar os contatos mais quentes.

## Fluxo de Automação

Sequência automatizada de ações (envio de mensagens, criação de tarefas, movimentação de pipeline) disparadas por eventos ou condições específicas.

## Template de WhatsApp

Modelos de mensagem pré-aprovados pela Meta para iniciar conversas via WhatsApp Business API. Necessários após a janela de 24 horas de inatividade.

## COEX (Coexistência)

Recurso que permite usar o mesmo número de WhatsApp na API e no aplicativo pessoal simultaneamente, com algumas limitações de funcionalidade.

## Webhook

Notificação automática enviada para uma URL externa quando um evento ocorre no CRM (novo lead, mudança de etapa, etc.).`,
  },
  {
    slug: "conta-e-configuracoes",
    title: "Conta e configurações",
    description: "Ajustes gerais, personalização e segurança da conta.",
    category: "primeiros-passos",
    categoryLabel: "Primeiros passos",
    icon: "config",
    content: `## Configurações gerais

Acesse **Configurações** no menu lateral para ajustar:
- Dados da empresa (nome, logo, fuso horário)
- Idioma padrão da plataforma
- Identidade visual (cores e logo para e-mails)
- Domínios de e-mail verificados

## Personalização de marca

Configure a identidade visual que aparece nos e-mails enviados pela plataforma:
1. Acesse **Configurações → Conta**
2. Faça upload do logo (recomendado: PNG transparente, mín. 300px)
3. Defina as cores primária e secundária

## Domínios de e-mail

Para enviar e-mails com seu domínio personalizado:
1. Acesse **Configurações → Domínios**
2. Adicione o domínio desejado
3. Configure os registros DNS fornecidos (SPF, DKIM, DMARC)
4. Aguarde a validação (pode levar até 48h)

## Segurança

- **2FA**: Recomendamos ativar autenticação de dois fatores para todos os administradores
- **Tokens de API**: Gere e revogue chaves em **Configurações → Integrações → API Tokens**
- **Revisão periódica**: Revogue tokens não utilizados regularmente
- **Logs de acesso**: Acompanhe acessos suspeitos em Configurações → Segurança

## Notificações

Configure quais eventos geram notificações por e-mail ou dentro da plataforma em **Configurações → Notificações**.`,
  },
  {
    slug: "usuarios-permissoes",
    title: "Usuários e permissões",
    description: "Convide usuários, configure papéis e equipes.",
    category: "primeiros-passos",
    categoryLabel: "Primeiros passos",
    icon: "usuarios",
    content: `## Convidando usuários

1. Acesse **Configurações → Usuários**
2. Clique em **Convidar usuário**
3. Informe o e-mail e selecione o papel (Admin, Gerente, Operador)
4. O usuário receberá um e-mail com link de acesso

## Papéis disponíveis

| Papel | Descrição |
|-------|-----------|
| **Admin** | Acesso total, incluindo configurações e faturamento |
| **Gerente** | Visualiza todos os dados, sem acesso a configurações críticas |
| **Operador** | Acesso restrito ao pipeline e contatos definidos |

## Permissões personalizadas

Para controle granular, crie **grupos de permissão**:
1. Acesse **Configurações → Usuários → Grupos de Permissão**
2. Crie um grupo com nome descritivo
3. Defina permissões por módulo (visualizar, editar, deletar)
4. Atribua usuários ao grupo

## Equipes

Agrupe usuários em equipes para distribuir leads automaticamente:

\`\`\`json
POST /api/v1/teams
{
  "name": "Vendas SP",
  "members": [1, 2, 3]
}
\`\`\`

Para adicionar membros a uma equipe existente:

\`\`\`json
POST /api/v1/teams/add-members
{
  "teamId": 1,
  "userIds": [4, 5]
}
\`\`\`

## Autenticação de dois fatores (2FA)

Cada usuário pode ativar 2FA em **Perfil → Segurança → Ativar 2FA**. Use um app autenticador (Google Authenticator, Authy).

## Via API

\`\`\`json
POST /api/v1/users
{
  "name": "Maria Silva",
  "email": "maria@empresa.com",
  "role": "operator"
}
\`\`\``,
  },

  //  CRM 
  {
    slug: "contatos",
    title: "Contatos",
    description: "Crie, busque, atualize e gerencie contatos no CRM.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "contato",
    content: `## O que são contatos

Contatos são o objeto central do CRM — representam leads, clientes e qualquer pessoa com quem sua empresa se relaciona. Cada contato tem propriedades padrão e customizadas, histórico de interações e associações com negócios e empresas.

## Criar contato

\`\`\`json
POST /api/v1/contacts
{
  "properties": {
    "firstname": "João",
    "lastname": "Silva",
    "email": "joao@empresa.com",
    "phone": "5511999999999"
  }
}
\`\`\`

## Buscar por telefone 

**Sempre use \`search-cellphone\`** para buscar por telefone. Nunca use o endpoint \`/search\` com filtro de phone.

\`\`\`json
POST /api/v1/contacts/search-cellphone
{
  "value": "5511999999999"
}
\`\`\`

## Buscar com filtros

\`\`\`json
POST /api/v1/contacts/search
{
  "filters": [
    { "propertyName": "state", "operator": "EQ", "value": "SP" },
    { "propertyName": "owner_id", "operator": "EQ", "value": "5" }
  ],
  "properties": ["phone", "email", "owner_id"]
}
\`\`\`

## Atualizar contato

\`\`\`json
PATCH /api/v1/contacts/{contactId}
{
  "properties": {
    "firstname": "João Atualizado",
    "custom_field": "novo valor"
  }
}
\`\`\`

## Listar contatos

\`\`\`
GET /api/v1/contacts?limit=100&cursor=CURSOR_AQUI&properties=phone,email
\`\`\`

## Criar em lote

\`\`\`json
POST /api/v1/contacts/batch/create
{
  "inputs": [
    { "properties": { "firstname": "João", "email": "joao@email.com" } },
    { "properties": { "firstname": "Maria", "email": "maria@email.com" } }
  ]
}
\`\`\`

## Ações em contatos

Na interface, acesse um contato para:
- Adicionar notas (geral, e-mail, ligação, reunião, WhatsApp)
- Criar tarefas e follow-ups
- Iniciar conversa no WhatsApp
- Enviar e-mail
- Associar a negócios e empresas
- Adicionar etiquetas

## Exportar contatos

Em **CRM → Contatos**, use os filtros e clique em **Exportar** para baixar um CSV com os dados selecionados.`,
  },
  {
    slug: "negocios",
    title: "Negócios",
    description: "Gerencie oportunidades de venda em pipelines.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "negocio",
    content: `## O que são negócios

Negócios (deals) representam oportunidades de venda. Cada negócio pertence a um pipeline e está em uma etapa específica, com valor, responsável e histórico de atividades.

## Criar negócio

\`\`\`json
POST /api/v1/deals
{
  "properties": {
    "name": "Proposta João Silva",
    "pipeline_id": 1,
    "stage_id": 5,
    "amount": "5000",
    "owner_id": "3"
  },
  "associations": {
    "contacts": [123],
    "companies": [45]
  }
}
\`\`\`

## Mover de etapa

\`\`\`json
PATCH /api/v1/deals/{dealId}
{
  "properties": {
    "stage_id": 8
  }
}
\`\`\`

## Buscar negócios com filtros

\`\`\`json
POST /api/v1/deals/search
{
  "filters": [
    { "propertyName": "stage_id", "operator": "EQ", "value": "5" },
    { "propertyName": "amount", "operator": "GT", "value": "1000" }
  ],
  "properties": ["name", "amount", "owner_id", "stage_id"]
}
\`\`\`

## Associar produtos

\`\`\`json
POST /api/v1/deals/products/{dealId}
{
  "products": [
    { "id": 1, "quantity": 2, "discount": 10 }
  ]
}
\`\`\`

## Visão Kanban

O Kanban exibe os negócios em colunas por etapa. Configure quais propriedades aparecem nos cards em **Configurações → Pipelines → Personalização do Kanban**.

## Colaboração

Adicione colaboradores a um negócio para compartilhar visibilidade sem transferir a propriedade. Acesse o negócio e clique em **+ Colaborador**.

## Criar em lote

\`\`\`json
POST /api/v1/deals/batch/create
{
  "inputs": [
    { "properties": { "name": "Deal 1", "pipeline_id": 1, "stage_id": 3 } },
    { "properties": { "name": "Deal 2", "pipeline_id": 1, "stage_id": 3 } }
  ]
}
\`\`\``,
  },
  {
    slug: "empresas",
    title: "Empresas",
    description: "Gerencie organizações associadas a contatos e negócios.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "empresa",
    content: `## O que são empresas

Empresas são organizações (CNPJs, contas corporativas) que você pode associar a contatos e negócios. Útil para operações B2B onde múltiplos contatos pertencem a uma mesma empresa.

## Criar empresa

\`\`\`json
POST /api/v1/companies
{
  "properties": {
    "name": "Empresa ABC Ltda",
    "domain": "empresaabc.com.br",
    "city": "São Paulo",
    "state": "SP"
  }
}
\`\`\`

## Buscar empresas

\`\`\`json
POST /api/v1/companies/search
{
  "filters": [
    { "propertyName": "state", "operator": "EQ", "value": "SP" }
  ]
}
\`\`\`

## Associar contato a empresa

\`\`\`
POST /api/v1/associations/contact/{contactId}/company/{companyId}
\`\`\`

## Atualizar empresa

\`\`\`json
PATCH /api/v1/companies/{companyId}
{
  "properties": {
    "name": "Novo nome",
    "phone": "5511999999999"
  }
}
\`\`\`

## Criar em lote

\`\`\`json
POST /api/v1/companies/batch/create
{
  "inputs": [
    { "properties": { "name": "Empresa A" } },
    { "properties": { "name": "Empresa B" } }
  ]
}
\`\`\``,
  },
  {
    slug: "pipelines",
    title: "Pipelines",
    description: "Crie e configure funis de venda com etapas customizadas.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "pipeline",
    content: `## O que são pipelines

Pipelines são funis de vendas que organizam negócios em etapas sequenciais, do primeiro contato ao fechamento. Cada empresa pode ter múltiplos pipelines para diferentes processos (vendas, pós-venda, reativação, etc.).

## Criar pipeline via API

\`\`\`json
POST /api/v1/deals/pipeline
{
  "name": "Funil Comercial",
  "stages": [
    { "name": "Primeiro contato", "probability": 10 },
    { "name": "Qualificação", "probability": 30 },
    { "name": "Proposta enviada", "probability": 60 },
    { "name": "Negociação", "probability": 80 },
    { "name": "Fechado ganho", "probability": 100 },
    { "name": "Fechado perdido", "probability": 0 }
  ]
}
\`\`\`

## Listar pipelines

\`\`\`
GET /api/v1/deals/pipelines
\`\`\`

## Personalização do Kanban

Em **Configurações → Pipelines → Personalização**, você pode:
- Escolher quais propriedades aparecem nos cards
- Definir a ordem de exibição dos campos
- Adicionar indicadores visuais por propriedade

## Regras de etapa

Configure restrições para controlar quando um negócio pode avançar:
1. Acesse **Configurações → Pipelines**
2. Selecione o pipeline e clique em **Regras**
3. Defina propriedades obrigatórias por etapa

## Rótulos

Adicione rótulos coloridos a negócios para identificação visual rápida (ex: "Urgente", "VIP", "Em negociação"). Configure em **Configurações → Rótulos**.`,
  },
  {
    slug: "propriedades",
    title: "Propriedades",
    description: "Crie e gerencie campos customizados para objetos do CRM.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "propriedade",
    content: `## O que são propriedades

Propriedades são campos que armazenam informações sobre objetos (contatos, negócios, empresas, produtos). O Beeno tem propriedades padrão (nome, e-mail, telefone) e permite criar propriedades customizadas.

## Criar propriedade customizada

\`\`\`json
POST /api/v1/properties
{
  "properties": {
    "name": "canal_de_origem",
    "group": "core",
    "object": "contact",
    "type": "select",
    "isRequired": false,
    "isUniqueIdentifier": false,
    "isFormVisible": false
  }
}
\`\`\`

>  **Importante:** Use \`"object"\` (não \`"objectType"\`). O campo \`"isFormVisible"\` é obrigatório mesmo que não apareça na documentação principal.

## Tipos de propriedade

| Tipo | Descrição |
|------|-----------|
| \`text\` | Texto livre |
| \`number\` | Valor numérico |
| \`date\` | Data (YYYY-MM-DD) |
| \`select\` | Lista de opções |
| \`checkbox\` | Verdadeiro/falso |
| \`currency\` | Valor monetário |

## Objetos suportados

- \`contact\` — propriedades de contatos
- \`deal\` — propriedades de negócios
- \`company\` — propriedades de empresas
- \`product\` — propriedades de produtos

## Listar propriedades de um objeto

\`\`\`
GET /api/v1/properties/contact
GET /api/v1/properties/deal
GET /api/v1/properties/company
\`\`\`

## Propriedades condicionais

Configure propriedades que só aparecem quando outra propriedade tem um valor específico. Em **Configurações → Propriedades → Condicionais**.

## Configurações de exibição

Escolha quais propriedades aparecem e em qual ordem nas páginas de contatos, negócios e empresas em **Configurações → Propriedades → Configurações de Exibição**.`,
  },
  {
    slug: "tarefas",
    title: "Tarefas",
    description: "Crie e gerencie atividades e follow-ups do time.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "tarefa",
    content: `## O que são tarefas

Tarefas são atividades que precisam ser realizadas pela equipe — ligações, reuniões, follow-ups, e-mails. Podem ser associadas a contatos, negócios e empresas.

## Criar tarefa

\`\`\`json
POST /api/v1/tasks
{
  "properties": {
    "title": "Ligar para João — proposta",
    "due_date": "2026-07-15",
    "type": "call",
    "priority": "high",
    "owner_id": "3"
  },
  "associations": {
    "contacts": [123],
    "deals": [456]
  }
}
\`\`\`

## Tipos de tarefa

- \`call\` — Ligação
- \`meeting\` — Reunião
- \`email\` — E-mail
- \`task\` — Tarefa genérica
- \`follow_up\` — Follow-up

## Buscar tarefas

\`\`\`json
POST /api/v1/tasks/search
{
  "filters": [
    { "propertyName": "owner_id", "operator": "EQ", "value": "3" },
    { "propertyName": "completed", "operator": "EQ", "value": "false" }
  ]
}
\`\`\`

## Atualizar tarefa

\`\`\`json
PATCH /api/v1/tasks/{taskId}
{
  "properties": {
    "completed": true,
    "completed_at": "2026-07-10T14:30:00Z"
  }
}
\`\`\``,
  },
  {
    slug: "produtos",
    title: "Produtos",
    description: "Gerencie o catálogo de produtos e regras de desconto.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "produto",
    content: `## O que são produtos

Produtos são itens ou serviços que sua empresa oferece. No Beeno, você pode criar um catálogo e associar produtos a negócios para cálculo automático de valor.

## Criar produto

\`\`\`json
POST /api/v1/products
{
  "properties": {
    "name": "Plano Pro Mensal",
    "price": "299.00",
    "description": "Acesso completo à plataforma",
    "sku": "PLANO-PRO-M"
  }
}
\`\`\`

## Associar produto a negócio

\`\`\`json
POST /api/v1/deals/products/{dealId}
{
  "products": [
    { "id": 1, "quantity": 1, "discount": 0 },
    { "id": 2, "quantity": 3, "discount": 15 }
  ]
}
\`\`\`

## Regras de desconto

Configure limites máximos de desconto por produto ou categoria em **Configurações → Produtos → Regras de Desconto**.

Isso garante que vendedores não ofereçam descontos além do permitido pela política comercial.

## Buscar produtos

\`\`\`json
POST /api/v1/products/search
{
  "filters": [
    { "propertyName": "price", "operator": "LTE", "value": "500" }
  ]
}
\`\`\``,
  },
  {
    slug: "etiquetas",
    title: "Etiquetas",
    description: "Organize contatos e negócios com tags.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "etiqueta",
    content: `## O que são etiquetas

Etiquetas (tags) são marcadores coloridos que facilitam a segmentação e identificação visual de contatos e negócios. Diferente das propriedades, etiquetas são textos livres e múltiplos podem ser aplicados ao mesmo objeto.

## Criar etiqueta

\`\`\`json
POST /api/v1/tags/create
{
  "name": "VIP",
  "color": "#FF6B00"
}
\`\`\`

## Listar etiquetas

\`\`\`json
POST /api/v1/tags
\`\`\`

## Aplicar etiqueta a um contato

Na interface, abra o contato e clique no campo **Etiquetas** para adicionar uma ou mais tags.

## Casos de uso

- Marcar leads quentes: **"Hot Lead"**
- Identificar segmentos: **"Médico"**, **"Distribuidor"**
- Controlar processos: **"Aguardando proposta"**, **"Em negociação"**
- Campanhas específicas: **"Evento 2026"**, **"Reativação Q3"**`,
  },
  {
    slug: "paineis",
    title: "Painéis personalizados",
    description: "Crie dashboards com métricas da operação.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "painel",
    content: `## O que são painéis

Painéis (dashboards) são telas com gráficos e métricas personalizados para acompanhar a performance comercial em tempo real.

## Criar painel

1. Acesse **Painéis** no menu lateral
2. Clique em **+ Novo painel**
3. Dê um nome ao painel
4. Adicione widgets clicando em **+ Adicionar widget**

## Tipos de widget disponíveis

- **Gráfico de barras** — volume de negócios por etapa, por período
- **Gráfico de linhas** — evolução ao longo do tempo
- **Pizza/Donut** — distribuição por categoria
- **Número (KPI)** — valor único em destaque (ex: total de leads)
- **Tabela** — lista detalhada com propriedades customizadas
- **Funil** — taxa de conversão entre etapas

## Métricas populares

| Métrica | Descrição |
|---------|-----------|
| Leads gerados | Total de novos contatos por período |
| Taxa de conversão | % de leads que fecharam |
| Ticket médio | Valor médio dos negócios fechados |
| Ciclo de vendas | Tempo médio do primeiro contato ao fechamento |
| Atividades por vendedor | Produtividade individual da equipe |

## Filtros e segmentação

Cada widget pode ser filtrado por período, pipeline, etapa, usuário responsável ou qualquer propriedade customizada.`,
  },
  {
    slug: "importacao",
    title: "Importação de dados",
    description: "Importe contatos, empresas e negócios via planilha.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "importacao",
    content: `## Importando dados

O Beeno permite importar **Contatos**, **Empresas** e **Negócios** via arquivo CSV ou XLSX.

## Passo a passo

1. Acesse **Configurações → Importação**
2. Selecione o tipo de objeto (Contatos, Empresas ou Negócios)
3. Baixe o **modelo de planilha** para garantir o formato correto
4. Preencha a planilha com seus dados
5. Faça upload do arquivo
6. Mapeie as colunas da planilha para as propriedades do Beeno
7. Revise as incompatibilidades e confirme a importação

## Dicas importantes

- **Telefones**: use o formato internacional sem formatação (ex: \`5511999999999\`)
- **Datas**: use o formato \`YYYY-MM-DD\`
- **Duplicatas**: o sistema detecta duplicatas por e-mail e telefone — você pode escolher ignorar ou atualizar
- **Limite**: até 10.000 registros por importação

## Campos obrigatórios por objeto

| Objeto | Campo obrigatório |
|--------|------------------|
| Contato | Nome (firstname) ou E-mail |
| Empresa | Nome |
| Negócio | Nome + Pipeline ID |`,
  },
  {
    slug: "segmentos",
    title: "Segmentos",
    description: "Crie grupos filtrados de contatos para campanhas e automações.",
    category: "crm",
    categoryLabel: "CRM",
    icon: "segmento",
    content: `## O que são segmentos

Segmentos são listas dinâmicas de contatos que atendem a critérios específicos. São usados em fluxos de automação, campanhas de e-mail e disparos de WhatsApp.

## Criar segmento via API

\`\`\`json
POST /api/v1/segments
{
  "name": "Leads SP — Interesse em Produto A",
  "filters": [
    { "propertyName": "state", "operator": "EQ", "value": "SP" },
    { "propertyName": "product_interest", "operator": "EQ", "value": "produto_a" }
  ]
}
\`\`\`

## Adicionar contatos a um segmento

\`\`\`json
POST /api/v1/segments/{segmentId}/add
{
  "contactIds": [123, 456, 789]
}
\`\`\`

## Listar segmentos

\`\`\`
GET /api/v1/segments?limit=100
\`\`\`

## Segmentos na interface

1. Acesse **Marketing → Segmentos**
2. Clique em **+ Novo segmento**
3. Defina os filtros (propriedades, comportamentos, datas)
4. Salve — o segmento atualiza dinamicamente

## Casos de uso

- **Leads quentes**: engajaram com 3+ e-mails + visitaram a página de preços
- **Inativos**: sem interação há mais de 90 dias
- **Clientes VIP**: ticket médio acima de R$ 5.000
- **Região específica**: contatos de São Paulo no segmento de saúde`,
  },

  //  COMUNICAÇÃO 
  {
    slug: "whatsapp-api",
    title: "WhatsApp API",
    description: "Conecte e configure o WhatsApp Business API no Beeno.",
    category: "comunicacao",
    categoryLabel: "Comunicação",
    icon: "whatsapp",
    content: `## WhatsApp Business API

O Beeno integra com o **WhatsApp Business API** (via Meta), permitindo enviar e receber mensagens profissionalmente, com histórico centralizado no CRM.

## Janela de 24 horas 

Após o cliente enviar uma mensagem, você tem **24 horas** para responder livremente. Após esse período:
- É obrigatório usar um **template aprovado pela Meta** (pago por conversa)
- Sem template, a mensagem não é entregue

## Configuração inicial

1. Acesse **Configurações → Canais → WhatsApp**
2. Clique em **Conectar número**
3. Faça login no Meta Business Manager
4. Selecione o número a ser ativado (chip dedicado recomendado)
5. Aguarde a verificação (pode levar até 2h)

## COEX (Coexistência)

Permite usar o mesmo número no WhatsApp pessoal e na API **simultaneamente**. Limitações:
- Não é possível ver conversas da API no app pessoal
- Automações só funcionam na API
- Recomendado apenas em transição — migre para chip dedicado

## Boas práticas

- Use um chip **exclusivo** para a API (não misture com uso pessoal)
- Mantenha **taxa de resposta alta** — números lentos são penalizados pela Meta
- **Nunca compre listas** de contatos para disparos em massa
- Use templates com linguagem natural, não comercial agressiva
- Monitore a **qualidade do número** no Meta Business Manager

## Erros de ecossistema

O erro de "ecossistema Meta" ocorre quando o número recebe muitos bloqueios ou reportes de spam. Para resolver:
- Reduza o volume de disparos por dia
- Melhore a qualidade das mensagens
- Peça aos contatos que adicionem seu número à agenda
- Revise os templates que estão sendo enviados`,
  },
  {
    slug: "coex",
    title: "Coexistência (COEX)",
    description: "Use o mesmo número no WhatsApp pessoal e na API.",
    category: "comunicacao",
    categoryLabel: "Comunicação",
    icon: "coex",
    content: `## O que é COEX

A **Coexistência (COEX)** permite que um número de WhatsApp funcione tanto no aplicativo pessoal quanto na API do Beeno ao mesmo tempo.

## Quando usar

- Durante a transição de número pessoal para API
- Quando a empresa ainda precisa do WhatsApp Web para uso pessoal
- Operações menores onde um chip dedicado não é viável

## Limitações importantes

| Funcionalidade | API (Beeno) | App pessoal (COEX) |
|---------------|-------------|-------------------|
| Enviar templates |  |  |
| Automações |  |  |
| Ver conversas da API |  |  |
| Ver conversas pessoais |  |  |
| Histórico unificado |  |  |

## Como ativar

1. Acesse **Configurações → WhatsApp API → Coexistência**
2. Conecte o número desejado
3. Siga as instruções para vincular ao Meta

## Recomendação

Para operações profissionais, use sempre um **chip dedicado exclusivo** para a API. O COEX é uma solução temporária.`,
  },
  {
    slug: "templates",
    title: "Templates de WhatsApp",
    description: "Crie e gerencie templates aprovados pela Meta.",
    category: "comunicacao",
    categoryLabel: "Comunicação",
    icon: "template",
    content: `## O que são templates

Templates (HSMs — Highly Structured Messages) são modelos de mensagem **pré-aprovados pela Meta** usados para iniciar conversas ou responder após a janela de 24h.

## Criar template

1. Acesse **Comunicação → Templates do WhatsApp**
2. Clique em **+ Novo template**
3. Preencha: nome, categoria, idioma e corpo da mensagem
4. Adicione variáveis com \`{{1}}\`, \`{{2}}\`, etc.
5. Envie para aprovação — pode levar minutos a horas

## Categorias disponíveis

| Categoria | Uso | Custo |
|-----------|-----|-------|
| **Marketing** | Promoções, campanhas | Mais alto |
| **Utilidade** | Confirmações, atualizações | Médio |
| **Autenticação** | Códigos de verificação | Baixo |

## Boas práticas para aprovação

 Use linguagem natural e conversacional  
 Personalize com variáveis (\`Olá, {{1}}!\`)  
 Inclua botões de resposta rápida  
 Seja direto e claro no conteúdo  

 Evite "GRÁTIS", "PROMOÇÃO", "URGENTE" em maiúsculas  
 Não use links encurtados suspeitos  
 Não misture idiomas no mesmo template  
 Evite linguagem excessivamente comercial  

## Erros comuns de disparo

| Erro | Causa | Solução |
|------|-------|---------|
| Template não aprovado | Enviando antes da aprovação | Aguardar aprovação |
| Número fora da janela | Lead não respondeu em 24h | Usar template |
| Limite diário | Número novo tem limites baixos | Escalar gradualmente |
| Bloqueio pelo lead | Lead bloqueou o número | Sem solução direta |`,
  },
  {
    slug: "caixa-de-entrada",
    title: "Caixa de entrada",
    description: "Gerencie todas as conversas em um só lugar.",
    category: "comunicacao",
    categoryLabel: "Comunicação",
    icon: "caixa",
    content: `## Caixa de entrada unificada

A caixa de entrada centraliza todas as conversas de WhatsApp, organizadas por setor e atendente. Permite visualizar o histórico completo de cada contato.

## Funcionalidades principais

### Conversas
- Visualize conversas **abertas**, **resolvidas** e **em espera**
- Filtre por atendente, setor, etiqueta ou período
- Busque por conteúdo de mensagem ou nome do contato

### Snippets
Respostas rápidas para perguntas frequentes:
1. Acesse **Caixa de entrada → Snippets**
2. Clique em **+ Novo snippet**
3. Defina um atalho (ex: \`/preco\`) e o texto completo
4. Na conversa, digite o atalho para inserir automaticamente

### Atendentes e setores
- Configure **setores** para categorizar tipos de atendimento (Vendas, Suporte, Financeiro)
- Atribua conversas a **atendentes específicos**
- Use **roleta automática** para distribuir igualmente

### Etiquetas de conversa
Diferentes das etiquetas de contato — estas marcam o status da conversa (Ex: "Aguardando resposta", "Cotação enviada").

## Iniciando conversas ativas

Para iniciar uma conversa (fora da janela de 24h):
1. Abra o contato
2. Clique em **+ Nova conversa**
3. Selecione o **template** aprovado
4. Preencha as variáveis e envie

## Chamadas

O Beeno suporta integração de chamadas VoIP. Configure em **Comunicação → Chamadas** e registre ligações diretamente no histórico do contato.`,
  },
  {
    slug: "email",
    title: "Caixas de e-mail",
    description: "Sincronize Gmail ou Outlook e registre e-mails no CRM.",
    category: "comunicacao",
    categoryLabel: "Comunicação",
    icon: "email",
    content: `## Integração de e-mail

Sincronize sua caixa de e-mail (Gmail ou Outlook) com o Beeno para ter todo o histórico de comunicação centralizado no CRM.

## Configurar caixa de e-mail

1. Acesse **Comunicação → Caixas de E-mail**
2. Clique em **+ Conectar caixa**
3. Selecione Gmail ou Outlook
4. Autorize o acesso à conta
5. Configure o nome de exibição e assinatura

## O que é sincronizado

- E-mails **enviados** pelo Beeno ficam no histórico do contato
- E-mails **recebidos** de contatos cadastrados são vinculados automaticamente
- E-mails de **novos remetentes** podem criar contatos automaticamente (configure nas preferências)

## Enviando e-mails pelo Beeno

1. Abra um contato ou negócio
2. Clique em **Enviar e-mail**
3. Selecione o remetente (sua caixa conectada)
4. Escreva o e-mail (suporte a HTML e templates)
5. Envie — o registro fica no histórico

## Configurar domínio de e-mail

Para enviar com seu domínio (ex: contato@suaempresa.com.br):
1. Acesse **Configurações → Domínios**
2. Adicione seu domínio
3. Configure os registros DNS (SPF, DKIM)
4. Valide o domínio

## Marketing por e-mail

Acesse **Marketing → E-mails** para criar campanhas, acompanhar métricas de abertura e cliques, e configurar sequências automáticas.`,
  },

  //  AUTOMAÇÃO 
  {
    slug: "fluxos-automacao",
    title: "Fluxos de automação",
    description: "Crie sequências automáticas de ações baseadas em gatilhos.",
    category: "automacao",
    categoryLabel: "Automação",
    icon: "automacao",
    content: `## O que são fluxos de automação

Fluxos de automação são sequências de ações executadas automaticamente quando um contato atende a certas condições. Permitem nutrir leads, mover negócios de etapa, enviar mensagens e criar tarefas sem intervenção manual.

## Componentes de um fluxo

### Gatilhos (início)
- Contato entra em um segmento
- Propriedade do contato é alterada
- Lead entra em uma etapa do pipeline
- Formulário preenchido
- Data específica (aniversário, renovação)

### Ações disponíveis
- Enviar e-mail ou WhatsApp (template)
- Criar tarefa para o vendedor
- Atualizar propriedade do contato
- Mover negócio de etapa
- Adicionar/remover etiqueta
- Adicionar contato a outro segmento
- Esperar X dias antes da próxima ação

### Condicionais e decisões
- Ramifique o fluxo baseado em propriedades
- "Se canal de origem = Instagram → ação A, senão → ação B"
- Decisões permitem caminhos múltiplos

## Adicionar contatos ao fluxo via API

\`\`\`json
POST /api/v1/contacts/add-to-campaign
{
  "leads": [123, 456, 789],
  "campaign": 10
}
\`\`\`

## Adicionar negócios ao fluxo

\`\`\`json
POST /api/v1/deals/add-to-campaign
{
  "dealIds": [1, 2, 3],
  "campaign": 5
}
\`\`\`

## Métricas e registros

Acompanhe o desempenho em **Fluxos → [nome do fluxo] → Métricas**:
- Total de contatos no fluxo
- Taxa de abertura de e-mails
- Taxa de cliques
- Contatos que concluíram o fluxo
- Erros de envio

## Alvo de fluxo

Configure **alvos** para definir o critério de sucesso do fluxo. Quando um contato atinge o alvo, ele é removido automaticamente do fluxo.`,
  },
  {
    slug: "chatbot-builder",
    title: "Chatbot / Builder",
    description: "Crie fluxos conversacionais automatizados para o WhatsApp.",
    category: "automacao",
    categoryLabel: "Automação",
    icon: "bot",
    content: `## O que é o Builder

O Builder é uma ferramenta **no-code** para criar fluxos de chatbot no WhatsApp. Permite automatizar atendimentos, qualificar leads e criar experiências conversacionais sem precisar programar.

## Componentes do Builder

### Mensagens
- Textos simples
- Imagens, áudios, vídeos, documentos
- Listas de opções
- Botões de resposta rápida (máx. 3 botões)

### Perguntas
Colete dados do usuário em diferentes formatos:
- Texto livre
- Número
- Data
- E-mail
- Telefone
- Localização
- Opção de lista

### Variáveis
Armazene respostas do usuário para usar depois:

\`\`\`
{{contact_name}} — nome coletado
{{product_interest}} — produto de interesse
{{cidade}} — cidade informada
\`\`\`

**Variáveis nativas** (automáticas do contato/negócio):
- \`{{contact.firstname}}\`
- \`{{contact.phone}}\`
- \`{{deal.name}}\`

### Condicionais
Ramifique o fluxo baseado em respostas:
- "Se resposta = opção A → ir para bloco X"
- "Se {{interest}} contém 'produto_b' → ir para bloco Y"

### Transferência para humano
Configure o transbordo para a caixa de entrada humana:
- Imediato
- Fora do horário comercial
- Quando o bot não entender após N tentativas

### Criar tarefa/negócio
Automaticamente durante o fluxo, crie um negócio ou tarefa no CRM com os dados coletados na conversa.

### Go to Action / Inatividade
- **Go to**: pule para outro bloco do fluxo
- **Inatividade**: ação quando o usuário não responde por X minutos

### Balanceador de saídas
Distribua usuários entre dois ou mais caminhos em proporções configuráveis (ex: 50/50 para testes A/B).

## Agente de IA no Builder

Adicione um bloco de **Agente de IA** para responder perguntas abertas usando LLM. Configure:
- Prompt de instruções
- Base de conhecimento
- Condições de saída (quando escalar para humano)`,
  },
  {
    slug: "agente-ia",
    title: "Agente de IA",
    description: "Assistentes conversacionais inteligentes com base de conhecimento.",
    category: "automacao",
    categoryLabel: "Automação",
    icon: "ia",
    content: `## O que é o Agente de IA

O Agente de IA é um assistente conversacional que usa LLM (Large Language Model) para responder perguntas em linguagem natural, baseado em uma **base de conhecimento** configurada. Pode ser usado no chatbot para atendimento autônomo.

## Configuração do agente

1. Acesse **IA → Agente Conversacional**
2. Clique em **+ Novo agente**
3. Configure:
   - **Nome** e **personalidade** do agente
   - **Instruções** de comportamento (prompt do sistema)
   - **Base de conhecimento** (artigos, FAQs)
   - **Condições de saída** (quando transferir para humano)

## Contextos gerais

Defina o comportamento padrão do agente:
- Nome e identidade ("Sou a Luana da Empresa X")
- Tom de voz (formal, informal, técnico)
- Limitações ("Não posso falar sobre preços")
- Saudação inicial

## Base de conhecimento

Adicione conteúdo que o agente pode consultar:
- **Artigos** escritos diretamente na plataforma
- **URLs** de páginas do seu site
- **Documentos** (PDF, DOCX) com informações do produto

O agente busca o conteúdo relevante automaticamente ao responder.

## Saídas configuráveis

Configure quando o agente deve transferir para humano:
- Após X mensagens sem resolução
- Quando o usuário solicita "falar com pessoa"
- Quando detecta intenção de compra
- Sempre em horário comercial (transferência automática)

## Habilidades (Skills) via API

O agente pode chamar APIs externas para buscar informações em tempo real:
- Consultar status de pedido
- Verificar disponibilidade
- Buscar informações do cliente no CRM`,
  },

  //  MARKETING 
  {
    slug: "formularios",
    title: "Formulários",
    description: "Crie formulários para capturar leads integrados ao CRM.",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "pipeline",
    content: `## O que são formulários

Formulários no Beeno são páginas de captura integradas nativamente ao CRM. Quando alguém preenche, um contato é criado ou atualizado automaticamente.

## Criar formulário

1. Acesse **Marketing → Formulários**
2. Clique em **+ Novo formulário**
3. Adicione campos (nome, e-mail, telefone, campos customizados)
4. Configure ação pós-envio (mensagem de agradecimento, redirecionamento)
5. Copie o código de embed ou use a URL direta

## Campos disponíveis

- Campos padrão: nome, e-mail, telefone, empresa
- Campos customizados criados nas propriedades do CRM
- Campo oculto (para rastrear origem/UTM)

## Via API

\`\`\`
GET /api/v1/forms
GET /api/v1/forms/{formId}
\`\`\`

## Integração com webhook

Configure um webhook para ser notificado a cada novo preenchimento:
1. Acesse o formulário → **Configurações**
2. Adicione a URL do webhook
3. O Beeno enviará um POST com os dados do formulário

## Rastreamento de UTM

Para rastrear a origem dos leads:
1. Adicione campos ocultos: \`utm_source\`, \`utm_medium\`, \`utm_campaign\`
2. O formulário captura os parâmetros da URL automaticamente
3. Os dados ficam salvos nas propriedades do contato`,
  },
  {
    slug: "landing-page",
    title: "Landing Pages",
    description: "Crie páginas de captura nativas no Beeno.",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "lp",
    content: `## Landing Pages no Beeno

Crie páginas de captura de leads sem precisar de ferramentas externas. As LPs são integradas nativamente ao CRM.

## Criar landing page

1. Acesse **Marketing → Landing Page**
2. Clique em **+ Nova LP**
3. Escolha um template ou comece do zero
4. Edite os blocos (texto, imagem, formulário, CTA)
5. Configure o domínio personalizado
6. Publique

## Conectar domínio personalizado

Para usar seu domínio (ex: oferta.suaempresa.com):
1. Acesse **Configurações → Domínios**
2. Adicione o subdomínio
3. Configure o CNAME no seu provedor de DNS
4. Aguarde a propagação (até 48h)

## Integração com formulários

Toda LP inclui automaticamente um formulário integrado ao CRM. Os leads capturados entram diretamente no pipeline configurado.

## Boas práticas

- Use um título claro e objetivo (benefício principal)
- Inclua **prova social** (depoimentos, logos de clientes)
- CTA visível acima da dobra (sem scroll)
- Formulário com poucos campos (nome + e-mail + telefone é suficiente)
- Versão mobile otimizada`,
  },
  {
    slug: "meta-ads",
    title: "Meta Ads (Facebook/Instagram)",
    description: "Sincronize leads de anúncios Meta diretamente no CRM.",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "ads",
    content: `## Integração com Meta Ads

Conecte sua conta de anúncios do Facebook/Instagram para sincronizar leads dos formulários **Lead Ads** diretamente no Beeno.

## Configuração

1. Acesse **Marketing → Anúncios → Contas de Anúncios**
2. Clique em **+ Conectar conta**
3. Faça login no Meta Business Manager
4. Autorize as permissões solicitadas
5. Selecione as contas de anúncio a sincronizar

## Conectar formulários Lead Ads

1. Após conectar a conta, acesse **Gerenciador de Anúncios**
2. Selecione o formulário desejado
3. Mapeie os campos do formulário para as propriedades do Beeno:
   - "Nome completo" → \`firstname\` + \`lastname\`
   - "E-mail" → \`email\`
   - "Telefone" → \`phone\`
4. Defina em qual etapa do pipeline o lead deve entrar
5. Ative a sincronização

## Meta Pixel

Configure o **Meta Pixel** para rastrear conversões do site:
1. Acesse **Marketing → Meta Pixel**
2. Adicione o ID do pixel
3. Configure os eventos a serem disparados
4. Instale via **Google Tag Manager** no site

## Gerenciador de anúncios

Visualize e gerencie seus anúncios diretamente no Beeno:
- Métricas de alcance, cliques e conversões
- Edite criativos e textos
- Compare performance entre campanhas

## Dica N8N

Para automações avançadas com Meta Ads, use o webhook do Beeno + N8N para enriquecer leads antes de criar no CRM:

\`\`\`javascript
// N8N: ao receber lead do Meta
// 1. Busca dados adicionais via CNPJ/telefone
// 2. Cria contato enriquecido no Beeno
POST /api/v1/contacts
{ "properties": { ...dadosEnriquecidos } }
\`\`\``,
  },
  {
    slug: "pontuacao",
    title: "Pontuação (Lead Score)",
    description: "Configure pontuação automática para priorizar leads.",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "score",
    content: `## O que é Lead Score

O Lead Score é um sistema de pontuação que avalia automaticamente o nível de interesse e qualificação de cada lead, baseado em suas ações e características.

## Como funciona

Cada ação ou característica do lead adiciona ou remove pontos:

| Ação | Pontos |
|------|--------|
| Abriu e-mail | +5 |
| Clicou em link | +10 |
| Visitou página de preços | +20 |
| Preencheu formulário | +30 |
| Trabalha em empresa grande | +15 |
| Cargo de decisor | +25 |
| Inatividade (30 dias) | -10 |

## Configurar gatilhos de pontuação

1. Acesse **Marketing → Pontuação**
2. Clique em **+ Novo gatilho**
3. Selecione o tipo: **Ação** (comportamental) ou **Propriedade** (demográfico)
4. Configure a condição e os pontos

## Criar segmentos por pontuação

Use a pontuação para segmentar leads:
\`\`\`json
POST /api/v1/contacts/search
{
  "filters": [
    { "propertyName": "score", "operator": "GTE", "value": "50" }
  ]
}
\`\`\`

## Fluxo baseado em pontuação

Configure um fluxo de automação disparado quando o lead atinge X pontos:
- Score ≥ 30: enviar e-mail de nurturing
- Score ≥ 60: criar tarefa para vendedor ligar
- Score ≥ 90: mover para etapa "Qualificado"`,
  },

  //  INTEGRAÇÕES 
  {
    slug: "n8n-beeno",
    title: "N8N + Beeno",
    description: "Padrões e boas práticas para integrar o Beeno via N8N.",
    category: "integracoes",
    categoryLabel: "Integrações",
    icon: "n8n",
    content: `## Visão geral

O N8N é a ferramenta recomendada para criar automações avançadas com a API do Beeno. Aqui estão os padrões críticos para evitar erros comuns.

## Autenticação

Use o nó **HTTP Request** com o header:
\`\`\`
Header: ELOZ-APIKEY
Value: sua-api-key-aqui
\`\`\`

## Padrão para POST e PATCH 

**Sempre** use \`contentType: raw\` + \`rawContentType: application/json\` com o body serializado em um nó Code antes do HTTP Request. Nunca use \`JSON.stringify()\` dentro do campo \`jsonBody\`.

\`\`\`javascript
// Nó Code ANTES do HTTP Request
return [{
  json: {
    body: JSON.stringify({
      properties: { firstname: "João", email: "joao@email.com" }
    })
  }
}];

// HTTP Request
// Method: POST
// Body Content Type: Raw
// Content-Type: application/json
// Body: {{ $json.body }}
\`\`\`

## Busca por telefone 

**SEMPRE** use \`search-cellphone\`. **NUNCA** use \`/search\` com filtro de phone.

\`\`\`json
POST /api/v1/contacts/search-cellphone
{ "value": "5511999999999" }
\`\`\`

## Paginação com cursor

Use loop IF com cursor — nunca use \`splitInBatches\` para controlar paginação:

\`\`\`
[HTTP Request] → [Code: acumula + extrai cursor] → [IF: hasMore?]
                                                          ↓ true
                                                   [HTTP Request com cursor]
                                                          ↓ false
                                                   [próximo nó]
\`\`\`

## Problemas conhecidos no N8N 2.11.4

| Problema | Solução |
|----------|---------|
| Merge node passThrough quebrado | Conectar ambos os branches do IF diretamente ao nó downstream |
| AssemblyAI community node incompatível | Usar HTTP Request direto para api.assemblyai.com |
| HTTP Request em Code nodes | Não é suportado — fazer requests fora do Code |

## Referência cruzada de itens paralelos

Ao usar \`$('NomeDoNo').item.json\` com múltiplos itens paralelos, sempre retorna o item 0. Para evitar:
- Passe o contexto dentro do próprio item
- Use \`$('NomeDoNo').all()[index]\` com cautela

## Exemplo completo: criar contato

\`\`\`javascript
// 1. Nó Code: Preparar body
const body = JSON.stringify({
  properties: {
    firstname: $json.nome,
    email: $json.email,
    phone: $json.telefone
  }
});
return [{ json: { body } }];

// 2. HTTP Request
// URL: https://app.beeno.ai/{CLIENT_ID}/api/v1/contacts
// Method: POST
// Header: ELOZ-APIKEY = sua_chave
// Body Type: Raw
// Content-Type: application/json
// Body: {{ $json.body }}
\`\`\``,
  },
  {
    slug: "associacoes",
    title: "Associações",
    description: "Vincule objetos entre si no CRM.",
    category: "integracoes",
    categoryLabel: "Integrações",
    icon: "link",
    content: `## O que são associações

Associações conectam objetos do CRM entre si — por exemplo, vincular um contato a um negócio, ou uma empresa a um contato.

## Tipos suportados

| De | Para |
|----|------|
| Contact | Deal |
| Contact | Company |
| Deal | Contact |
| Deal | Company |
| Deal | Product |
| Company | Contact |

>  Product só pode ser associado a Deal (não a Contact ou Company diretamente).

## Criar associação

\`\`\`
POST /api/v1/associations/{fromObject}/{fromObjectId}/{toObject}/{toObjectId}
\`\`\`

**Exemplos:**

\`\`\`bash
# Vincular contato 123 ao negócio 456
POST /api/v1/associations/contact/123/deal/456

# Vincular contato 123 à empresa 789
POST /api/v1/associations/contact/123/company/789

# Associar produto ao criar o negócio (via corpo do POST)
POST /api/v1/deals
{
  "properties": { "name": "Negócio X" },
  "associations": { "contacts": [123], "companies": [45] }
}
\`\`\`

## Remover associação

\`\`\`
DELETE /api/v1/associations/{fromObject}/{fromObjectId}/{toObject}/{toObjectId}
\`\`\`

## Associações ao criar objetos

A forma mais eficiente é criar o objeto e as associações em uma única requisição:

\`\`\`json
POST /api/v1/deals
{
  "properties": {
    "name": "Proposta Empresa ABC",
    "pipeline_id": 1,
    "stage_id": 3
  },
  "associations": {
    "contacts": [123, 124],
    "companies": [45]
  }
}
\`\`\``,
  },
  {
    slug: "webhooks",
    title: "Webhooks e Integrações",
    description: "Configure webhooks e chaves de API para integrações.",
    category: "integracoes",
    categoryLabel: "Integrações",
    icon: "integracao",
    content: `## Webhooks

Webhooks enviam notificações automáticas para uma URL externa quando eventos ocorrem no Beeno.

## Configurar webhook

1. Acesse **Configurações → Integrações → Webhooks**
2. Clique em **+ Novo webhook**
3. Informe a URL de destino
4. Selecione os eventos a monitorar
5. Ative o webhook

## Eventos disponíveis

| Evento | Descrição |
|--------|-----------|
| \`contact.created\` | Novo contato criado |
| \`contact.updated\` | Contato atualizado |
| \`deal.created\` | Novo negócio criado |
| \`deal.stage_changed\` | Negócio mudou de etapa |
| \`deal.updated\` | Negócio atualizado |
| \`form.submitted\` | Formulário preenchido |

## Formato do payload

\`\`\`json
{
  "event": "contact.created",
  "timestamp": "2026-07-01T10:00:00Z",
  "data": {
    "id": 123,
    "properties": {
      "firstname": "João",
      "email": "joao@email.com"
    }
  }
}
\`\`\`

## API Tokens

Gere chaves de API para integrações externas:
1. Acesse **Configurações → Integrações → API Tokens**
2. Clique em **+ Gerar token**
3. Dê um nome descritivo (ex: "N8N Produção")
4. Copie e guarde a chave — ela não será exibida novamente

>  Revogue tokens que não são mais utilizados. Cada integração deve ter seu próprio token.`,
  },
];

export const categories: Category[] = [
  {
    key: "primeiros-passos",
    label: "Primeiros passos",
    items: articles.filter((a) => a.category === "primeiros-passos").map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "crm",
    label: "CRM",
    items: articles.filter((a) => a.category === "crm").map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "comunicacao",
    label: "Comunicação",
    items: articles.filter((a) => a.category === "comunicacao").map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "automacao",
    label: "Automação",
    items: articles.filter((a) => a.category === "automacao").map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "marketing",
    label: "Marketing",
    items: articles.filter((a) => a.category === "marketing").map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "integracoes",
    label: "Integrações",
    items: articles.filter((a) => a.category === "integracoes").map((a) => ({ slug: a.slug, title: a.title })),
  },
];

export const homeCards = [
  { icon: "inicio", title: "Primeiros passos", description: "Configure sua conta e explore o CRM", slug: "visao-geral" },
  { icon: "pipeline", title: "Pipelines e funis", description: "Crie e personalize seus pipelines de vendas", slug: "pipelines" },
  { icon: "whatsapp", title: "WhatsApp API", description: "Conecte o WhatsApp e gerencie atendimentos", slug: "whatsapp-api" },
  { icon: "automacao", title: "Automações", description: "Crie fluxos automáticos para sua operação", slug: "fluxos-automacao" },
  { icon: "integracao", title: "API Reference", description: "64 endpoints documentados para integrações", slug: "__api" },
  { icon: "bot", title: "Assistente IA", description: "Tire dúvidas com nosso assistente inteligente", slug: "__ai" },
];
