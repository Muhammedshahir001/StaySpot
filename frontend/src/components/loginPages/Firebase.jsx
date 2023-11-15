import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import {userAxiosInstance} from '../../axios/instance'

const firebaseConfig = {
  apiKey: "AIzaSyAY2ONmQgp3CughPn_kAme-gALRazOcUiU",
  authDomain: "auth-57508.firebaseapp.com",
  projectId: "auth-57508",
  storageBucket: "auth-57508.appspot.com",
  messagingSenderId: "692653232514",
  appId: "1:692653232514:web:04aa7e616f588e3cb97f9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result,"This is the result in the Firebase");
    if (result) {
      const name = result.user.displayName;
      const email = result.user.email;
      const data = { name, email };
      const response = await userAxiosInstance.post(`googleAuthencate`, data);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("usertoken", response.data.token);
        window.location.href = `http://localhost:3000`;
      } else {
        toast.error(response.data.message);
      }
    }
  } catch (error) {
    console.error(error,"error occured in the firebase page ");
  }
};
