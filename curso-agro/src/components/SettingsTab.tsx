"use client";
import { useState } from "react";

const SettingsTab = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-[#F37826]">Configurações</h3>

      {/* Notificações */}
      <div className="flex items-center justify-between border-b border-gray-300 py-2">
        <span className="text-gray-600 text-sm">🔔 Notificações</span>
        <button
          className={`w-14 h-7 flex items-center rounded-full transition-all duration-300 ${
            notifications ? "bg-[#4CAF50]" : "bg-gray-400"
          }`}
          onClick={() => setNotifications(!notifications)}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
              notifications ? "translate-x-7" : "translate-x-0"
            } transition-all duration-300`}
          ></div>
        </button>
      </div>

      {/* Sair da Conta */}
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-600 text-sm">🚪 Sair da Conta</span>
        <button className="text-sm text-red-500 hover:underline">
          Sair
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
