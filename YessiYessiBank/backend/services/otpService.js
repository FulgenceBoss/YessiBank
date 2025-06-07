const Otp = require('../models/Otp');

/**
 * Génère un code OTP à 6 chiffres.
 * @returns {string} Le code OTP généré.
 */
const generateOtpCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Crée et envoie un OTP à un numéro de téléphone.
 * Pour l'instant, l'envoi est simulé.
 * @param {string} phoneNumber Le numéro de téléphone du destinataire.
 * @returns {Promise<string>} Le code OTP généré.
 */
const createAndSendOtp = async phoneNumber => {
  const code = generateOtpCode();

  // Supprime les anciens OTP pour ce numéro avant d'en créer un nouveau
  await Otp.deleteMany({phoneNumber});

  const otp = new Otp({
    phoneNumber,
    code,
  });

  await otp.save();

  // --- Simulation de l'envoi de SMS ---
  console.log(`[Simulation SMS] Code OTP pour ${phoneNumber}: ${code}`);
  // --- Fin de la simulation ---

  return code;
};

/**
 * Vérifie si un code OTP est valide.
 * @param {string} phoneNumber Le numéro de téléphone.
 * @param {string} code Le code à vérifier.
 * @returns {Promise<boolean>} True si le code est valide, false sinon.
 */
const verifyOtp = async (phoneNumber, code) => {
  console.log(
    `[otpService] Tentative de vérification pour le numéro: ${phoneNumber} avec le code: ${code}`,
  );

  const otp = await Otp.findOne({
    phoneNumber,
    code,
    isUsed: false,
  });

  if (!otp) {
    console.log(
      '[otpService] Echec: Aucun OTP correspondant trouvé dans la base de données.',
    );
    return false;
  }

  // Marque le code comme utilisé pour éviter sa réutilisation
  console.log(
    '[otpService] Succès: OTP trouvé. Il va être marqué comme utilisé.',
  );
  otp.isUsed = true;
  await otp.save();

  return true;
};

module.exports = {
  createAndSendOtp,
  verifyOtp,
};
