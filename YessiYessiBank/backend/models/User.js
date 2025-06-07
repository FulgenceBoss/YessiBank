const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      // Regex pour valider un numéro de téléphone gabonais (simplifié)
      match: /^(0[1-7])\d{7}$/,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profile: {
      name: {
        type: String,
        trim: true,
      },
      // D'autres préférences peuvent être ajoutées ici
    },
    savingsConfig: {
      amount: {
        type: Number,
        default: 100, // Montant par défaut
        min: 100,
      },
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'daily',
      },
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
