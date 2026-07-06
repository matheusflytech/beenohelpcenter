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

Sequência automatizada de ações (envio de e-mails, criação de tarefas, movimentação de pipeline) disparadas por eventos ou condições específicas.

## Webhook

Notificação automática enviada para uma URL externa quando um evento ocorre no CRM (novo lead, mudança de etapa, etc.).`,
  },
  {
    slug: "conta-e-configuracoes",
    title: "Conta e configurações",
    description: "Ajustes gerais, moedas, personalização e segurança da conta.",
    category: "conta-configuracao",
    categoryLabel: "Conta e Configuração",
    icon: "config",
    content: `## Configurações gerais

Acesse **Configurações → Conta** no menu lateral para editar dados gerais da empresa: nome, site, segmento de atuação, idioma padrão e identidade visual usada nos e-mails.

## Moedas (multimoeda)

A aba **Moeda** centraliza a operação com múltiplas moedas no CRM. Nela você adiciona as moedas usadas nos campos de propriedade do tipo moeda, escolhe a **moeda padrão da conta** e define como as taxas de conversão são atualizadas.

- Moedas suportadas: **USD**, **EUR**, **BRL** e **AED**
- A lista mostra todas as moedas cadastradas, qual é a padrão e a taxa de conversão de cada uma em relação a ela

### Criar uma nova moeda

1. Acesse **Configurações → Conta → Moeda**
2. Clique em **Criar moeda** e selecione o tipo (USD, EUR, BRL ou AED)
3. Marque **Definir como moeda padrão da conta**, se for o caso

Quando uma moeda é definida como padrão, todos os campos do tipo moeda passam a usá-la como referência em toda a plataforma — inclusive para o cálculo das taxas das demais moedas.

### Sincronização automática de taxas

Ative a sincronização para que o CRM atualize as taxas de câmbio uma vez ao dia, sempre com base na moeda padrão. O botão **Ver histórico** mostra o registro de todas as atualizações, útil para auditar altas e baixas na cotação ao longo do tempo.

### Ajuste manual (taxa fixa)

Clique diretamente no valor da taxa de conversão na tabela para travá-la manualmente. Isso é útil quando existe um câmbio acordado em contrato. Se a conversão automática estiver ativa e alguém fizer um ajuste manual, o CRM sinaliza a moeda na listagem como "ajustada manualmente". Para retomar a atualização automática, use **Mais ações → Reativar sincronização**.

> **Dica**: use conversão automática para relatórios e pipelines internacionais que precisam de valores sempre atualizados; use taxa fixa quando houver um câmbio contratual acordado.

## Domínios

Para enviar e-mails com domínio próprio e publicar landing pages personalizadas, configure o apontamento DNS em **Marketing → Domínios**. Veja o passo a passo completo no artigo [Domínios](#).

## Segurança

- **2FA**: recomendamos ativar a autenticação de dois fatores para todos os administradores (veja em [Usuários e permissões](#))
- **Tokens de API**: gere e revogue chaves em **Configurações → Integrações → API Tokens**
- **Revisão periódica**: revogue tokens não utilizados regularmente
- **Logs de acesso**: acompanhe acessos suspeitos em Configurações → Segurança

## Notificações

Configure quais eventos geram notificações por e-mail ou dentro da plataforma em **Configurações → Notificações**.`,
  },
  {
    slug: "usuarios-permissoes",
    title: "Usuários e permissões",
    description: "Convide usuários, configure papéis, equipes e 2FA.",
    category: "conta-configuracao",
    categoryLabel: "Conta e Configuração",
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

## Permissões

Além dos papéis padrão, o Beeno permite configurar o acesso de cada usuário com dois níveis de controle:

- **Permissão personalizada**: configura de forma detalhada os acessos de um usuário específico — o que ele pode visualizar, editar ou deletar em cada módulo (contatos, negócios, empresas, relatórios etc.)
- **Grupo de permissões**: cria um perfil de acesso reutilizável para várias pessoas com a mesma função. Ideal quando várias pessoas do time precisam do mesmo nível de acesso

Para criar um grupo de permissões:
1. Acesse **Configurações → Usuários → Grupos de Permissão**
2. Crie um grupo com nome descritivo (ex.: "SDR", "Gerente Comercial")
3. Defina permissões por módulo (visualizar, editar, deletar)
4. Atribua usuários ao grupo

## Equipes

Agrupe usuários em equipes para segmentar acessos, visualizações e distribuir leads automaticamente:

\`\`\`json
POST /api/v1/teams
{
  "properties": { "name": "Vendas SP" }
}
\`\`\`

Para adicionar membros a uma equipe existente:

\`\`\`json
POST /api/v1/teams/add-members
{
  "properties": { "teamId": 1, "users": [4, 5] }
}
\`\`\`

## Autenticação de dois fatores (2FA)

Cada usuário pode ativar 2FA em **Perfil → Segurança → Ativar 2FA**, usando um app autenticador (Google Authenticator, Authy). Recomendado para todos os administradores da conta.

## Via API

\`\`\`json
POST /api/v1/users
{
  "properties": { "name": "Maria Silva", "email": "maria@empresa.com" }
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
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "segmento",
    content: `## O que são segmentos

Segmentos são listas dinâmicas de contatos que atendem a critérios específicos. São usados em fluxos de automação, campanhas de e-mail e para direcionar ações estratégicas com base nas informações do CRM.

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

  //  AUTOMAÇÃO
  {
    slug: "fluxos-automacao",
    title: "Fluxos de automação",
    description: "Crie sequências automáticas de ações, condições e decisões.",
    category: "automacao",
    categoryLabel: "Automação",
    icon: "automacao",
    content: `## O que são fluxos de automação

Fluxos de automação são sequências de ações executadas automaticamente quando um contato ou negócio atende a certas condições. Permitem nutrir leads, mover negócios de etapa, enviar mensagens, criar tarefas e atualizar dados sem intervenção manual.

## Tipos de fluxo

Ao criar um fluxo, a primeira escolha é o **tipo**, que define qual objeto será inscrito e quais gatilhos de entrada estarão disponíveis.

### Baseado em Contatos
Trabalha com dados do contato inscrito individualmente. Gatilhos disponíveis:
- **Segmentação de contato**: inscreve todos os contatos de um segmento
- **Formulários**: inscreve quem preencheu um formulário específico
- **Inscrição manual**: contatos adicionados um a um
- **Mudança de propriedade**: inscreve quando uma propriedade é atualizada para um valor específico

### Baseado em Negócios
Trabalha com dados da negociação inscrita individualmente. Gatilhos disponíveis:
- **Etapas da pipeline**: inscreve negócios que chegam a uma etapa específica
- **Inscrição manual**: negócios adicionados manualmente
- **Mudança de propriedade**: inscreve quando uma propriedade do negócio é atualizada

> Não é possível misturar dois tipos de gatilho no mesmo fluxo, mas é possível selecionar mais de uma referência dentro do gatilho escolhido (ex.: vários segmentos ao mesmo tempo).

## Como criar um fluxo

1. Acesse **Fluxos de Automação → Criar fluxo** e escolha o tipo (contato ou negócio)
2. Defina o gatilho de inscrição no construtor
3. Monte o fluxograma combinando **Ações**, **Condicionais** e **Decisões**
4. Configure nome, descrição, data de ativação/desativação e se permite reinscrição
5. Ative o fluxo

## Ações disponíveis

Cada ação executa uma tarefa automática; ao concluir, o fluxo segue para o próximo nó conectado.

| Ação | O que faz |
|------|-----------|
| **Ajustar pontos do contato** | Soma ou remove pontos de Lead Score do contato |
| **Alterar etapa do negócio** | Move o negócio para outra etapa, no mesmo funil ou em outro |
| **Alterar etiquetas** | Adiciona ou remove etiquetas do contato/negócio |
| **Atraso** | Pausa o fluxo por um tempo fixo, uma data de calendário ou com base em uma propriedade de data do registro (ex.: lembrete antes de uma reunião) |
| **Clonar registro** | Duplica um negócio para outro funil (ou o mesmo), com opção de sobrescrever propriedades como etapa e pipeline |
| **Copiar valor da propriedade** | Copia o valor de uma propriedade para outra, no mesmo objeto ou entre objetos diferentes (os tipos precisam ser compatíveis) |
| **Criar registro** | Cria automaticamente um novo Contato, Negócio ou Empresa, com associações, etiquetas e propriedades definidas |
| **Criar tarefa** | Gera uma tarefa (To do, Ligação ou E-mail) para um usuário, com prioridade e prazo |
| **Definir valor da propriedade** | Preenche ou atualiza uma propriedade de Contato, Empresa ou Negócio |
| **Enviar e-mail** | Dispara um e-mail do tipo Marketing ou Transacional para o contato |
| **Enviar notificação interna por e-mail** | Avisa usuários internos do CRM (ex.: proprietário do negócio) em vez do lead |
| **Enviar webhook** | Envia uma requisição HTTP (GET, POST, PUT, PATCH ou DELETE) para um sistema externo, com headers e parâmetros customizados |
| **Inscrever em outro fluxo** | Encadeia o registro em outro fluxo de automação já existente |
| **Inserir/remover do segmento** | Adiciona ou remove o contato de um ou mais segmentos dinamicamente |
| **Ir para ação** | Pula para outra ação já existente no mesmo fluxo, sem duplicar passos |
| **Limpar propriedades** | Apaga o valor de uma ou mais propriedades do objeto |
| **Manipular tarefas** | Finaliza ou exclui tarefas pendentes (criadas manual ou automaticamente) vinculadas ao registro |
| **Reativar recebimento de comunicação** | Reabilita um contato marcado como opt-out |
| **Revezar proprietário** | Redistribui automaticamente o proprietário de contatos, negócios ou empresas entre usuários/equipes, de forma igualitária ou por percentual |
| **Suspender recebimento de comunicação** | Bloqueia temporariamente o envio de comunicações para o registro, com motivo registrado |
| **API de conversão** | Envia um evento de conversão para o Meta Pixel (requer Pixel e Evento previamente configurados) |

## Condicionais

Condicionais criam ramificações no fluxo: toda condicional tem uma saída **positiva** (quando o registro atende ao critério) e uma **negativa** (quando não atende). Tipos disponíveis:

- **Campanhas do registro**: valida se o contato já passou por outro fluxo, com opção de filtrar por data
- **Etiquetas do registro**: valida se o objeto principal do fluxo possui determinada etiqueta
- **Possui e-mail válido**: valida a propriedade nativa de e-mail do contato
- **Segmento do contato**: valida se o contato pertence a um ou mais segmentos
- **Validar campo de formulário**: checa a resposta de um contato em um campo específico de formulário (disponível em fluxos de contato)
- **Validar tarefas**: verifica se existem tarefas pendentes (manuais ou automáticas) vinculadas ao registro
- **Valor da propriedade do registro**: compara o valor de uma propriedade de Contato, Negócio ou Empresa (a condicional mais flexível, com múltiplos operadores de comparação)

## Decisões

Diferente das condicionais, decisões se baseiam em **ações que o próprio contato realizou** dentro de uma janela de tempo — muito usadas em cadências de follow-up. Disponíveis apenas em fluxos baseados em contato.

Toda decisão tem saída positiva (a ação ocorreu) e negativa (não ocorreu dentro do prazo configurado). Tipos disponíveis:

- **Baixou o arquivo**: verifica se o contato baixou um arquivo hospedado no Beeno
- **Enviar formulário**: verifica se o contato preencheu um formulário dentro do prazo
- **Visita a uma página**: verifica se o contato visitou uma landing page (ou página externa com rastreio configurado), com opção de validar a origem do acesso (referrer)
- **Decisões de e-mail**: verifica se o contato abriu, clicou ou respondeu a um e-mail enviado anteriormente no mesmo fluxo

> Dica: mantenha janelas de espera curtas no início da cadência e aumente gradualmente para não pressionar demais o contato.

## Alvo de fluxo

O **alvo** é um conjunto de filtros que, quando atendidos por um registro, o remove automaticamente do fluxo — evitando comunicações desnecessárias após o objetivo ter sido alcançado.

Exemplo: se o objetivo do fluxo é agendar uma reunião, o alvo pode ser "Contato agendou reunião **OU** virou cliente". Assim que uma dessas condições acontecer, o contato sai do fluxo.

Configure o alvo na aba **Configurações** do fluxo, combinando grupos **E** (todas as condições precisam ser verdadeiras) e grupos **OU** (basta uma). Se o alvo for atingido enquanto o registro está em uma ação de atraso, ele conclui essa ação antes de ser removido do fluxo.

## Métricas e registros

Acompanhe o desempenho em **Fluxos → [nome do fluxo]**:
- **Estatísticas do fluxo**: evolução diária de contatos/negócios adicionados
- **Mapa das ações**: quantos registros entraram, avançaram, concluíram ou falharam em cada ação
- **Atividade recente**: alterações de configuração e quem as fez, útil para auditoria
- **Análise individual**: abra a lista de registros inscritos e veja, na linha do tempo de cada contato ou negócio, todas as ações do fluxo que já foram executadas

## Adicionar contatos ao fluxo via API

\`\`\`json
POST /api/v1/contacts/add-to-campaign
{
  "ids": ["123", "456", "789"],
  "campaign": "10"
}
\`\`\`

## Adicionar negócios ao fluxo via API

\`\`\`json
POST /api/v1/deals/add-to-campaign
{
  "ids": ["1", "2", "3"],
  "campaign": "5"
}
\`\`\``,
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
    slug: "arquivos",
    title: "Arquivos",
    description: "Centralize e monitore o compartilhamento de documentos.",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "arquivo",
    content: `## O que são Arquivos

A área de **Arquivos** centraliza documentos digitais relacionados a contatos, negócios e demais registros do CRM. Cada arquivo enviado gera automaticamente um link de download exclusivo e permite acompanhar quantas vezes ele foi baixado.

## Onde usar arquivos

Depois de enviados, os arquivos podem ser reaproveitados em:
- **E-mails**: como anexo ou link em campanhas e comunicados
- **Redirecionamento de formulários**: direcione o contato para download após o envio
- **Landing pages**: disponibilize materiais de apoio, catálogos ou e-books
- **Fluxos de automação**: use a decisão "Baixou o arquivo" para ramificar o fluxo com base no download

## Como enviar um novo arquivo

1. Acesse **Marketing → Arquivos**
2. Clique em **Novo arquivo** e selecione o arquivo a importar
3. Preencha as informações básicas (nome, descrição)
4. Salve — o arquivo precisa estar **ativo** para poder ser utilizado

## Monitorando arquivos existentes

Na listagem de arquivos, abra qualquer item para ver:
- O **link público** de compartilhamento e download
- **Métricas de downloads**
- **Pré-visualização** do conteúdo

## Via API

Arquivos também podem ser enviados via API, vinculados diretamente a um registro:

\`\`\`
POST /api/v1/files/{object}/{objectId}
Content-Type: multipart/form-data
\`\`\`

Exemplo: \`POST /api/v1/files/contact/123\` vincula o arquivo ao contato de ID 123.`,
  },
  {
    slug: "emails",
    title: "E-mails",
    description: "Crie, envie e acompanhe métricas de campanhas de e-mail.",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "email",
    content: `## O que é a área de E-mails

Reúne tudo que você precisa para criar, automatizar e acompanhar campanhas de e-mail: modelos reutilizáveis, envios automáticos baseados em ações do contato e o histórico completo de entregas, aberturas e cliques.

## Tipos de e-mail

| Tipo | Quando usar |
|------|-------------|
| **E-mail automatizado** | Disparos dentro de fluxos de automação ou envios pontuais na ficha do contato — ideal quando o envio precisa se mesclar com outras ações do fluxo |
| **E-mail regular** | Disparos para um ou mais segmentos, sem gatilhos adicionais — ideal para campanhas pontuais de e-mail marketing |

## Como criar um e-mail

1. Acesse **Marketing → E-mails → Criar e-mail** e escolha o tipo (automatizado ou regular)
2. Escolha um modelo da galeria ou comece do zero
3. Monte o e-mail no editor visual — use **Exibir estrutura** para revisar o esqueleto de linhas e conteúdos, e **Salvar como novo modelo** para reaproveitar o layout depois
4. Na aba **Detalhes**, configure:
   - **Nome e e-mail do remetente** (o domínio precisa estar conectado — veja [Domínios](#))
   - **E-mail para respostas** e **cópia oculta**
   - **Anexos** (arquivos já salvos em [Arquivos](#))
   - **Versão em texto simples**, alternativa para melhorar a entregabilidade
5. Defina os detalhes finais: **assunto**, **nome interno** (aparece na listagem e métricas), **categoria** (ex.: Transacional, Prospecção) e, em e-mails regulares, o **segmento** de destino
6. Escolha entre **enviar agora** ou **agendar** data e horário

## Métricas de envio

Na listagem, cada e-mail mostra a quantidade de enviados, lidos e clicados — clique no número para abrir a lista filtrada de contatos correspondente. Ao abrir um e-mail específico, o detalhamento inclui:

- **Total de tentativas vs. enviados**
- **Aberturas** e **cliques**
- **Rejeições** (bounce — e-mail incorreto ou inexistente)
- **Cancelamentos de assinatura**
- **Falhas de envio** (ex.: domínio com baixa reputação)

> Ao registrar uma rejeição, o contato é automaticamente marcado como desinscrito de novas comunicações.

O **dashboard de Marketing** também reúne essas métricas com filtro por período.`,
  },
  {
    slug: "dominios",
    title: "Domínios",
    description: "Configure domínio próprio para e-mail e landing pages.",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "dominio",
    content: `## Por que conectar um domínio

Para enviar e-mails com seu próprio domínio (melhorando a entregabilidade) e publicar landing pages personalizadas, é necessário apontar o domínio corretamente dentro do Beeno.

## Como conectar

1. Acesse **Configurações → Domínios** e clique em **Conectar domínio**
2. Escolha o que deseja configurar: **domínio de e-mail** ou **domínio de landing page**
3. Digite o domínio — ele precisa ser próprio, ou seja, você precisa ter acesso aos registros DNS dele

> Nunca use o domínio principal do seu site institucional. Se o site é \`www.suaempresa.com.br\`, não use \`suaempresa.com.br\` — use uma variação como \`lp.suaempresa.com.br\` ou \`mail.suaempresa.com.br\`.

4. O Beeno gera os registros DNS necessários. Acesse o painel do seu provedor (Registro.br, GoDaddy, HostGator etc.) e aponte todos os registros exibidos, sem exceção
5. Depois de apontar, volte ao Beeno e **revalide a conexão**. Quando todos os itens aparecerem em verde, o domínio está conectado

## Depois de conectado

**Para e-mail**: defina o domínio como **domínio primário de envio** e preencha as configurações padrão (nome do remetente, endereço etc.). A partir daí, os disparos saem autenticados pelo seu domínio.

**Para landing pages**: crie as páginas normalmente — ao publicar, elas já ficam disponíveis no domínio configurado.

Se tiver dificuldades no apontamento, consulte a documentação do seu provedor de domínio ou peça apoio ao time técnico responsável pelo DNS.`,
  },
  {
    slug: "anuncios",
    title: "Anúncios",
    description: "Conecte contas de anúncios, veja criativos e sincronize leads.",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "ads",
    content: `## O que a área de Anúncios oferece

Conecte contas de anúncios do **Meta Ads, Google Ads e LinkedIn Ads** para acompanhar custos, leads e conversões sem sair do CRM — com dashboards prontos e sincronização automática de leads gerados por formulários.

## Conectar uma conta de anúncios

1. Acesse **Marketing → Anúncios → Contas de Anúncios**
2. Escolha a plataforma desejada e siga o pop-up de vínculo, autenticando com um usuário que tenha permissão de administrador na conta de anúncios
3. Após conectado, a conta aparece na listagem com seu status de conexão

## Sincronização de leads de formulários (Meta Ads)

Com a conta conectada, é possível sincronizar formulários **Lead Ads** do Meta diretamente com o CRM:

1. Acesse **Marketing → Anúncios → Sincronização de leads → Criar sincronização**
2. Selecione a conta, a página vinculada e o formulário desejado
3. Mapeie os campos do formulário para as propriedades de contato correspondentes
4. Opcionalmente, defina uma inscrição automática em um fluxo de automação
5. Salve — novos leads do formulário passam a criar contatos automaticamente no Beeno

> **Leads não estão chegando?** Normalmente é permissão no Meta Business Manager. Acesse **Configurações → Integrações → Acesso a leads** na página vinculada ao formulário, abra a aba **CRMs** e confirme se o Beeno está na lista de CRMs autorizados. Se não estiver, use **Assign CRM** para atribuí-lo. Esse passo precisa ser repetido para cada página com formulários ativos.

## Gerenciador de Anúncios

Acompanhe a performance das campanhas conectadas direto no CRM, em **Marketing → Anúncios**:

- **Filtros**: conta, status e período
- **Resumo de performance**: impressões, cliques, contatos, negócios, valor gasto e ROI
- **Navegação em camadas**: Campanhas → Conjuntos de anúncios → Anúncios, cada nível com métricas de CPC, CPM, CTR, valor gasto, orçamento, contatos e negócios gerados

> A atualização das métricas pode levar até 24 horas, pois depende da sincronização com cada plataforma. Pequenas diferenças em relação ao painel nativo da plataforma são esperadas por conta dessa janela.`,
  },
  {
    slug: "meta-pixel",
    title: "Meta Pixel",
    description: "Conecte o Pixel da Meta e otimize campanhas com eventos de conversão.",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "pixel",
    content: `## O que é o Meta Pixel

O Pixel da Meta é um trecho de rastreamento usado para medir conversões, criar públicos e otimizar campanhas no Facebook e Instagram. Ao conectá-lo ao Beeno, você combina as métricas de aquisição com os dados de relacionamento do CRM (etapas do funil, origem, oportunidades), permitindo que o algoritmo de anúncios aprenda com sinais de qualidade — não apenas cliques.

## Pré-requisitos

1. Acesso à **Página** do Facebook e à **Conta de Anúncios** onde o Pixel está cadastrado (com permissão de administrador)
2. O Pixel já criado no **Gerenciador de Eventos** da Meta
3. Estar logado com o perfil correto da Meta no navegador

> Se sua empresa usa Business Manager, garanta que Pixel, Página e Conta de Anúncios pertencem ao mesmo Business e que seu usuário tem as permissões necessárias.

## Conectar um Pixel existente

1. Acesse **Configurações → Anúncios → Pixel → Adicionar Pixel**
2. Selecione o usuário/perfil da Meta com acesso à Página e à Conta de Anúncios
3. Após autenticar, escolha o Pixel desejado na listagem e confirme em **Conectar**

O Pixel fica com status **Conectado**, exibindo ID, nome e status. A conexão não altera o site automaticamente — o envio de eventos ocorre a partir de ações no CRM (criação de lead, mudança de etapa, conclusão de compra etc.), configuradas via Eventos.

## Eventos

Eventos informam ao algoritmo da Meta quais ações importam para o seu negócio:

- **Eventos padrão**: pré-definidos pela Meta (ex.: \`Lead\`, \`Purchase\`, \`CompleteRegistration\`) — facilitam otimização e comparação de relatórios
- **Eventos personalizados**: criados por você (ex.: \`DemoAgendada\`, \`NegocioGanho\`) para cenários específicos do seu funil

### Como criar um evento

1. Acesse **Configurações → Anúncios → Eventos → Adicionar evento**
2. Preencha: rede de anúncios (Facebook), conta de anúncios, Pixel já conectado e o tipo de conversão (fluxo de automação)
3. Selecione os identificadores de correspondência (ex.: identificador interno, e-mail e telefone)
4. Escolha um evento padrão ou defina o nome de um evento customizado
5. Salve — o evento fica listado com o Pixel e a Conta de Anúncios associados

## Como os eventos são disparados

Os eventos são enviados através da ação **API de conversão**, disponível nos [fluxos de automação](#). Combine gatilhos, condições e outras ações (como atualização de propriedades) para que o evento seja enviado à Meta exatamente no momento certo do funil.`,
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
    items: articles
      .filter((a) => a.category === "primeiros-passos")
      .map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "conta-configuracao",
    label: "Conta e Configuração",
    items: articles
      .filter((a) => a.category === "conta-configuracao")
      .map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "crm",
    label: "CRM",
    items: articles
      .filter((a) => a.category === "crm")
      .map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "automacao",
    label: "Automação",
    items: articles
      .filter((a) => a.category === "automacao")
      .map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "marketing",
    label: "Marketing",
    items: articles
      .filter((a) => a.category === "marketing")
      .map((a) => ({ slug: a.slug, title: a.title })),
  },
  {
    key: "integracoes",
    label: "Integrações",
    items: articles
      .filter((a) => a.category === "integracoes")
      .map((a) => ({ slug: a.slug, title: a.title })),
  },
];

export const homeCards = [
  {
    icon: "rocket",
    title: "Primeiros passos",
    description: "Configure sua conta e explore o CRM",
    slug: "visao-geral",
  },
  {
    icon: "pipeline",
    title: "Pipelines e funis",
    description: "Crie e personalize seus pipelines de vendas",
    slug: "pipelines",
  },
  {
    icon: "contacts",
    title: "Contatos",
    description: "Gerencie leads e clientes no CRM",
    slug: "contatos",
  },
  {
    icon: "deals",
    title: "Negócios",
    description: "Acompanhe oportunidades de venda",
    slug: "negocios",
  },
  {
    icon: "automation",
    title: "Automações",
    description: "Fluxos automáticos para sua operação",
    slug: "fluxos-automacao",
  },
  {
    icon: "api",
    title: "API Reference",
    description: "64 endpoints documentados para integrações",
    slug: "__api",
  },
];
