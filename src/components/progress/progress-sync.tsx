"use client";

import { useState } from "react";

function encodeProgress(data: object): string {
  return btoa(JSON.stringify(data));
}

function decodeProgress(code: string): object | null {
  try {
    return JSON.parse(atob(code.trim())) as object;
  } catch {
    return null;
  }
}

export function ProgressSync() {
  const [importCode, setImportCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function exportProgress() {
    const payload = {
      academy: localStorage.getItem("qtc-academy"),
      learn: localStorage.getItem("qtc-learn"),
      mining: localStorage.getItem("qtc-mining-setup"),
      exportedAt: new Date().toISOString(),
    };
    const code = encodeProgress(payload);
    navigator.clipboard.writeText(code).then(() => {
      setMessage("Sync code copied. Paste it on another device to restore progress.");
    });
  }

  function importProgress() {
    const data = decodeProgress(importCode) as {
      academy?: string;
      learn?: string;
      mining?: string;
    } | null;
    if (!data) {
      setMessage("Invalid sync code. Check you copied the full string.");
      return;
    }
    if (data.academy) localStorage.setItem("qtc-academy", data.academy);
    if (data.learn) localStorage.setItem("qtc-learn", data.learn);
    if (data.mining) localStorage.setItem("qtc-mining-setup", data.mining);
    setMessage("Progress restored. Refresh the page to see updates.");
    setImportCode("");
  }

  return (
    <div className="surface-panel mt-6 p-4">
      <h3 className="text-sm font-semibold text-foreground">Sync progress</h3>
      <p className="mt-1 text-xs text-muted">
        Export a sync code to continue on another browser or device. No account required.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={exportProgress} className="btn-secondary text-xs">
          Copy sync code
        </button>
      </div>
      <div className="mt-4">
        <label htmlFor="import-code" className="form-label text-xs">
          Paste sync code
        </label>
        <textarea
          id="import-code"
          value={importCode}
          onChange={(e) => setImportCode(e.target.value)}
          rows={2}
          className="form-input font-mono text-xs"
          placeholder="Paste code from another device"
        />
        <button
          type="button"
          onClick={importProgress}
          className="btn-primary mt-2 text-xs"
          disabled={!importCode.trim()}
        >
          Import progress
        </button>
      </div>
      {message && <p className="mt-3 text-xs text-accent-foreground">{message}</p>}
    </div>
  );
}
