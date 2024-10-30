import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              JobQuestTracker
            </Link>
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

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm text-gray-600">
          <div>© {new Date().getFullYear()} JobQuestTracker</div>
          <div className="flex space-x-4">
            <Link to="/legal" className="hover:text-gray-900">
              Mentions légales
            </Link>
            <Link to="/legal#cookies" className="hover:text-gray-900">
              Cookies
            </Link>
            <Link to="/legal#rgpd" className="hover:text-gray-900">
              RGPD
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
