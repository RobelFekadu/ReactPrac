import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALYTDT_ehS4UfZ3S7YMfskRgWfd5EH7b8",
  authDomain: "ecom-clothing-5c24f.firebaseapp.com",
  projectId: "ecom-clothing-5c24f",
  storageBucket: "ecom-clothing-5c24f.appspot.com",
  messagingSenderId: "169212356695",
  appId: "1:169212356695:web:bcbeee3fbb4beccaf6db12",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error.message);
    });
