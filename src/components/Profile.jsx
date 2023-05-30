import { useContext, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import UserContext from '../services/UserContext';
import { Button } from 'flowbite-react';
import { updateUserDocument, readUserDocument } from '../services/Firestore';

const Profile = () => {
  const user = useContext(UserContext);

  useEffect(() => {
    const verifyUserEmail = async () => {
      const userData = await readUserDocument(user.uid);
      if (user.emailVerified && !userData.verified) {
        await updateUserDocument(user.uid, { verified: true });
      }
    };

    if (user) {
      verifyUserEmail();
    }
  }, [user]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="p-6 w-full bg-gray-800 text-white">
      {user && user.email ? (
        <>
          <h3>Email: {user.email}</h3>
          {user.emailVerified ? <p>Email verified ✔️</p> : <p>Email not verified</p>}
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
            Logout
          </Button>
        </>
      ) : (
        <p>No email yet. Please sign up.</p>
      )}
    </div>
  );
};

export default Profile;
