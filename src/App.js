import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPages from "./components/AuthPages";
import ApplicationsManager from "./components/ApplicationsManager";
import MainLayout from "./layouts/MainLayout";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? <MainLayout>{children}</MainLayout> : <AuthPages />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ApplicationsManager />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
