"use client";

import { useEffect, useState } from "react";

type ProfileContactCopyProps = {
  email: string;
  phone: string;
};

type ToastState = {
  message: string;
  type: "success" | "error";
};

export default function ProfileContactCopy({
  email,
  phone,
}: ProfileContactCopyProps) {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleCopy = async (value: string, field: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(value);
      setToast({
        message: `Copied ${field} to clipboard.`,
        type: "success",
      });
    } catch (error) {
      console.error("Clipboard copy failed", error);
      setToast({
        message: `Unable to copy ${field}. Please copy it manually.`,
        type: "error",
      });
    }
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3 text-xs">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="pixel-card rounded-sm border border-white/20 bg-black/30 px-4 py-2 text-cyan-100 transition hover:text-white"
          onClick={() => handleCopy(email, "email")}
        >
          {email}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="pixel-card rounded-sm border border-white/20 bg-black/30 px-4 py-2 text-cyan-100 transition hover:text-white"
          onClick={() => handleCopy(phone, "phone")}
        >
          {phone}
        </button>
      </div>

      {toast ? (
        <div className="profile-toast-wrap" aria-live="polite">
          <span
            className={`profile-toast profile-toast--${toast.type}`}
            role="status"
          >
            {toast.message}
          </span>
        </div>
      ) : null}
    </div>
  );
}
