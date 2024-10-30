import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await register(formData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="Nom"
        value={formData.nom}
        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-indigo-600 text-white rounded"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default RegisterForm;
