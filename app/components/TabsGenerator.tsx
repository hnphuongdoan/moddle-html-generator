"use client";

import { useState } from "react";

export default function TabsGenerator() {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Step 1", content: "Step 1 content" },
  ]);
  const [activeTab, setActiveTab] = useState(1);

  const addTab = () => {
    if (tabs.length >= 15) return;
    const newId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    setTabs([...tabs, { id: newId, title: `Step ${newId}`, content: `Step ${newId} content` }]);
    setActiveTab(newId);
  };

  const removeTab = (id: number) => {
    const filtered = tabs.filter(tab => tab.id !== id);
    setTabs(filtered);
    if (activeTab === id && filtered.length > 0) {
      setActiveTab(filtered[0].id);
    }
  };

  const updateTab = (id: number, key: "title" | "content", value: string) => {
    setTabs(tabs.map(tab => (tab.id === id ? { ...tab, [key]: value } : tab)));
  };

  const generateOutput = () => {
    const headers = tabs.map(
      (tab) =>
        `<button onclick="openTab(event, 'tab${tab.id}')" style="padding:5px;border:1px solid black;margin-right:5px;background:white;">${tab.title}</button>`
    ).join("\n");

    const contents = tabs.map(
      (tab, _idx) => 
        `<div id="tab${tab.id}" style="display:${tab.id === tabs[0].id ? "block" : "none"};padding:10px;border:1px solid black;">${tab.content}</div>`
    ).join("\n");

    return `
<!DOCTYPE html>
<html>
<head>
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
${contents}
</body>
</html>
`.trim();
  };

  return (
    <div className="p-4">
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
        {tabs.map(tab => (
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
          tab =>
            tab.id === activeTab && (
              <div key={tab.id} className="space-y-4">
                <input
                  className="block w-full border p-2"
                  value={tab.title}
                  onChange={e => updateTab(tab.id, "title", e.target.value)}
                />
                <textarea
                  className="block w-full border p-2 h-40"
                  value={tab.content}
                  onChange={e => updateTab(tab.id, "content", e.target.value)}
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
          value={generateOutput()}
        ></textarea>
      </div>
    </div>
  );
}
