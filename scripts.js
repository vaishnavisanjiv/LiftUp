import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyD0DugBz8OXIth8hKzBDuTaZIapsrKEnfc",
  authDomain: "liftup-user-authentication.firebaseapp.com",
  projectId: "liftup-user-authentication",
  storageBucket: "liftup-user-authentication.firebasestorage.app",
  messagingSenderId: "474076079549",
  appId: "1:474076079549:web:86885bd13594dc051bded4",
  measurementId: "G-3DE9QHCR7P"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function showCustomAlert(message) {
  document.getElementById('alert-message').textContent = message;
  document.getElementById('custom-alert').style.display = 'flex';
}

function closeAlert() {
  document.getElementById('custom-alert').style.display = 'none';
}


document.getElementById("signUpForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showCustomAlert("User registered successfully!");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500); 
        })
        .catch((error) => {
            handleFirebaseError(error);
        });
});


document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showCustomAlert("Logged in successfully!");
            setTimeout(() => {
                window.location.href = "LiftUp.html";
            }, 1500); 
        })
        .catch((error) => {
            handleFirebaseError(error);
        });
});


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
            errorMessage = error.message; 
    }

    showCustomAlert(errorMessage);
}
