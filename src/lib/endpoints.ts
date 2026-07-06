export type Method = "GET" | "POST" | "PATCH" | "DELETE";

export type Param = { name: string; desc: string; required?: boolean };
export type FieldDef = { name: string; desc: string };

export type Endpoint = {
  method: Method;
  path: string;
  desc: string;
  /** Exemplo de corpo da requisição (JSON, como texto) */
  body?: string;
  /** Exemplo de resposta de sucesso (JSON, como texto) */
  response?: string;
  /** Parâmetros de query/path opcionais ou obrigatórios */
  params?: Param[];
  /** Tabela de campos (usada em endpoints de listagem com formato de resposta próprio) */
  fields?: FieldDef[];
  /** Observações importantes */
  notes?: string[];
  /** Mostra a tabela de operadores de filtro (search endpoints) */
  hasFilters?: boolean;
};

export type EndpointGroup = { name: string; desc?: string; endpoints: Endpoint[] };

// Tabela de operadores compartilhada pelos endpoints de busca (/search)
export const FILTER_OPERATORS: { op: string; desc: string }[] = [
  { op: "EQ", desc: "Igual a — value (string)" },
  { op: "NEQ", desc: "Diferente de — value (string). Também retorna registros nulos." },
  { op: "GT", desc: "Maior que — value (string)" },
  { op: "GTE", desc: "Maior ou igual a — value (string)" },
  { op: "LT", desc: "Menor que — value (string)" },
  { op: "LTE", desc: "Menor ou igual a — value (string)" },
  { op: "IN", desc: "Contido em uma lista — values (array)" },
  { op: "NOT_IN", desc: "Não contido em uma lista — values (array)" },
  { op: "HAS_PROPERTY", desc: "Propriedade possui valor preenchido (sem campo de valor)" },
  { op: "NOT_HAS_PROPERTY", desc: "Propriedade não possui valor (sem campo de valor)" },
  { op: "CONTAINS_TOKEN", desc: "Busca parcial (equivalente a LIKE %valor%) — value (string)" },
  { op: "NOT_CONTAINS_TOKEN", desc: "Não contém a palavra — value (string)" },
];

export const endpointGroups: EndpointGroup[] = [
  {
    name: "Contacts",
    desc: "Contatos armazenam informações sobre as pessoas que interagem com o seu negócio.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/contacts/search",
        desc: "Buscar contatos com base nos valores das propriedades.",
        hasFilters: true,
        body: `{
  "filters": [
    {
      "value": "São Paulo",
      "propertyName": "state",
      "operator": "EQ"
    }
  ],
  "properties": ["owner_id"]
}`,
        params: [
          {
            name: "sort",
            desc: "date_modified, date_added, createdAt, updatedAt (padrão: date_modified)",
          },
          { name: "order", desc: "asc ou desc (padrão: desc)" },
        ],
        response: `{
  "total": 150,
  "results": [
    {
      "id": 1,
      "properties": {
        "firstname": "João",
        "email": "joao@exemplo.com"
      }
    }
  ],
  "cursor": {
    "next": "MTY4Nzg2ODQwMDAwMHw5ODI=",
    "nextLink": "?cursor=MTY4Nzg2ODQwMDAwMHw5ODI="
  },
  "hasMore": true
}`,
      },
      {
        method: "GET",
        path: "/api/v1/contacts/[contactId]",
        desc: "Ler contato pelo ID, junto com propriedades e objetos associados (Empresas, Negócios).",
        response: `{
  "id": 123,
  "properties": {
    "firstname": "João",
    "email": "joao@exemplo.com"
  },
  "associations": {
    "deals": [1],
    "companies": [2]
  },
  "createdAt": "2026-03-15T12:00:00.000Z",
  "updatedAt": "2026-03-15T12:00:00.000Z"
}`,
      },
      {
        method: "POST",
        path: "/api/v1/contacts",
        desc: "Criar contato com as propriedades fornecidas.",
        body: `{
  "properties": {
    "firstname": "Example name",
    "email": "email@example.com"
  },
  "associations": {
    "deals": [1],
    "companies": [2, 3]
  }
}`,
        notes: [
          'Propriedades MultiSelect → array: ["val1","val2"].',
          "Propriedades Date/DateTime → formato YYYY-MM-DD HH:mm.",
        ],
        response: `{
  "id": 456,
  "properties": {
    "firstname": "Example name",
    "email": "email@example.com"
  },
  "associations": {
    "deals": [1],
    "companies": [2, 3]
  },
  "createdAt": "2026-03-15T12:00:00.000Z",
  "updatedAt": "2026-03-15T12:00:00.000Z"
}`,
      },
      {
        method: "PATCH",
        path: "/api/v1/contacts/[contactId]",
        desc: "Atualizar contato com base no ID fornecido.",
        body: `{
  "properties": {
    "age": "22",
    "state": null
  }
}`,
        notes: [
          "Para apagar o valor de uma propriedade, informe-a como null.",
          "Propriedades somente leitura e inexistentes serão ignoradas.",
        ],
      },
      {
        method: "DELETE",
        path: "/api/v1/contacts/[contactId]",
        desc: "Deletar um contato a partir de seu ID. Um contato apagado não pode ser recuperado.",
      },
      {
        method: "GET",
        path: "/api/v1/contacts",
        desc: "Listar todos os contatos, limitando a 100 por chamada.",
        params: [
          { name: "limit", desc: "Mín. 1, máx. 100 (padrão 20)" },
          { name: "cursor", desc: "Cursor da próxima página" },
          { name: "campaignId", desc: "ID do fluxo de automação" },
          { name: "segmentId", desc: "ID do segmento" },
          { name: "properties", desc: "Nomes internos das propriedades extras a retornar" },
          { name: "includeAssociations", desc: "true para incluir objetos associados na resposta" },
        ],
        response: `{
  "total": 320,
  "results": [
    { "id": 1, "properties": { "firstname": "João", "email": "joao@exemplo.com" } }
  ],
  "cursor": { "next": "MTY4Nzg2ODQwMDAwMHw5ODI=", "nextLink": "?cursor=MTY4Nzg2ODQwMDAwMHw5ODI=" },
  "hasMore": true
}`,
      },
      {
        method: "POST",
        path: "/api/v1/contacts/search-cellphone",
        desc: "Busca contatos por número de celular. Envie o número no body para localizar contatos correspondentes.",
        body: `{
  "value": "+5511999999999"
}`,
      },
      {
        method: "POST",
        path: "/api/v1/contacts/batch/create",
        desc: "Criar múltiplos contatos em uma única requisição.",
        body: `{
  "inputs": [
    {
      "properties": { "firstname": "João", "email": "joao@exemplo.com" },
      "associations": { "deals": [1], "companies": [2] }
    },
    {
      "properties": { "firstname": "Maria", "email": "maria@exemplo.com" }
    }
  ]
}`,
        notes: [
          "O campo associations é opcional em cada item.",
          "Resposta: 201 Created com array dos objetos criados.",
        ],
      },
    ],
  },
  {
    name: "Deals",
    desc: "Negócios representam transações com contatos ou empresas, acompanhadas por etapas de pipeline.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/deals/search",
        desc: "Buscar negócios com base nos valores das propriedades.",
        hasFilters: true,
        body: `{
  "filters": [
    {
      "value": "10",
      "propertyName": "amount",
      "operator": "EQ"
    }
  ],
  "properties": ["owner_id"]
}`,
        response: `{
  "total": 42,
  "results": [
    { "id": 10, "properties": { "name": "Novo negócio", "amount": "1000" } }
  ],
  "cursor": { "next": "", "nextLink": "" },
  "hasMore": false
}`,
      },
      {
        method: "GET",
        path: "/api/v1/deals/[id]",
        desc: "Ler negócio pelo ID, junto com propriedades e objetos associados.",
        response: `{
  "id": 10,
  "properties": {
    "pipeline_id": 1,
    "stage_id": 2,
    "name": "Novo negócio",
    "priority": "1",
    "owner_id": 2
  },
  "associations": { "contacts": [1], "products": [1027] },
  "createdAt": "2026-03-15T12:00:00.000Z",
  "updatedAt": "2026-03-15T12:00:00.000Z"
}`,
      },
      {
        method: "POST",
        path: "/api/v1/deals",
        desc: "Criar negócio com as propriedades fornecidas.",
        body: `{
  "properties": {
    "pipeline_id": 1,
    "stage_id": 2,
    "name": "Novo negócio",
    "priority": "1",
    "owner_id": 2
  },
  "associations": {
    "products": [{ "id": 1027, "quantity": 12, "linePrice": 100 }],
    "contacts": [1]
  }
}`,
        response: `{
  "id": 88,
  "properties": {
    "pipeline_id": 1,
    "stage_id": 2,
    "name": "Novo negócio",
    "priority": "1",
    "owner_id": 2
  },
  "associations": { "contacts": [1], "products": [1027] },
  "createdAt": "2026-03-15T12:00:00.000Z",
  "updatedAt": "2026-03-15T12:00:00.000Z"
}`,
      },
      {
        method: "PATCH",
        path: "/api/v1/deals/[dealId]",
        desc: "Atualizar negócio com base no ID fornecido.",
        body: `{
  "properties": {
    "name": "Negócio atualizado",
    "priority": "2"
  }
}`,
      },
      {
        method: "DELETE",
        path: "/api/v1/deals/[id]",
        desc: "Deletar negócio a partir de seu ID. O negócio apagado não pode ser recuperado.",
      },
      {
        method: "GET",
        path: "/api/v1/deals",
        desc: "Listar todos os negócios, limitando a 100 por chamada.",
        params: [
          { name: "includeAssociations", desc: "true para incluir objetos associados na resposta" },
        ],
        response: `{
  "total": 210,
  "results": [
    { "id": 10, "properties": { "name": "Novo negócio", "amount": "1000" } }
  ],
  "cursor": { "next": "MTY4ODk5OTgwOTAwMHw5", "nextLink": "?cursor=MTY4ODk5OTgwOTAwMHw5" },
  "hasMore": true
}`,
      },
      {
        method: "POST",
        path: "/api/v1/deals/products/[id]",
        desc: "Substituir todos os produtos atuais da negociação pelos novos produtos informados.",
        body: `{
  "products": [
    { "productId": 19, "quantity": "2", "linePrice": "123", "isCustom": 0 },
    { "quantity": "2", "linePrice": "100.50", "name": "Cria produto", "sku": "12345", "isCustom": 1 }
  ]
}`,
        notes: [
          "Ao atualizar os produtos, o valor total da negociação é recalculado automaticamente.",
          "isCustom: 0 → produto da biblioteca (informe productId, quantity, linePrice).",
          "isCustom: 1 → produto customizado (informe name, quantity, linePrice e opcionalmente sku).",
        ],
      },
      {
        method: "POST",
        path: "/api/v1/deals/batch/create",
        desc: "Criar múltiplos negócios em uma única requisição.",
        body: `{
  "inputs": [
    {
      "properties": { "pipeline_id": 1, "stage_id": 2, "name": "Negócio 1" }
    },
    {
      "properties": { "pipeline_id": 1, "stage_id": 2, "name": "Negócio 2" }
    }
  ]
}`,
        notes: [
          "O campo associations é opcional em cada item.",
          "Resposta: 201 Created com array dos objetos criados.",
        ],
      },
    ],
  },
  {
    name: "Companies",
    desc: "Empresas armazenam informações sobre as organizações que interagem com o seu negócio.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/companies/search",
        desc: "Buscar empresas com base nos valores das propriedades.",
        hasFilters: true,
        body: `{
  "filters": [
    {
      "value": "São Paulo",
      "propertyName": "companystate",
      "operator": "EQ"
    }
  ]
}`,
        response: `{
  "total": 18,
  "results": [
    { "id": 5, "properties": { "companyname": "Beeno", "companywebsite": "https://beeno.ai/" } }
  ],
  "cursor": { "next": "", "nextLink": "" },
  "hasMore": false
}`,
      },
      {
        method: "GET",
        path: "/api/v1/companies/[id]",
        desc: "Ler empresa pelo ID, junto com propriedades e objetos associados.",
        response: `{
  "id": 5,
  "properties": { "companyname": "Beeno", "companywebsite": "https://beeno.ai/" },
  "associations": { "contacts": [1], "deals": [1] },
  "createdAt": "2026-03-15T12:00:00.000Z",
  "updatedAt": "2026-03-15T12:00:00.000Z"
}`,
      },
      {
        method: "POST",
        path: "/api/v1/companies",
        desc: "Criar empresa com as propriedades fornecidas.",
        body: `{
  "properties": {
    "companyname": "Beeno",
    "companywebsite": "https://beeno.ai/"
  },
  "associations": {
    "contacts": [1],
    "deals": [1]
  }
}`,
        response: `{
  "id": 5,
  "properties": { "companyname": "Beeno", "companywebsite": "https://beeno.ai/" },
  "associations": { "contacts": [1], "deals": [1] },
  "createdAt": "2026-03-15T12:00:00.000Z",
  "updatedAt": "2026-03-15T12:00:00.000Z"
}`,
      },
      {
        method: "PATCH",
        path: "/api/v1/companies/[companyId]",
        desc: "Atualizar empresa com base no ID fornecido.",
        body: `{
  "properties": {
    "companyname": "Nome atualizado"
  }
}`,
      },
      {
        method: "DELETE",
        path: "/api/v1/companies/[ID]",
        desc: "Deletar empresa a partir de seu ID. A empresa apagada não pode ser recuperada.",
      },
      {
        method: "GET",
        path: "/api/v1/companies",
        desc: "Listar todas as empresas, limitando a 100 por chamada.",
        response: `{
  "total": 64,
  "results": [
    { "id": 5, "properties": { "companyname": "Beeno" } }
  ],
  "cursor": { "next": "MTY4ODk5OTgwOTAwMHw5", "nextLink": "?cursor=MTY4ODk5OTgwOTAwMHw5" },
  "hasMore": true
}`,
      },
      {
        method: "POST",
        path: "/api/v1/companies/batch/create",
        desc: "Criar múltiplas empresas em uma única requisição.",
        body: `{
  "inputs": [
    { "properties": { "companyname": "Empresa 1" } },
    { "properties": { "companyname": "Empresa 2" } }
  ]
}`,
        notes: ["Resposta: 201 Created com array dos objetos criados."],
      },
    ],
  },
  {
    name: "Pipelines",
    desc: "Crie e liste as pipelines de negócios com suas respectivas etapas.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/deals/pipeline",
        desc: "Criar um pipeline junto com suas etapas.",
        body: `{
  "name": "Comercial",
  "stages": [
    { "name": "Estacionamento", "probability": "20" },
    { "name": "Finalizado", "probability": "100" },
    { "name": "Descontinuado", "probability": "0" }
  ]
}`,
        notes: [
          "O nome não pode conter ' \" { } / \\.",
          "A probabilidade deve ser múltiplo de 10 (0–100).",
        ],
      },
      {
        method: "GET",
        path: "/api/v1/deals/pipelines",
        desc: "Retorna todas as pipelines de negócios com suas respectivas etapas.",
        response: `[
  {
    "id": 1,
    "name": "Comercial",
    "stages": [
      { "id": 1, "name": "Estacionamento", "probability": 20 },
      { "id": 2, "name": "Finalizado", "probability": 100 }
    ]
  }
]`,
      },
    ],
  },
  {
    name: "Properties",
    desc: "Use propriedades para armazenar informações em registros. A Beeno fornece propriedades padrão e você pode criar propriedades personalizadas.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/properties",
        desc: "Criar uma nova propriedade do tipo especificado no objeto informado.",
        body: `{
  "properties": {
    "name": "Idade",
    "group": "core",
    "object": "contact",
    "type": "number",
    "isRequired": true,
    "isUniqueIdentifier": false
  }
}`,
        notes: [
          "Objetos disponíveis: contact, company, deal.",
          "Tipos disponíveis: date, datetime, select, multiselect, text, textarea, time, number, user, currency.",
          "Para select e multiselect, forneça a propriedade list com objetos {label, value}.",
        ],
      },
      {
        method: "GET",
        path: "/api/v1/properties/[object]",
        desc: "Liste todas as propriedades existentes para o tipo de objeto especificado (deal, contact, company).",
        response: `[
  { "id": 12, "name": "Idade", "internalName": "idade", "type": "number", "isRequired": true }
]`,
      },
    ],
  },
  {
    name: "Products",
    desc: "Produtos representam os bens ou serviços que você vende.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/products/search",
        desc: "Buscar produtos com base nos valores das propriedades.",
        hasFilters: true,
        body: `{
  "filters": [
    {
      "value": "Produto 1",
      "propertyName": "name",
      "operator": "EQ"
    }
  ]
}`,
        fields: [
          { name: "id", desc: "ID do produto" },
          { name: "name", desc: "Nome do produto" },
          { name: "price", desc: "Preço do produto" },
          { name: "sku", desc: "Código SKU" },
          { name: "frequency", desc: "Frequência de cobrança" },
          { name: "unit_cost", desc: "Custo unitário" },
          { name: "url", desc: "URL do produto" },
          { name: "months_term", desc: "Prazo em meses" },
          { name: "description", desc: "Descrição" },
          { name: "updatedAt", desc: "Data de atualização" },
        ],
        response: `{
  "total": 30,
  "results": [
    { "id": 19, "properties": { "name": "Produto 1", "price": 99.9, "sku": "1234" } }
  ],
  "cursor": { "next": "", "nextLink": "" },
  "hasMore": false
}`,
      },
      {
        method: "GET",
        path: "/api/v1/products/[id]",
        desc: "Ler produto pelo ID, junto com todas as propriedades.",
        response: `{
  "id": 19,
  "properties": { "name": "Produto 1", "price": 99.9, "sku": "1234" },
  "createdAt": "2026-03-15T12:00:00.000Z",
  "updatedAt": "2026-03-15T12:00:00.000Z"
}`,
      },
      {
        method: "POST",
        path: "/api/v1/products",
        desc: "Criar produto com as propriedades fornecidas.",
        body: `{
  "properties": {
    "name": "Novo Produto",
    "price": 99.90,
    "sku": "1234"
  }
}`,
        response: `{
  "id": 20,
  "properties": { "name": "Novo Produto", "price": 99.9, "sku": "1234" },
  "createdAt": "2026-03-15T12:00:00.000Z",
  "updatedAt": "2026-03-15T12:00:00.000Z"
}`,
      },
      {
        method: "PATCH",
        path: "/api/v1/products/[productId]",
        desc: "Atualizar produto com base no ID fornecido.",
        body: `{
  "properties": {
    "name": "Produto atualizado"
  }
}`,
      },
      {
        method: "DELETE",
        path: "/api/v1/products/[id]",
        desc: "Deletar produto a partir de seu ID. Um produto apagado não pode ser recuperado.",
      },
      {
        method: "GET",
        path: "/api/v1/products",
        desc: "Listar todos os produtos, limitando a 100 por chamada.",
        response: `{
  "total": 45,
  "results": [
    { "id": 19, "properties": { "name": "Produto 1", "price": 99.9 } }
  ],
  "cursor": { "next": "MTY4ODk5OTgwOTAwMHw5", "nextLink": "?cursor=MTY4ODk5OTgwOTAwMHw5" },
  "hasMore": true
}`,
      },
    ],
  },
  {
    name: "Notes",
    desc: "Registre notas em registros da Beeno para adicionar informações à linha do tempo do registro.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/notes/[fromObject]/[fromObjectId]",
        desc: "Listar as anotações do objeto informado.",
        params: [
          { name: "fromObject", desc: "Objetos disponíveis: deal, contact", required: true },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/notes/[fromObject]/[fromObjectId]",
        desc: "Criar uma anotação para o objeto com o ID fornecido.",
        body: `{
  "properties": {
    "text": "Uma anotação de exemplo",
    "type": "general",
    "files": [
      { "link": "https://link-arquivo.com/1", "name": "nome arquivo" }
    ]
  }
}`,
        fields: [
          { name: "general", desc: "Nota geral" },
          { name: "email", desc: "Email" },
          { name: "call", desc: "Ligação" },
          { name: "meeting", desc: "Reunião" },
          { name: "whatsapp", desc: "WhatsApp" },
        ],
        notes: ["Os valores acima são as opções aceitas no campo type."],
      },
      {
        method: "DELETE",
        path: "/api/v1/notes/[noteId]",
        desc: "Deletar uma anotação. Anotações deletadas não podem ser recuperadas.",
      },
    ],
  },
  {
    name: "Tasks",
    desc: "Use a API de tarefas para criar e gerenciar tarefas na Beeno.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/tasks/search",
        desc: "Buscar tarefas com base nos valores das propriedades.",
        hasFilters: true,
        body: `{
  "filters": [
    { "value": "Tarefa 1", "propertyName": "name", "operator": "EQ" },
    { "values": ["2","0"], "propertyName": "priority", "operator": "IN" }
  ]
}`,
        fields: [
          { name: "id", desc: "ID da tarefa" },
          { name: "name", desc: "Nome/título" },
          { name: "due_date", desc: "Data de vencimento" },
          { name: "owner_id", desc: "ID do proprietário" },
          { name: "task_type", desc: "Tipo: todo, call, email, whatsapp" },
          { name: "priority", desc: "0 = baixa, 1 = média, 2 = alta" },
        ],
      },
      {
        method: "GET",
        path: "/api/v1/tasks/[id]",
        desc: "Retorna as propriedades da tarefa associada ao ID fornecido.",
        response: `{
  "id": 7,
  "properties": { "name": "Nova tarefa", "task_type": "todo", "priority": "0" },
  "createdAt": "2026-03-15T12:00:00.000Z",
  "updatedAt": "2026-03-15T12:00:00.000Z"
}`,
      },
      {
        method: "POST",
        path: "/api/v1/tasks",
        desc: "Criar uma tarefa com as propriedades e associações fornecidas.",
        body: `{
  "properties": {
    "name": "Nova tarefa",
    "owner": 2,
    "description": "Apenas um lembrete",
    "due_date": "2024-06-25",
    "due_time": "12:00",
    "task_type": "todo",
    "priority": "0",
    "source": "API"
  }
}`,
      },
      {
        method: "PATCH",
        path: "/api/v1/tasks/[taskId]",
        desc: "Atualizar tarefa com base no ID fornecido.",
        body: `{
  "properties": {
    "name": "Tarefa Atualizada",
    "priority": "0"
  }
}`,
      },
      {
        method: "DELETE",
        path: "/api/v1/tasks/[id]",
        desc: "Deletar tarefa a partir de seu ID. Uma tarefa apagada não pode ser recuperada.",
      },
      {
        method: "GET",
        path: "/api/v1/tasks",
        desc: "Listar todas as tarefas, limitando a 100 por chamada.",
        response: `{
  "total": 12,
  "results": [
    { "id": 7, "properties": { "name": "Nova tarefa", "task_type": "todo" } }
  ],
  "cursor": { "next": "MTY4ODk5OTgwOTAwMHw5", "nextLink": "?cursor=MTY4ODk5OTgwOTAwMHw5" },
  "hasMore": false
}`,
      },
    ],
  },
  {
    name: "Associations",
    desc: "Representam os relacionamentos entre objetos da Beeno.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/associations/[from]/[fromId]/[to]/[toId]",
        desc: "Criar uma associação entre objetos.",
        fields: [
          { name: "deal", desc: "Negócio" },
          { name: "contact", desc: "Contato" },
          { name: "company", desc: "Empresa" },
          { name: "product", desc: "Produto (apenas deal → product)" },
        ],
        notes: ["Não é possível criar associações entre objetos do mesmo tipo."],
      },
      {
        method: "DELETE",
        path: "/api/v1/associations/[from]/[fromId]/[to]/[toId]",
        desc: "Remove as associações entre os objetos com os IDs fornecidos. As associações removidas não podem ser recuperadas.",
      },
    ],
  },
  {
    name: "Segments",
    desc: "Dividem sua base de clientes em grupos com características comuns.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/segments",
        desc: "Listar todos os segmentos, limitando a 100 por chamada.",
        response: `{
  "total": 6,
  "results": [
    { "id": 1, "properties": { "name": "Segmento 1", "description": "Segmento criado por API" } }
  ],
  "cursor": { "next": "MTY4Nzg2ODQwMDAwMHw5ODI=", "nextLink": "?cursor=MTY4Nzg2ODQwMDAwMHw5ODI=" },
  "hasMore": false
}`,
      },
      {
        method: "POST",
        path: "/api/v1/segments",
        desc: "Criar um novo segmento.",
        body: `{
  "properties": {
    "name": "Segmento 1",
    "description": "Segmento criado por API"
  },
  "contacts": [1, 2, 5, 10]
}`,
      },
      {
        method: "POST",
        path: "/api/v1/segments/[segmentId]/add/[contactId]",
        desc: "Adiciona um único contato a um segmento existente.",
      },
      {
        method: "POST",
        path: "/api/v1/segments/[segmentId]/add",
        desc: "Adiciona vários contatos a um segmento existente.",
        body: `{
  "contacts": [1, 2, 5, 10]
}`,
      },
    ],
  },
  {
    name: "Automation Flows",
    desc: "Fluxos de automação eliminam intervenção manual em processos repetitivos.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/contacts/add-to-campaign",
        desc: "Adiciona um ou mais contatos a um Fluxo de Automação, desde que o fluxo esteja ativo.",
        body: `{
  "ids": ["1"],
  "campaign": "1"
}`,
        notes: [
          "campaign: ID do fluxo de automação no qual os contatos serão inscritos.",
          "O campo legado leads também pode ser aceito como fallback em integrações antigas.",
        ],
      },
      {
        method: "POST",
        path: "/api/v1/deals/add-to-campaign",
        desc: "Adiciona negócios a um fluxo de automação.",
        body: `{
  "ids": ["1", "2"],
  "campaign": "1"
}`,
        notes: [
          "Envie um array de IDs de negócios no campo ids e o ID do fluxo no campo campaign.",
          "O campo padrão é ids. O campo legado deals também é aceito como fallback.",
        ],
      },
    ],
  },
  {
    name: "Forms",
    desc: "Liste e consulte os formulários criados na plataforma Beeno.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/forms",
        desc: "Lista todos os formulários, incluindo seus campos. Limite de 100 por chamada.",
        params: [
          { name: "limit", desc: "Mín. 1, máx. 100" },
          { name: "cursor", desc: "Cursor da próxima página" },
        ],
        response: `{
  "total": 4,
  "results": [
    { "id": 1, "properties": { "name": "Formulário de contato" }, "fields": [] }
  ],
  "cursor": { "next": "MTY4Nzg2ODQwMDAwMHw5ODI=", "nextLink": "?cursor=MTY4Nzg2ODQwMDAwMHw5ODI=" },
  "hasMore": false
}`,
      },
      {
        method: "GET",
        path: "/api/v1/forms/[formId]",
        desc: "Retorna o formulário informado junto com todos os campos.",
        response: `{
  "id": 1,
  "properties": { "name": "Formulário de contato" },
  "fields": [
    { "name": "email", "type": "text", "required": true }
  ]
}`,
      },
    ],
  },
  {
    name: "Users",
    desc: "Liste e crie usuários da conta Beeno.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/users",
        desc: "Lista todos os usuários da conta.",
        fields: [
          { name: "id", desc: "Número (id do usuário)" },
          { name: "name", desc: "Texto (nome completo do usuário)" },
          { name: "email", desc: "Texto (email do usuário)" },
          { name: "phoneNumber", desc: "Texto (telefone do usuário, padrão E.164)" },
          { name: "isSuperAdmin", desc: "Boolean (diz se o usuário é ou não super admin)" },
          { name: "teamIds", desc: "Array (id das equipes que o usuário faz parte)" },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/users",
        desc: "Cria um novo usuário na conta.",
        body: `{
  "properties": {
    "name": "Novo Usuário",
    "email": "usuario@exemplo.com"
  }
}`,
      },
    ],
  },
  {
    name: "Teams",
    desc: "Liste, crie e gerencie membros das equipes da conta.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/teams",
        desc: "Lista todas as equipes da conta.",
        fields: [
          { name: "id", desc: "Número (id da equipe)" },
          { name: "name", desc: "Texto (nome da equipe)" },
          { name: "quantity_users", desc: "Número (quantidade de usuários na equipe)" },
          { name: "created_at", desc: "Data (data de criação)" },
          { name: "users", desc: "Array (id dos usuários da equipe)" },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/teams",
        desc: "Cria uma nova equipe na conta.",
        body: `{
  "properties": {
    "name": "Nova equipe"
  }
}`,
      },
      {
        method: "POST",
        path: "/api/v1/teams/add-members",
        desc: "Adiciona usuários na equipe.",
        body: `{
  "properties": {
    "teamId": 2,
    "users": [1, 2]
  }
}`,
      },
      {
        method: "POST",
        path: "/api/v1/teams/remove-members",
        desc: "Remove usuários da equipe.",
        body: `{
  "properties": {
    "teamId": 2,
    "users": [3]
  }
}`,
      },
    ],
  },
  {
    name: "Tags",
    desc: "Crie e liste as etiquetas usadas para organizar contatos e negócios.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/tags/create",
        desc: "Cria uma nova etiqueta na conta.",
        body: `{
  "properties": {
    "tag": "Nova etiqueta de contato"
  }
}`,
      },
      {
        method: "POST",
        path: "/api/v1/tags",
        desc: "Lista todas as etiquetas da conta.",
        fields: [
          { name: "id", desc: "Número (id da etiqueta)" },
          { name: "tag", desc: "Texto (nome da etiqueta)" },
          { name: "description", desc: "Texto (descrição da etiqueta)" },
          { name: "qtdLeads", desc: "Número (quantidade de contatos com a etiqueta)" },
          { name: "qtdDeals", desc: "Número (quantidade de negócios com a etiqueta)" },
        ],
      },
    ],
  },
  {
    name: "Files",
    desc: "Upload de arquivos vinculados a objetos da Beeno.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/files/[object]/[objectId]",
        desc: "Upload de arquivo vinculado a um objeto. Envie o arquivo no campo file usando multipart/form-data.",
        params: [
          { name: "object", desc: "Tipo do objeto (contact, deal, company, etc.)", required: true },
          {
            name: "objectId",
            desc: "ID do objeto ao qual o arquivo será vinculado",
            required: true,
          },
        ],
        notes: [
          "Exemplo: POST /api/v1/files/contact/123 — vincula o arquivo ao contato de ID 123.",
        ],
      },
    ],
  },
  {
    name: "Calls",
    desc: "Registre e consulte ligações vinculadas a contatos e negócios.",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/calls",
        desc: "Lista todas as ligações da conta.",
        fields: [
          { name: "id", desc: "Número (id da ligação)" },
          { name: "contact_id", desc: "Número (id do contato associado)" },
          { name: "contact_email", desc: "Texto (email do contato associado)" },
          { name: "contact_name", desc: "Texto (nome do contato associado)" },
          { name: "deal_id", desc: "Número (id do negócio associado)" },
        ],
      },
      {
        method: "GET",
        path: "/api/v1/calls/[CALL_ID]",
        desc: "Pega informações de uma ligação da conta.",
        fields: [
          { name: "id", desc: "Número (id da ligação)" },
          { name: "contact_id", desc: "Número (id do contato associado)" },
          { name: "contact_email", desc: "Texto (email do contato associado)" },
          { name: "contact_name", desc: "Texto (nome do contato associado)" },
          { name: "deal_id", desc: "Número (id do negócio associado)" },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/calls",
        desc: "Cria um novo item de chamada na Beeno, com possibilidade de associar ao contato e ao negócio.",
        body: `{
  "properties": {
    "contact_number": "551112345678",
    "recording_url": "[URL_EM_MP3]",
    "call_duration": 10,
    "contact_id": "1234",
    "deal_id": "",
    "call_result": "CONNECTED",
    "summary": "TRANSCRIÇÃO"
  }
}`,
        notes: ["call_duration é em segundos.", "deal_id é opcional."],
      },
    ],
  },
];

export const totalEndpoints = endpointGroups.reduce((n, g) => n + g.endpoints.length, 0);
