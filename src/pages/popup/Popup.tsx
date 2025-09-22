import React from "react";
import logo from "@assets/img/logo.svg";

export default function Popup() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
      <header className="flex flex-col items-center justify-center text-white">
        <img
          src={logo}
          className="h-36 pointer-events-none animate-spin-slow"
          alt="logo"
        />
        <p>
          Welcome to <strong>Circuit</strong> - Your productivity companion!
        </p>
        <p className="text-sm text-gray-300 mt-2">
          Enhanced workflow automation and productivity tools at your
          fingertips.
        </p>
        <p className="text-xs text-gray-400 mt-4">Circuit Extension v1.0.0</p>
      </header>
    </div>
  );
}
