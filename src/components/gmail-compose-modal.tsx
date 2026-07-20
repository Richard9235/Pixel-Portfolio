"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type GmailComposeModalProps = {
  to: string;
};

export default function GmailComposeModal({ to }: GmailComposeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(0);
  const canUseDOM = typeof document !== "undefined";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleSend = () => {
    if (!senderEmail.trim()) {
      return;
    }

    const senderLine = senderEmail.trim()
      ? `Sender Email: ${senderEmail.trim()}\n\n`
      : "Sender Email: (not provided)\n\n";
    const composedMessage = `${senderLine}${message}`;

    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      tf: "1",
      to,
      su: subject,
      body: composedMessage,
    });
    window.open(
      `https://mail.google.com/mail/?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="underline decoration-dotted underline-offset-4 transition hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        Gmail
      </button>

      {isOpen && canUseDOM
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Compose Gmail message"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="pixel-card relative w-full max-w-2xl rounded-sm border border-white/20 bg-black/90 p-4"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-pixel text-xs text-cyan-200">Compose</h4>
                  <button
                    type="button"
                    className="pixel-card rounded-sm border border-white/20 bg-black/70 px-3 py-1 text-xs text-cyan-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>

                <div className="mt-4 space-y-3 text-xs text-zinc-200">
                  <label className="block">
                    <span className="mb-1 block text-zinc-300">To</span>
                    <input
                      type="email"
                      value={to}
                      readOnly
                      className="w-full rounded-sm border border-white/20 bg-black/40 px-3 py-2 text-zinc-300 outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-zinc-300">Your email</span>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(event) => setSenderEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-sm border border-white/20 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-300"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-zinc-300">Subject</span>
                    <input
                      type="text"
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      className="w-full rounded-sm border border-white/20 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-300"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-zinc-300">Message</span>
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={8}
                      className="w-full rounded-sm border border-white/20 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-300"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-zinc-300">Uploads</span>
                    <input
                      type="file"
                      multiple
                      onChange={(event) =>
                        setSelectedFiles(event.target.files?.length ?? 0)
                      }
                      className="w-full rounded-sm border border-white/20 bg-black/50 px-3 py-2 text-zinc-100 file:mr-3 file:rounded-sm file:border-0 file:bg-cyan-200/20 file:px-3 file:py-1 file:text-xs file:text-cyan-100"
                    />
                    <p className="mt-2 text-[11px] text-zinc-400">
                      {selectedFiles > 0
                        ? `${selectedFiles} file(s) selected. Re-attach in Gmail after compose opens.`
                        : "Files can be selected here. Re-attach in Gmail after compose opens."}
                    </p>
                  </label>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!senderEmail.trim()}
                    className="pixel-card rounded-sm border border-white/20 bg-black/70 px-4 py-2 text-xs text-cyan-100 transition hover:text-white"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
