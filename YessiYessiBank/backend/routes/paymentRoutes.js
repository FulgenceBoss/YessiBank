const express = require('express');
const router = express.Router();

// Fonction utilitaire pour créer un délai aléatoire
const randomDelay = () => Math.floor(Math.random() * 2000) + 1000; // Délai entre 1 et 3 secondes

// Pour l'instant, les contrôleurs sont des fonctions vides.
// Nous les implémenterons dans la prochaine étape.

const simulateDeposit = (req, res) => {
  setTimeout(() => {
    if (Math.random() < 0.9) {
      // 90% de chance de succès
      res.status(200).json({message: 'Dépôt simulé en attente de traitement.'});
    } else {
      res
        .status(400)
        .json({message: 'Échec du dépôt simulé. Fonds insuffisants.'});
    }
  }, randomDelay());
};

const simulateAuthorization = (req, res) => {
  setTimeout(() => {
    if (Math.random() < 0.9) {
      // 90% de chance de succès
      res
        .status(200)
        .json({message: 'Autorisation de compte simulée réussie.'});
    } else {
      res
        .status(400)
        .json({
          message: "Échec de l'autorisation. Le compte ne peut être lié.",
        });
    }
  }, randomDelay());
};

const getSimulatedBalance = (req, res) => {
  setTimeout(() => {
    res.status(200).json({balance: 50000, currency: 'XAF'}); // Le solde réussit toujours
  }, randomDelay());
};

// Définition des routes de simulation
router.post('/simulate/deposit', simulateDeposit);
router.post('/simulate/authorize', simulateAuthorization);
router.get('/simulate/balance', getSimulatedBalance);

module.exports = router;
