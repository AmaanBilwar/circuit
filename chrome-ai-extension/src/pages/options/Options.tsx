import React from "react";
import "@pages/options/Options.css";

export default function Options() {
  return (
    <div className="container p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Circuit Settings
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            General Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-600">Enable notifications</label>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-600">Auto-save workflows</label>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-600">Dark mode</label>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Workflow Settings
          </h2>
          <p className="text-gray-600">
            Configure your productivity workflows and automation rules.
          </p>
        </div>
      </div>
    </div>
  );
}
