import React from "react";
import logo from "@assets/img/logo.svg";
import "@pages/newtab/Newtab.css";

export default function Newtab() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <strong>Circuit</strong> - Your enhanced new tab
          experience!
        </p>
        <p className="text-lg text-gray-300 mt-4">
          Streamline your workflow with powerful productivity tools.
        </p>
        <div className="mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Quick Actions
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Settings
          </button>
        </div>
      </header>
    </div>
  );
}
