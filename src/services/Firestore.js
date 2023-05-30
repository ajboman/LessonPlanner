import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { app } from './Firebase';

const db = getFirestore(app);

export const createUserDocument = async (user) => {
    if (!user) return;
  
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
  
    // If the document does not exist, create a new one
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        verified: user.emailVerified,
        clicksRemaining: 1,
      });
    }
  };  

export const readUserDocument = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log('No such user!');
    return null;
  }
};

export const updateUserDocument = async (uid, updatedData) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updatedData);
};

export const deleteUserDocument = async (uid) => {
  const userRef = doc(db, "users", uid);
  await deleteDoc(userRef);
};
