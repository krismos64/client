import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import CookieBanner from "../components/CookieBanner";

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-gray-800 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-xl font-bold hover:text-indigo-400 transition-colors"
              >
                JobQuestTracker
              </Link>
              <div className="ml-10 space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Candidatures
                </Link>
                <Link
                  to="/statistics"
                  className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Statistiques
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm px-3 py-2 rounded-md bg-gray-700">
                {user?.nom}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">JobQuestTracker</h3>
              <p className="text-gray-400 text-sm">
                Simplifiez le suivi de vos candidatures
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/statistics"
                    className="hover:text-white transition-colors"
                  >
                    Statistiques
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Informations légales
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/legal"
                    className="hover:text-white transition-colors"
                  >
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal#cookies"
                    className="hover:text-white transition-colors"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal#rgpd"
                    className="hover:text-white transition-colors"
                  >
                    RGPD
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} JobQuestTracker. Tous droits
              réservés.
            </p>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
};

export default MainLayout;
