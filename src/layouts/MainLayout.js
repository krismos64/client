import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">JobQuestTracker</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{user?.nom}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 px-4 py-2 rounded"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
