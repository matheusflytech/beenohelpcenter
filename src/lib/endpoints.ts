export type Method = "GET" | "POST" | "PATCH" | "DELETE";
export type Endpoint = { method: Method; path: string; desc: string };
export type EndpointGroup = { name: string; endpoints: Endpoint[] };

export const endpointGroups: EndpointGroup[] = [
  { name: "Contacts", endpoints: [
    { method: "POST", path: "/api/v1/contacts/search", desc: "Buscar contatos com filtros" },
    { method: "GET", path: "/api/v1/contacts/[contactId]", desc: "Ler contato pelo ID" },
    { method: "POST", path: "/api/v1/contacts", desc: "Criar contato" },
    { method: "PATCH", path: "/api/v1/contacts/[contactId]", desc: "Atualizar contato" },
    { method: "DELETE", path: "/api/v1/contacts/[contactId]", desc: "Deletar contato" },
    { method: "GET", path: "/api/v1/contacts", desc: "Listar contatos (máx 100/página)" },
    { method: "POST", path: "/api/v1/contacts/search-cellphone", desc: "Buscar por número de telefone" },
    { method: "POST", path: "/api/v1/contacts/batch/create", desc: "Criar múltiplos contatos em lote" },
  ]},
  { name: "Deals", endpoints: [
    { method: "POST", path: "/api/v1/deals/search", desc: "Buscar negócios com filtros" },
    { method: "GET", path: "/api/v1/deals/[id]", desc: "Ler negócio pelo ID" },
    { method: "POST", path: "/api/v1/deals", desc: "Criar negócio" },
    { method: "PATCH", path: "/api/v1/deals/[dealId]", desc: "Atualizar negócio" },
    { method: "DELETE", path: "/api/v1/deals/[id]", desc: "Deletar negócio" },
    { method: "GET", path: "/api/v1/deals", desc: "Listar negócios" },
    { method: "POST", path: "/api/v1/deals/products/[id]", desc: "Substituir produtos do negócio" },
    { method: "POST", path: "/api/v1/deals/batch/create", desc: "Criar múltiplos negócios em lote" },
  ]},
  { name: "Companies", endpoints: [
    { method: "POST", path: "/api/v1/companies/search", desc: "Buscar empresas" },
    { method: "GET", path: "/api/v1/companies/[id]", desc: "Ler empresa" },
    { method: "POST", path: "/api/v1/companies", desc: "Criar empresa" },
    { method: "PATCH", path: "/api/v1/companies/[companyId]", desc: "Atualizar empresa" },
    { method: "DELETE", path: "/api/v1/companies/[ID]", desc: "Deletar empresa" },
    { method: "GET", path: "/api/v1/companies", desc: "Listar empresas" },
    { method: "POST", path: "/api/v1/companies/batch/create", desc: "Criar empresas em lote" },
  ]},
  { name: "Pipelines", endpoints: [
    { method: "POST", path: "/api/v1/deals/pipeline", desc: "Criar pipeline com etapas" },
    { method: "GET", path: "/api/v1/deals/pipelines", desc: "Listar todos os pipelines" },
  ]},
  { name: "Properties", endpoints: [
    { method: "POST", path: "/api/v1/properties", desc: "Criar propriedade customizada" },
    { method: "GET", path: "/api/v1/properties/[object]", desc: "Listar propriedades de um objeto" },
  ]},
  { name: "Products", endpoints: [
    { method: "POST", path: "/api/v1/products/search", desc: "Buscar produtos" },
    { method: "GET", path: "/api/v1/products/[id]", desc: "Ler produto" },
    { method: "POST", path: "/api/v1/products", desc: "Criar produto" },
    { method: "PATCH", path: "/api/v1/products/[productId]", desc: "Atualizar produto" },
    { method: "DELETE", path: "/api/v1/products/[id]", desc: "Deletar produto" },
    { method: "GET", path: "/api/v1/products", desc: "Listar produtos" },
  ]},
  { name: "Notes", endpoints: [
    { method: "GET", path: "/api/v1/notes/[fromObject]/[fromObjectId]", desc: "Listar notas de um objeto" },
    { method: "POST", path: "/api/v1/notes/[fromObject]/[fromObjectId]", desc: "Criar nota" },
    { method: "DELETE", path: "/api/v1/notes/[noteId]", desc: "Deletar nota" },
  ]},
  { name: "Tasks", endpoints: [
    { method: "POST", path: "/api/v1/tasks/search", desc: "Buscar tarefas" },
    { method: "GET", path: "/api/v1/tasks/[id]", desc: "Ler tarefa" },
    { method: "POST", path: "/api/v1/tasks", desc: "Criar tarefa" },
    { method: "PATCH", path: "/api/v1/tasks/[taskId]", desc: "Atualizar tarefa" },
    { method: "DELETE", path: "/api/v1/tasks/[id]", desc: "Deletar tarefa" },
    { method: "GET", path: "/api/v1/tasks", desc: "Listar tarefas" },
  ]},
  { name: "Associations", endpoints: [
    { method: "POST", path: "/api/v1/associations/[from]/[fromId]/[to]/[toId]", desc: "Criar associação entre objetos" },
    { method: "DELETE", path: "/api/v1/associations/[from]/[fromId]/[to]/[toId]", desc: "Remover associação" },
  ]},
  { name: "Segments", endpoints: [
    { method: "GET", path: "/api/v1/segments", desc: "Listar segmentos" },
    { method: "POST", path: "/api/v1/segments", desc: "Criar segmento" },
    { method: "POST", path: "/api/v1/segments/[segmentId]/add/[contactId]", desc: "Adicionar contato ao segmento" },
    { method: "POST", path: "/api/v1/segments/[segmentId]/add", desc: "Adicionar múltiplos contatos ao segmento" },
  ]},
  { name: "Automation Flows", endpoints: [
    { method: "POST", path: "/api/v1/contacts/add-to-campaign", desc: "Adicionar contatos a fluxo de automação" },
    { method: "POST", path: "/api/v1/deals/add-to-campaign", desc: "Adicionar negócios a fluxo de automação" },
  ]},
  { name: "Forms", endpoints: [
    { method: "GET", path: "/api/v1/forms", desc: "Listar formulários" },
    { method: "GET", path: "/api/v1/forms/[formId]", desc: "Ler formulário" },
  ]},
  { name: "Users", endpoints: [
    { method: "GET", path: "/api/v1/users", desc: "Listar usuários da conta" },
    { method: "POST", path: "/api/v1/users", desc: "Criar usuário" },
  ]},
  { name: "Teams", endpoints: [
    { method: "GET", path: "/api/v1/teams", desc: "Listar equipes" },
    { method: "POST", path: "/api/v1/teams", desc: "Criar equipe" },
    { method: "POST", path: "/api/v1/teams/add-members", desc: "Adicionar membros à equipe" },
    { method: "POST", path: "/api/v1/teams/remove-members", desc: "Remover membros da equipe" },
  ]},
  { name: "Tags", endpoints: [
    { method: "POST", path: "/api/v1/tags/create", desc: "Criar etiqueta" },
    { method: "POST", path: "/api/v1/tags", desc: "Listar etiquetas" },
  ]},
  { name: "Files", endpoints: [
    { method: "POST", path: "/api/v1/files/[object]/[objectId]", desc: "Upload de arquivo vinculado a objeto" },
  ]},
  { name: "Calls", endpoints: [
    { method: "POST", path: "/api/v1/calls", desc: "Listar chamadas" },
    { method: "GET", path: "/api/v1/calls/[CALL_ID]", desc: "Buscar chamada pelo ID" },
    { method: "POST", path: "/api/v1/calls", desc: "Criar chamada" },
  ]},
];

export const totalEndpoints = endpointGroups.reduce((n, g) => n + g.endpoints.length, 0);
