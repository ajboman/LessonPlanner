import { useContext, useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import UserContext from '../services/UserContext';
import { Button } from 'flowbite-react';
import { updateUserDocument, readUserDocument } from '../services/Firestore';
import ResetPassword from '../components/ResetPassword';
import Logout from '../components/Logout';

const Profile = () => {
  const user = useContext(UserContext);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const verifyUserEmail = async () => {
      const userData = await readUserDocument(user.uid);
      if (user.emailVerified && !userData.verified) {
        await updateUserDocument(user.uid, { verified: true, type: 'verified' });
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
        setShowLogoutModal(false); 
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
          {user.emailVerified ? (
            <p>Email verified ✔️</p>
          ) : (
            <p>Verified: Email has been sent. May Appear in Spam Folder.</p>
          )}
          <Button
            onClick={() => setShowResetPasswordModal(true)}
            className="bg-blue-600 hover:bg-blue-700 mt-2"
          >
            Reset Password
          </Button>
          <Button
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-600 hover:bg-red-700 mt-4"
          >
            Logout
          </Button>

          <ResetPassword
            showModal={showResetPasswordModal}
            setShowModal={setShowResetPasswordModal}
          />
          <Logout showModal={showLogoutModal} setShowModal={setShowLogoutModal} handleLogout={handleLogout} />
        </>
      ) : (
        <p>No email yet. Please sign up.</p>
      )}
    </div>
  );
};

export default Profile;
