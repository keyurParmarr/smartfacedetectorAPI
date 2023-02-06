const { initializeApp } = require("firebase/app");
const {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} = require("firebase/auth");
const sendMail = require("./nodemailer.utils");
const firebaseConfig = {
  apiKey: "AIzaSyCFa0FttqK5DGHY-y9oJ6AaZwXbmQM3j2A",
  authDomain: "smart-face-detector-e174f.firebaseapp.com",
  projectId: "smart-face-detector-e174f",
  storageBucket: "smart-face-detector-e174f.appspot.com",
  messagingSenderId: "883339934003",
  appId: "1:883339934003:web:373942851418ccd22e2646",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const createUser = async (email, password, username) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    if (resp) {
      sendMail(email, username);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
const loginUser = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    if (resp) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
const forgotPassword = async (email) => {
  try {
    const resp = await sendPasswordResetEmail(auth, email);
    if (resp) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  auth,
  createUser,
  loginUser,
  forgotPassword,
};
