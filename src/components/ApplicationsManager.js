import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import { Plus, Moon, Sun, Filter, SortAsc } from "lucide-react";

const ApplicationsManager = () => {
  const [applications, setApplications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuth();
  const [newApplication, setNewApplication] = useState({
    entreprise: "",
    ville: "",
    typeCandidature: "",
    modeEnvoi: "",
    statut: "En attente",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get("/applications");
      setApplications(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/applications", newApplication);
      fetchApplications();
      setIsModalOpen(false);
      setNewApplication({
        entreprise: "",
        ville: "",
        typeCandidature: "",
        modeEnvoi: "",
        statut: "En attente",
      });
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/applications/${editingApplication._id}`,
        editingApplication
      );
      fetchApplications();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette candidature ?")
    ) {
      try {
        await api.delete(`/applications/${id}`);
        fetchApplications();
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Bonjour, {user?.nom}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gérez vos candidatures
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-100" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle candidature
            </button>
          </div>
        </header>

        {/* Modal nouvelle candidature */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md transform transition-all duration-200">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4 dark:text-white">
                  Nouvelle candidature
                </h2>
                <input
                  type="text"
                  placeholder="Entreprise"
                  value={newApplication.entreprise}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      entreprise: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Ville"
                  value={newApplication.ville}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      ville: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                />
                <select
                  value={newApplication.typeCandidature}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      typeCandidature: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Type de candidature</option>
                  <option value="Spontanée">Spontanée</option>
                  <option value="Offre d'emploi">Offre d'emploi</option>
                  <option value="Stage">Stage</option>
                </select>
                <input
                  type="text"
                  placeholder="Mode d'envoi"
                  value={newApplication.modeEnvoi}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      modeEnvoi: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                />
                <select
                  value={newApplication.statut}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      statut: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="En attente">En attente</option>
                  <option value="Refus">Refus</option>
                  <option value="Accepté">Accepté</option>
                </select>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal modification */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md transform transition-all duration-200">
              <form onSubmit={handleEdit}>
                <h2 className="text-xl font-bold mb-4 dark:text-white">
                  Modifier la candidature
                </h2>
                <input
                  type="text"
                  value={editingApplication.entreprise}
                  onChange={(e) =>
                    setEditingApplication({
                      ...editingApplication,
                      entreprise: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                />
                <input
                  type="text"
                  value={editingApplication.ville}
                  onChange={(e) =>
                    setEditingApplication({
                      ...editingApplication,
                      ville: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                />
                <select
                  value={editingApplication.typeCandidature}
                  onChange={(e) =>
                    setEditingApplication({
                      ...editingApplication,
                      typeCandidature: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="Spontanée">Spontanée</option>
                  <option value="Offre d'emploi">Offre d'emploi</option>
                  <option value="Stage">Stage</option>
                </select>
                <input
                  type="text"
                  value={editingApplication.modeEnvoi}
                  onChange={(e) =>
                    setEditingApplication({
                      ...editingApplication,
                      modeEnvoi: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                />
                <select
                  value={editingApplication.statut}
                  onChange={(e) =>
                    setEditingApplication({
                      ...editingApplication,
                      statut: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="En attente">En attente</option>
                  <option value="Refus">Refus</option>
                  <option value="Accepté">Accepté</option>
                </select>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table des candidatures */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-200">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {[
                  "Entreprise",
                  "Ville",
                  "Type",
                  "Mode d'envoi",
                  "Statut",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {app.entreprise}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {app.ville}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {app.typeCandidature}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {app.modeEnvoi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        app.statut === "En attente"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : app.statut === "Accepté"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {app.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingApplication(app);
                        setIsEditModalOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4 transition-colors duration-200"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsManager;
