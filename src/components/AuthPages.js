import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            JobQuestTracker
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Connectez-vous à votre compte" : "Créez votre compte"}
          </p>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? "Créer un compte" : "Déjà inscrit ? Connectez-vous"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
