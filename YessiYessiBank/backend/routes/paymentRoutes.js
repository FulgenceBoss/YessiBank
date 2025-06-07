const express = require('express');
const router = express.Router();

// Fonction utilitaire pour créer un délai aléatoire
const randomDelay = () => Math.floor(Math.random() * 2000) + 1000; // Délai entre 1 et 3 secondes

// Pour l'instant, les contrôleurs sont des fonctions vides.
// Nous les implémenterons dans la prochaine étape.

const simulateDeposit = (req, res) => {
  const {amount, phoneNumber} = req.body;
  console.log(
    `[SIMULATION] Tentative de dépôt de ${amount} XAF pour le numéro ${phoneNumber}.`,
  );

  setTimeout(() => {
    if (Math.random() < 0.9) {
      // 90% de chance de succès
      console.log(`[SIMULATION] Succès du dépôt pour ${phoneNumber}.`);
      res.status(200).json({message: 'Dépôt simulé en attente de traitement.'});
    } else {
      console.log(`[SIMULATION] Échec du dépôt pour ${phoneNumber}.`);
      res
        .status(400)
        .json({message: 'Échec du dépôt simulé. Fonds insuffisants.'});
    }
  }, randomDelay());
};

const simulateAuthorization = (req, res) => {
  const {phoneNumber} = req.body;
  console.log(
    `[SIMULATION] Tentative d'autorisation pour le numéro ${phoneNumber}.`,
  );

  setTimeout(() => {
    if (Math.random() < 0.9) {
      // 90% de chance de succès
      console.log(`[SIMULATION] Succès de l'autorisation pour ${phoneNumber}.`);
      res
        .status(200)
        .json({message: 'Autorisation de compte simulée réussie.'});
    } else {
      console.log(`[SIMULATION] Échec de l'autorisation pour ${phoneNumber}.`);
      res
        .status(400)
        .json({
          message: "Échec de l'autorisation. Le compte ne peut être lié.",
        });
    }
  }, randomDelay());
};

const getSimulatedBalance = (req, res) => {
  console.log(`[SIMULATION] Demande de solde.`);
  setTimeout(() => {
    res.status(200).json({balance: 50000, currency: 'XAF'});
  }, randomDelay());
};

// Définition des routes de simulation
router.post('/simulate/deposit', simulateDeposit);
router.post('/simulate/authorize', simulateAuthorization);
router.get('/simulate/balance', getSimulatedBalance);

module.exports = router;
