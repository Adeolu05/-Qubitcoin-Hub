"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { suggestedQuestions } from "@/lib/tutor-knowledge";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { topic: string; link?: string }[];
}

export function TutorWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Quantum Tutor. Ask me about qPoW, mining, wallets, or the Qubitcoin ecosystem.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    trackEvent("tutor_query", { length: text.trim().length });
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = (await res.json()) as {
        answer: string;
        sources: { topic: string; link?: string }[];
      };

      const assistantMsg: Message = {
        role: "assistant",
        content: "",
        sources: data.sources,
      };
      setMessages((m) => [...m, assistantMsg]);

      const words = data.answer.split(" ");
      let built = "";
      for (let i = 0; i < words.length; i++) {
        built += (i > 0 ? " " : "") + words[i];
        const snapshot = built;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { ...assistantMsg, content: snapshot };
          return copy;
        });
        await new Promise((r) => setTimeout(r, 18));
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I couldn't reach the tutor. Try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 flex h-[min(480px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/30"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Quantum Tutor</p>
                <p className="text-[10px] text-muted">
                  Powered by Qubitcoin Hub knowledge
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted hover:text-foreground"
                aria-label="Close tutor"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[90%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "ml-auto bg-accent-muted text-foreground"
                      : "bg-background text-muted",
                  )}
                >
                  {msg.content}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {msg.sources.map((s) =>
                        s.link ? (
                          <Link
                            key={s.topic}
                            href={s.link}
                            className="rounded bg-accent-muted px-2 py-0.5 text-[10px] text-link"
                            onClick={() => setOpen(false)}
                          >
                            {s.topic} →
                          </Link>
                        ) : null,
                      )}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="animate-pulse text-sm text-muted">Thinking…</div>
              )}
              <div ref={bottomRef} />
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted transition hover:border-accent/30 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              className="flex gap-2 border-t border-border p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Qubitcoin…"
                className="form-input flex-1 py-2"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn-primary px-4 py-2 disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl text-[#0a0a0a] shadow-lg shadow-black/15 transition hover:brightness-110"
        aria-label="Open Quantum Tutor"
      >
        {open ? "✕" : "⚛"}
      </button>
    </>
  );
}
