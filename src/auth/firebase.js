import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastWarnNotify, toastErrorNotify  } from "../helpers/ToastNotify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = (navigate) => {
  signInWithPopup(auth, provider)
    .then((result2) => {
      console.log(result2);
      toastSuccessNotify("Logged out successfully")
      navigate("/")
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then((res) => {
      console.log(res);
      toastSuccessNotify("Logged out successfully")
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};


export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      // alert(err.message);
      // ..
    });
};
