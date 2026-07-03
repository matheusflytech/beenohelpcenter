import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import {
  endpointGroups,
  totalEndpoints,
  FILTER_OPERATORS,
  type Method,
  type Endpoint,
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

const methodClass: Record<Method, string> = {
  GET: "bg-blue-100 text-blue-700",
  POST: "bg-green-100 text-green-700",
  PATCH: "bg-amber-100 text-amber-700",
  DELETE: "bg-red-100 text-red-700",
};

function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
        {label}
      </div>
      <div className="relative rounded-lg bg-[#0d1117] text-[#e6edf3] overflow-hidden">
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[11px] px-2 py-1 transition"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "copiado" : "copiar"}
        </button>
        <pre className="text-xs font-mono p-4 pr-16 overflow-x-auto leading-relaxed whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}

function EndpointDetails({ ep }: { ep: Endpoint }) {
  return (
    <div className="px-5 pb-5 ml-0 sm:ml-[68px]">
      {ep.notes && ep.notes.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {ep.notes.map((n, i) => (
            <div
              key={i}
              className="text-xs leading-relaxed rounded-md bg-primary/5 border-l-4 border-primary/40 px-3 py-2 text-foreground/80"
            >
              <span className="font-semibold text-primary/90">Importante: </span>
              {n}
            </div>
          ))}
        </div>
      )}

      {ep.params && ep.params.length > 0 && (
        <div className="mt-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
            Parâmetros
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            {ep.params.map((p, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 px-3 py-2 text-xs ${
                  i % 2 === 1 ? "bg-muted/30" : ""
                } ${i !== 0 ? "border-t border-border" : ""}`}
              >
                <code className="font-mono text-primary shrink-0 min-w-[130px]">
                  {p.name}
                  {p.required && <span className="ml-1 text-red-500">*</span>}
                </code>
                <span className="text-muted-foreground">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {ep.hasFilters && (
        <div className="mt-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
            Operadores disponíveis
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            {FILTER_OPERATORS.map((o, i) => (
              <div
                key={o.op}
                className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 px-3 py-2 text-xs ${
                  i % 2 === 1 ? "bg-muted/30" : ""
                } ${i !== 0 ? "border-t border-border" : ""}`}
              >
                <code className="font-mono text-primary shrink-0 min-w-[150px]">{o.op}</code>
                <span className="text-muted-foreground">{o.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {ep.fields && ep.fields.length > 0 && (
        <div className="mt-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
            Campos
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            {ep.fields.map((f, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 px-3 py-2 text-xs ${
                  i % 2 === 1 ? "bg-muted/30" : ""
                } ${i !== 0 ? "border-t border-border" : ""}`}
              >
                <code className="font-mono text-primary shrink-0 min-w-[130px]">{f.name}</code>
                <span className="text-muted-foreground">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {ep.body && <CodeBlock label="Request Body" code={ep.body} />}
      {ep.response && <CodeBlock label="Exemplo de resposta" code={ep.response} />}
    </div>
  );
}

function ApiDocs() {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(endpointGroups.map((g) => [g.name, false])),
  );
  const [openEndpoints, setOpenEndpoints] = useState<Record<string, boolean>>({});

  const toggleEndpoint = (key: string) => setOpenEndpoints((s) => ({ ...s, [key]: !s[key] }));

  const hasDetails = (ep: Endpoint) =>
    !!(
      ep.body ||
      ep.response ||
      ep.params?.length ||
      ep.fields?.length ||
      ep.notes?.length ||
      ep.hasFilters
    );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold">API Reference</h1>
          <span className="inline-flex items-center rounded-full bg-primary/15 text-primary px-3 py-1 text-xs font-semibold">
            {totalEndpoints} endpoints
          </span>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Base URL
            </div>
            <code className="mt-1 block text-sm font-mono break-all leading-relaxed">
              https://app.beeno.ai/{"{CLIENT_ID}"}/api/v1
            </code>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Autenticação
            </div>
            <code className="mt-1 block text-sm font-mono">Header: ELOZ-APIKEY</code>
          </div>
        </div>
      </header>

      <div className="space-y-3">
        {endpointGroups.map((group) => {
          const isOpen = open[group.name];
          return (
            <div
              key={group.name}
              className="border border-border rounded-xl overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpen((s) => ({ ...s, [group.name]: !s[group.name] }))}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">{group.name}</h2>
                  <span className="text-xs text-muted-foreground rounded-full bg-muted px-2 py-0.5">
                    {group.endpoints.length}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <ul className="divide-y divide-border border-t border-border">
                  {group.endpoints.map((ep, i) => {
                    const key = `${group.name}-${i}`;
                    const epOpen = !!openEndpoints[key];
                    const clickable = hasDetails(ep);
                    return (
                      <li key={i}>
                        <div
                          onClick={() => clickable && toggleEndpoint(key)}
                          className={`px-5 py-3 transition ${clickable ? "cursor-pointer hover:bg-muted/30" : ""}`}
                        >
                          <div className="flex items-start gap-3 flex-wrap">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold font-mono ${methodClass[ep.method]} min-w-[56px] justify-center`}
                            >
                              {ep.method}
                            </span>
                            <code className="text-sm font-mono text-foreground/90 break-all flex-1 min-w-[200px]">
                              {ep.path}
                            </code>
                            {clickable && (
                              <ChevronDown
                                className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 ${epOpen ? "rotate-180" : ""}`}
                              />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 ml-[68px]">{ep.desc}</p>
                        </div>
                        {epOpen && clickable && <EndpointDetails ep={ep} />}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
