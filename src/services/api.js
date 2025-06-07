import axios from 'axios';

// L'URL de base du backend. Pour le développement, cela pointe vers le serveur local.
// Assurez-vous que votre appareil mobile peut accéder à cette adresse.
// Utilisez l'adresse IP de votre machine sur le réseau local.
const API_URL = 'http://192.168.1.10:8080/api'; // Remplacez par votre IP locale

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Ajouter un intercepteur pour inclure le token JWT dans les requêtes authentifiées

export default apiClient;
