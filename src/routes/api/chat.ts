import { createFileRoute } from "@tanstack/react-router";

type ChatMsg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { messages?: ChatMsg[]; conversation_id?: string };
          const messages = Array.isArray(body.messages) ? body.messages : [];
          if (messages.length === 0) {
            return new Response(JSON.stringify({ error: "Mensagens obrigatórias" }), { status: 400 });
          }

          const lastUser = [...messages].reverse().find((m) => m.role === "user");
          const history = messages.slice(0, -1);

          const res = await fetch("https://integrations-hook.beeno.ai/webhook/beeno-helpcenterai", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              message: lastUser?.content || "",
              history: history.map((m) => ({ role: m.role, content: m.content })),
              conversation_id: body.conversation_id || "default",
            }),
          });

          if (!res.ok) {
            const msg = `Erro no assistente (${res.status})`;
            return new Response(JSON.stringify({ error: msg }), { status: 502 });
          }

          const data = (await res.json()) as { reply?: string; text?: string; error?: string };
          const text = data.reply || data.text || "";

          if (!text) {
            return new Response(JSON.stringify({ error: data.error || "Resposta vazia" }), { status: 502 });
          }

          return new Response(JSON.stringify({ text }), {
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Erro desconhecido";
          return new Response(JSON.stringify({ error: msg }), { status: 500 });
        }
      },
    },
  },
});
