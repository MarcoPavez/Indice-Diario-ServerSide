/* CONFIGURACION FIREBASE */
const { initializeApp } = require("firebase/app");
const firebaseConfig = {
  apiKey: "AIzaSyCztyg57m37rPyyG6O-yYuhaJbz2EZr0l0",
  authDomain: "indice-diario.firebaseapp.com",
  projectId: "indice-diario",
  storageBucket: "indice-diario.appspot.com",
  messagingSenderId: "1033243445125",
  appId: "1:1033243445125:web:78ebf3e03f46371b8526ec",
  measurementId: "G-W5FXLN3GLK"
};
const app = initializeApp(firebaseConfig);

/* CONFIGURACION FIREBASE-ADMIN */
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "indice-diario.appspot.com",
});

/* EXPORTACION VARIABLES */

module.exports = {
  app,
  admin
};