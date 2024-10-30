import React from "react";

const Legal = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Mentions Légales & Politique de Confidentialité
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mentions Légales</h2>
        <p>JobQuestTracker est un service proposé par [Votre Nom]</p>
        <p>Contact : [Votre Email]</p>
        <p>Hébergeur : [Nom de l'hébergeur]</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Protection des Données (RGPD)
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Données collectées :</h3>
            <ul className="list-disc ml-6">
              <li>Nom et email pour l'authentification</li>
              <li>Informations sur les candidatures</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Utilisation des données :</h3>
            <p>
              Vos données sont utilisées uniquement pour le fonctionnement du
              service de suivi des candidatures.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Droits RGPD :</h3>
            <ul className="list-disc ml-6">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la portabilité</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
        <p>Nous utilisons uniquement des cookies essentiels pour :</p>
        <ul className="list-disc ml-6">
          <li>Maintenir votre session</li>
          <li>Sauvegarder vos préférences (mode sombre)</li>
        </ul>
      </section>
    </div>
  );
};

export default Legal;
