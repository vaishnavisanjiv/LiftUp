import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0DugBz8OXIth8hKzBDuTaZIapsrKEnfc",
  authDomain: "liftup-user-authentication.firebaseapp.com",
  projectId: "liftup-user-authentication",
  storageBucket: "liftup-user-authentication.firebasestorage.app",
  messagingSenderId: "474076079549",
  appId: "1:474076079549:web:86885bd13594dc051bded4",
  measurementId: "G-3DE9QHCR7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Custom Alert Box (Reusable)
function showCustomAlert(message) {
  document.getElementById('alert-message').textContent = message;
  document.getElementById('custom-alert').style.display = 'flex';
}

function closeAlert() {
  document.getElementById('custom-alert').style.display = 'none';
}

// Sign-Up Functionality
document.getElementById("signUpForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showCustomAlert("User registered successfully!");
            // Redirect to login page after a successful registration
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500); // Delay the redirect to show the alert
        })
        .catch((error) => {
            handleFirebaseError(error);
        });
});

// Login Functionality
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showCustomAlert("Logged in successfully!");
            // Redirect to LiftUp.html after successful login
            setTimeout(() => {
                window.location.href = "LiftUp.html";
            }, 1500); // Delay the redirect to show the alert
        })
        .catch((error) => {
            handleFirebaseError(error);
        });
});

// Handle Firebase errors and display custom error messages
function handleFirebaseError(error) {
    let errorMessage = "An error occurred. Please try again.";
    
    switch (error.code) {
        case 'auth/invalid-email':
            errorMessage = "Invalid email!";
            break;
        case 'auth/user-not-found':
            errorMessage = "User not found!";
            break;
        case 'auth/wrong-password':
            errorMessage = "Incorrect password!";
            break;
        case 'auth/too-many-requests':
            errorMessage = "Too many unsuccessful login attempts. Please try again later.";
            break;
        case 'auth/email-already-in-use':
            errorMessage = "email already in use!";
            break;
        case 'auth/invalid-credential':
            errorMessage = "Invalid credential!";
            break;
        default:
            errorMessage = error.message; // Default Firebase error message
    }

    showCustomAlert(errorMessage);
}
