import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white p-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm">
          Nous utilisons des cookies essentiels pour améliorer votre expérience.
          <Link to="/legal#cookies" className="underline ml-2">
            En savoir plus
          </Link>
        </div>
        <button
          onClick={acceptCookies}
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Accepter
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
