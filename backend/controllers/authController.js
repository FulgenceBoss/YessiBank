const userService = require('../services/userService');
const otpService = require('../services/otpService');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Gère la demande d'envoi d'OTP.
 */
exports.sendOtp = async (req, res) => {
  const {phoneNumber} = req.body;

  if (!phoneNumber) {
    return res.status(400).json({msg: 'Le numéro de téléphone est requis.'});
  }

  try {
    // Vérifier si l'utilisateur existe, sinon le créer
    let user = await userService.getUserByPhone(phoneNumber);
    if (!user) {
      user = await userService.createUser({phoneNumber});
    }

    // Générer et envoyer (simuler) l'OTP
    await otpService.createAndSendOtp(phoneNumber);

    res.status(200).json({msg: 'OTP envoyé avec succès.'});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur du serveur.');
  }
};

/**
 * Gère la vérification de l'OTP et génère un token JWT.
 */
exports.verifyOtp = async (req, res) => {
  const {phoneNumber, code} = req.body;

  if (!phoneNumber || !code) {
    return res.status(400).json({msg: 'Le numéro et le code sont requis.'});
  }

  try {
    const isValid = await otpService.verifyOtp(phoneNumber, code);

    if (!isValid) {
      return res.status(400).json({msg: 'Code OTP invalide ou expiré.'});
    }

    // Si le code est valide, trouver l'utilisateur
    const user = await userService.getUserByPhone(phoneNumber);
    if (!user) {
      // Ce cas ne devrait pas arriver si sendOtp est appelé avant
      return res.status(404).json({msg: 'Utilisateur non trouvé.'});
    }

    // Créer le payload pour le JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Signer le token
    jwt.sign(
      payload,
      config.jwtSecret,
      {expiresIn: '5h'}, // Le token expire dans 5 heures
      (err, token) => {
        if (err) throw err;
        res.json({token});
      },
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur du serveur.');
  }
};
