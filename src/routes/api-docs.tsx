import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Copy, Check, Search } from "lucide-react";
import {
  endpointGroups,
  totalEndpoints,
  FILTER_OPERATORS,
  type Method,
  type Endpoint,
  type EndpointGroup,
} from "@/lib/endpoints";

export const Route = createFileRoute("/api-docs")({
  head: () => ({
    meta: [
      { title: "API Reference — Beeno CRM" },
      {
        name: "description",
        content: `${totalEndpoints} endpoints da API do Beeno CRM organizados por recurso.`,
      },
    ],
  }),
  component: ApiDocs,
});

// Same mapping used on api.beeno.ai
const methodClass: Record<Method, string> = {
  GET: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  POST: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  PATCH: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  DELETE: "bg-red-500/15 text-red-600 dark:text-red-400",
};
const methodPillClass: Record<Method, string> = {
  GET: "bg-emerald-500 text-white",
  POST: "bg-blue-500 text-white",
  PATCH: "bg-amber-500 text-white",
  DELETE: "bg-red-500 text-white",
};

type Selection = { g: number; e: number } | null;

function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mb-4 rounded-xl overflow-hidden bg-[#1e1e2e]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161622] border-b border-white/10">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="flex items-center gap-1 rounded-md border border-white/15 text-gray-400 hover:text-emerald-400 hover:border-emerald-400 text-[11px] px-2 py-1 transition"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "copiado" : "copiar"}
        </button>
      </div>
      <pre className="text-[13px] font-mono text-[#cdd6f4] p-4 overflow-x-auto leading-relaxed whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function KVTable({ rows }: { rows: { name: string; desc: string; required?: boolean }[] }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      {rows.map((r, i) => (
        <div
          key={i}
          className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3 text-[13.5px] ${
            i !== 0 ? "border-t border-border" : ""
          }`}
        >
          <code className="font-mono text-[13px] bg-muted px-1.5 py-0.5 rounded shrink-0 min-w-[150px] text-foreground/90">
            {r.name}
            {r.required && <span className="ml-1 text-red-500">*</span>}
          </code>
          <span className="text-muted-foreground">{r.desc}</span>
        </div>
      ))}
    </div>
  );
}

function DescriptionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card px-6 py-5 leading-relaxed text-[14.5px] text-foreground/80">
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[13px] font-bold uppercase tracking-wider text-muted-foreground mt-8 mb-3">
      {children}
    </div>
  );
}

function IntroContent() {
  return (
    <div className="max-w-[900px] mx-auto px-6 sm:px-10 py-10">
      <h1 className="text-[28px] font-bold mb-4">Beeno — Documentação de API</h1>
      <p className="text-foreground/80 leading-relaxed mb-3">
        A API do Beeno permite acessar e gerenciar os dados da sua conta — contatos, negócios,
        empresas, pipelines, produtos, tarefas e muito mais — diretamente de qualquer sistema
        externo.
      </p>
      <p className="text-foreground/80 leading-relaxed mb-8">
        Use o menu ao lado para navegar pelos {totalEndpoints} endpoints disponíveis, organizados
        por recurso.
      </p>

      <SectionTitle>Autenticação</SectionTitle>
      <DescriptionBlock>
        Todas as requisições exigem autenticação via API Key, enviada no header{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-[13px]">ELOZ-APIKEY</code>.
      </DescriptionBlock>

      <SectionTitle>Base URL</SectionTitle>
      <div className="rounded-xl bg-[#1e1e2e] px-5 py-4">
        <code className="text-[13.5px] font-mono text-[#cdd6f4] break-all">
          https://app.beeno.ai/{"{CLIENT_ID}"}/api/v1
        </code>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        <code className="bg-muted px-1 py-0.5 rounded">{"{CLIENT_ID}"}</code> é o identificador da
        sua conta no Beeno.
      </p>

      <SectionTitle>Paginação</SectionTitle>
      <DescriptionBlock>
        Endpoints de listagem usam paginação por cursor, com limite máximo de 100 registros por
        chamada. A resposta inclui{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-[13px]">hasMore</code> e um{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-[13px]">cursor.next</code> para buscar
        a próxima página.
      </DescriptionBlock>
    </div>
  );
}

function EndpointContent({ group, ep }: { group: EndpointGroup; ep: Endpoint }) {
  return (
    <div className="max-w-[900px] mx-auto px-6 sm:px-10 py-10">
      <div className="flex items-center gap-2 text-[13px] text-muted-foreground mb-6">
        <span>API</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span>{group.name}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{ep.path.split("/").pop()}</span>
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span
          className={`text-[13px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md ${methodPillClass[ep.method]}`}
        >
          {ep.method}
        </span>
        <h1 className="text-[24px] font-bold break-all">{ep.desc}</h1>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-[#1e1e2e] px-5 py-3.5 mb-8 font-mono text-[14px]">
        <span
          className={`font-bold uppercase shrink-0 ${methodClass[ep.method]} px-2 py-0.5 rounded`}
        >
          {ep.method}
        </span>
        <span className="text-[#94a3b8] break-all">{ep.path}</span>
      </div>

      <SectionTitle>Descrição</SectionTitle>
      <DescriptionBlock>{ep.desc}</DescriptionBlock>

      {ep.notes && ep.notes.length > 0 && (
        <div className="mt-4 space-y-2">
          {ep.notes.map((n, i) => (
            <div
              key={i}
              className="text-[13.5px] leading-relaxed rounded-lg bg-primary/5 border-l-4 border-primary/40 px-4 py-2.5 text-foreground/80"
            >
              <span className="font-semibold text-primary/90">Importante: </span>
              {n}
            </div>
          ))}
        </div>
      )}

      {ep.params && ep.params.length > 0 && (
        <>
          <SectionTitle>Parâmetros</SectionTitle>
          <KVTable rows={ep.params} />
        </>
      )}

      {ep.hasFilters && (
        <>
          <SectionTitle>Operadores disponíveis</SectionTitle>
          <KVTable rows={FILTER_OPERATORS.map((o) => ({ name: o.op, desc: o.desc }))} />
        </>
      )}

      {ep.fields && ep.fields.length > 0 && (
        <>
          <SectionTitle>Campos</SectionTitle>
          <KVTable rows={ep.fields} />
        </>
      )}

      {ep.body && (
        <>
          <SectionTitle>Corpo da requisição</SectionTitle>
          <CodeBlock label="JSON" code={ep.body} />
        </>
      )}

      {ep.response && (
        <>
          <SectionTitle>Exemplo de resposta</SectionTitle>
          <CodeBlock label="JSON" code={ep.response} />
        </>
      )}
    </div>
  );
}

function ApiDocs() {
  const [selected, setSelected] = useState<Selection>(null);
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const q = query.trim().toLowerCase();
  const isSearching = q.length > 0;

  const visibleGroups = useMemo(() => {
    if (!isSearching)
      return endpointGroups.map((g, gi) => ({
        group: g,
        gi,
        endpoints: g.endpoints.map((e, ei) => ({ ep: e, ei })),
      }));
    return endpointGroups
      .map((g, gi) => ({
        group: g,
        gi,
        endpoints: g.endpoints
          .map((e, ei) => ({ ep: e, ei }))
          .filter(
            ({ ep }) =>
              ep.path.toLowerCase().includes(q) ||
              ep.desc.toLowerCase().includes(q) ||
              g.name.toLowerCase().includes(q),
          ),
      }))
      .filter((g) => g.endpoints.length > 0);
  }, [q, isSearching]);

  const isGroupOpen = (name: string) => (isSearching ? true : !!openGroups[name]);

  const selectedData = selected
    ? { group: endpointGroups[selected.g], ep: endpointGroups[selected.g].endpoints[selected.e] }
    : null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* ── Sidebar (always dark) ── */}
      <aside className="w-[280px] shrink-0 bg-[#1b1c1e] flex flex-col border-r border-black/40 sticky top-16 h-[calc(100vh-4rem)]">
        <div className="p-5 pb-4 border-b border-white/10 shrink-0">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-3">
            Documentação de API
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Buscar endpoint..."
              className="w-full bg-white/[0.07] border border-white/15 rounded-md pl-8 pr-3 py-1.5 text-[13px] text-gray-200 placeholder:text-gray-500 outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <button
            onClick={() => setSelected(null)}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 mx-2 mb-1 rounded-md text-[13px] transition ${
              selected === null
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-gray-300 hover:bg-white/[0.08]"
            }`}
            style={{ width: "calc(100% - 16px)" }}
          >
            Introdução
          </button>

          {visibleGroups.map(({ group, gi, endpoints }) => {
            const open = isGroupOpen(group.name);
            return (
              <div key={group.name} className="mb-0.5">
                <button
                  onClick={() => setOpenGroups((s) => ({ ...s, [group.name]: !s[group.name] }))}
                  className={`w-full flex items-center gap-2 px-4 py-2 mx-2 rounded-md text-[12px] font-semibold uppercase tracking-wide text-gray-400 hover:bg-white/[0.08] hover:text-gray-200 transition ${open ? "text-gray-200" : ""}`}
                  style={{ width: "calc(100% - 16px)" }}
                >
                  <ChevronRight
                    className={`h-3 w-3 shrink-0 text-gray-500 transition-transform ${open ? "rotate-90" : ""}`}
                  />
                  <span className="truncate flex-1 text-left">{group.name}</span>
                  <span className="text-[10px] font-semibold text-gray-500 bg-white/[0.06] rounded-full px-1.5 py-0.5">
                    {group.endpoints.length}
                  </span>
                </button>
                {open && (
                  <div className="pb-1">
                    {endpoints.map(({ ep, ei }) => {
                      const isActive = selected?.g === gi && selected?.e === ei;
                      return (
                        <button
                          key={ei}
                          onClick={() => setSelected({ g: gi, e: ei })}
                          className={`w-full flex items-center gap-2 pl-9 pr-3 py-1.5 mx-2 rounded-md text-[13px] text-left transition ${
                            isActive
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "text-gray-300 hover:bg-white/[0.08]"
                          }`}
                          style={{ width: "calc(100% - 16px)" }}
                        >
                          <span
                            className={`text-[9px] font-bold uppercase px-1 py-0.5 rounded shrink-0 min-w-[34px] text-center ${methodClass[ep.method]}`}
                          >
                            {ep.method}
                          </span>
                          <span className="truncate">{ep.path.split("/").pop()}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">
        {selectedData ? (
          <EndpointContent group={selectedData.group} ep={selectedData.ep} />
        ) : (
          <IntroContent />
        )}
      </div>
    </div>
  );
}
