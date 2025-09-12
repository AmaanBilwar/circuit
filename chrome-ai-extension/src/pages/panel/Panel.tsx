import React from "react";
import "@pages/panel/Panel.css";

export default function Panel() {
  return (
    <div className="container p-4 bg-gray-50 h-full">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Circuit Panel</h1>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Quick Tools
          </h2>
          <div className="space-y-2">
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
              📝 Note Taking
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
              🔗 Link Manager
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
              ⏰ Timer
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Recent Activity
          </h2>
          <p className="text-gray-600 text-sm">No recent activity</p>
        </div>
      </div>
    </div>
  );
}
