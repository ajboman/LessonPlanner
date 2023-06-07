import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, addDoc, where, query, getDocs } from "firebase/firestore";
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
            totalSubmits: 0,
            type: "anonymous",
            dateCreated: new Date(),
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

export const createLessonDocument = async (lesson, userId) => {
    const lessonRef = doc(collection(db, 'lessons'));
    const lessonData = { lesson, userId };
    await setDoc(lessonRef, lessonData);
    const docSnap = await getDoc(lessonRef);
    return { id: docSnap.id, ...docSnap.data() };
};



export const readLessonDocument = async (lessonId) => {
    const lessonRef = doc(db, "lessons", lessonId);
    const lessonSnap = await getDoc(lessonRef);
    if (lessonSnap.exists()) {
        return lessonSnap.data();
    } else {
        console.log('No such lesson!');
        return null;
    }
};

export const updateLessonDocument = async (lessonId, updatedData) => {
    const lessonRef = doc(db, "lessons", lessonId);
    await updateDoc(lessonRef, updatedData);
};

export const deleteLessonDocument = async (lessonId) => {
    const lessonRef = doc(db, "lessons", lessonId);
    await deleteDoc(lessonRef);
};

export const readAllUserLessons = async (userId) => {
    const lessonsRef = collection(db, "lessons");
    const querySnapshot = await getDocs(query(lessonsRef, where("userId", "==", userId)));

    const lessons = [];
    querySnapshot.forEach((doc) => {
        lessons.push({
            id: doc.id,
            lesson: doc.data().lesson,
            userId: doc.data().userId,
        });
    });

    return lessons;
};
