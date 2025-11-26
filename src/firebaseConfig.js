import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAvoxEw0IcAdiyPqvCUCligHM_hlmenP9Y",
    authDomain: "contact-manager-team-git.firebaseapp.com",
    projectId: "contact-manager-team-git",
    storageBucket: "contact-manager-team-git.firebasestorage.app",
    messagingSenderId: "886908341994",
    appId: "1:886908341994:web:4c512388968aaef2d75193"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
