"use client";

import { useState, useEffect } from "react";

export default function TabsGenerator() {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Step 1", content: "Step 1 content" },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [showCopied, setShowCopied] = useState(false);

  const addTab = () => {
    if (tabs.length >= 15) return;
    const newId = tabs.length ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
    setTabs([
      ...tabs,
      { id: newId, title: `Step ${newId}`, content: `Step ${newId} content` },
    ]);
    setActiveTab(newId);
  };

  const removeTab = (id: number) => {
    const filtered = tabs.filter((tab) => tab.id !== id);
    setTabs(filtered);
    if (activeTab === id && filtered.length > 0) {
      setActiveTab(filtered[0].id);
    }
  };

  const updateTab = (id: number, key: "title" | "content", value: string) => {
    setTabs(
      tabs.map((tab) => (tab.id === id ? { ...tab, [key]: value } : tab))
    );
  };

  const escapeHTML = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const generateOutput = () => {
    const headers = tabs
      .map(
        (tab) =>
          `<button onclick="openTab(event, 'tab${tab.id}')" style="padding:5px;border:1px solid black;margin-right:5px;background:white;">${escapeHTML(
            tab.title
          )}</button>`
      )
      .join("\n");

    const contents = tabs
      .map(
        (tab, idx) =>
          `<div id="tab${tab.id}" style="display:${
            idx === 0 ? "block" : "none"
          };padding:10px;border:1px solid black;">${escapeHTML(
            tab.content
          )}</div>`
      )
      .join("\n");

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script>
function openTab(evt, tabId) {
  const tabs = document.querySelectorAll('[id^="tab"]');
  tabs.forEach(t => t.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}
</script>
</head>
<body>
${headers}
<br><br>
${contents}
</body>
</html>
`.trim();
  };

  const output = generateOutput();

  return (
    <div className="p-4">
      {showCopied && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50">
          ✅ Copied to clipboard!
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={addTab}
          className="px-3 py-1 bg-green-600 text-white rounded mr-2"
        >
          + Add Tab
        </button>
        {tabs.length > 1 && (
          <button
            onClick={() => removeTab(activeTab)}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            - Remove Tab
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border px-3 py-1 rounded ${
              tab.id === activeTab ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map(
          (tab) =>
            tab.id === activeTab && (
              <div key={tab.id} className="space-y-4">
                <input
                  className="block w-full border p-2"
                  value={tab.title}
                  onChange={(e) => updateTab(tab.id, "title", e.target.value)}
                />
                <textarea
                  className="block w-full border p-2 h-40"
                  value={tab.content}
                  onChange={(e) => updateTab(tab.id, "content", e.target.value)}
                />
              </div>
            )
        )}
      </div>

      <div className="mt-8">
        <h3 className="font-bold mb-2">Output</h3>
        <textarea
          className="w-full h-64 p-2 border text-xs"
          readOnly
          value={output}
        ></textarea>
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            navigator.clipboard.writeText(output);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
          }}
        >
          📋 Copy Output
        </button>
      </div>
    </div>
  );
}
