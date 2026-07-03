import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ChatDrawer } from "@/components/ChatDrawer";

const WA_LINK =
  "https://wa.me/5511941301642?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20suporte%20do%20Beeno.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Página não encontrada.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo deu errado</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Beeno Help Center — Documentação e Suporte" },
      { name: "description", content: "Central de ajuda do Beeno CRM: documentação, referência da API e assistente de IA." },
      { property: "og:title", content: "Beeno Help Center — Documentação e Suporte" },
      { property: "og:description", content: "Central de ajuda do Beeno CRM: documentação, referência da API e assistente de IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Beeno Help Center — Documentação e Suporte" },
      { name: "twitter:description", content: "Central de ajuda do Beeno CRM: documentação, referência da API e assistente de IA." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function BeenoLogo() {
  return (
    <Link to="/" className="flex items-baseline gap-2 group">
      <span className="text-2xl font-extrabold tracking-tight text-primary">beeno</span>
      <span className="text-xs text-muted-foreground hidden sm:inline">by skeps</span>
    </Link>
  );
}

function Navbar() {
  const linkCls = "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors";
  const activeCls = "text-foreground";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <BeenoLogo />
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkCls} activeProps={{ className: activeCls }} activeOptions={{ exact: true }}>
            Início
          </Link>
          <Link to="/api-docs" className={linkCls} activeProps={{ className: activeCls }}>
            API Docs
          </Link>
          <Link to="/assistant" className={linkCls} activeProps={{ className: activeCls }}>
            Assistente IA
          </Link>
        </nav>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-95 transition"
        >
          Falar com suporte
        </a>
      </div>
    </header>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Beeno by Skeps. Todos os direitos reservados.
        </footer>
      </div>
      <ChatDrawer />
    </QueryClientProvider>
  );
}
