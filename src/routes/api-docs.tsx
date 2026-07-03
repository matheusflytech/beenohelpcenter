import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { endpointGroups, totalEndpoints, type Method } from "@/lib/endpoints";

export const Route = createFileRoute("/api-docs")({
  head: () => ({
    meta: [
      { title: "API Reference — Beeno CRM" },
      { name: "description", content: `${64} endpoints da API do Beeno CRM organizados por recurso.` },
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

function ApiDocs() {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(endpointGroups.map((g) => [g.name, false]))
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
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Base URL</div>
            <code className="mt-1 block text-sm font-mono break-all leading-relaxed">https://app.beeno.ai/{"{CLIENT_ID}"}/api/v1</code>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Autenticação</div>
            <code className="mt-1 block text-sm font-mono">Header: ELOZ-APIKEY</code>
          </div>
        </div>
      </header>

      <div className="space-y-3">
        {endpointGroups.map((group) => {
          const isOpen = open[group.name];
          return (
            <div key={group.name} className="border border-border rounded-xl overflow-hidden bg-card">
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
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <ul className="divide-y divide-border border-t border-border">
                  {group.endpoints.map((ep, i) => (
                    <li key={i} className="px-5 py-3 hover:bg-muted/30 transition">
                      <div className="flex items-start gap-3 flex-wrap">
                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold font-mono ${methodClass[ep.method]} min-w-[56px] justify-center`}>
                          {ep.method}
                        </span>
                        <code className="text-sm font-mono text-foreground/90 break-all flex-1 min-w-[200px]">
                          {ep.path}
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 ml-[68px]">{ep.desc}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
