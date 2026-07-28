"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: number;
  author: "agent" | "user";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    author: "agent",
    text: "Hi there! I’m here to help with room questions. Ask me anything about listings, availability, or pricing.",
  },
];

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const formattedMessages = useMemo(
    () => messages,
    [messages],
  );

  useEffect(() => {
    if (!open || !scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [formattedMessages, open]);

  function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      author: "user",
      text: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setSending(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          author: "agent",
          text: "Thanks for your message! A team member will respond soon. In the meantime, try asking about room size, rent, or how to book.",
        },
      ]);
      setSending(false);
    }, 800);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[320px] min-h-[420px] rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
          <div className="flex items-center justify-between rounded-[1.75rem] border-b border-slate-200 bg-emerald-600 px-4 py-3 text-white dark:border-slate-700">
            <div>
              <p className="text-sm font-semibold">4Rent Help</p>
              <p className="text-xs text-emerald-100/90">Chat with support</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              aria-label="Close chat window"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-white">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6 6 18M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex h-[320px] flex-col gap-3 overflow-hidden p-4">
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pr-1">
              {formattedMessages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] ${
                    message.author === "user"
                      ? "ml-auto rounded-[1rem] bg-emerald-600 px-3 py-2 text-white"
                      : "rounded-[1rem] bg-slate-100 px-3 py-2 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  }`}
                >
                  <p className="text-sm leading-6">{message.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-b-[1.75rem] border-t border-slate-200 bg-[var(--surface)] p-4 dark:border-slate-700 dark:bg-slate-950">
            <div className="flex gap-2">
              <textarea
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="min-h-[44px] w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-emerald-500/20"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!draft.trim() || sending}
                className="inline-flex h-[44px] min-w-[56px] items-center justify-center rounded-2xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-500"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center justify-center rounded-full bg-emerald-600 p-4 text-white shadow-2xl shadow-emerald-900/30 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        aria-label={open ? "Close chat window" : "Open chat window"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
          <path
            fill="currentColor"
            d="M4.5 3.5A1.5 1.5 0 0 0 3 5v11.5a1.5 1.5 0 0 0 1.5 1.5H7v3.5l4.5-3.5h7A1.5 1.5 0 0 0 20 16.5V5a1.5 1.5 0 0 0-1.5-1.5h-14Zm1.5 2.5h11v2.5h-11V6Zm0 4h11v2.5h-11V10Zm0 4h7v2.5h-7V14Z"
          />
        </svg>
      </button>
    </div>
  );
}
