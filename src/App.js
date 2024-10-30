import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPages from "./components/AuthPages";
import ApplicationsManager from "./components/ApplicationsManager";
import MainLayout from "./layouts/MainLayout";
import Legal from "./components/Legal";

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
          <Route
            path="/legal"
            element={
              <PrivateRoute>
                <Legal />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
