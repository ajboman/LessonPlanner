import { useContext, useEffect, useState } from 'react';
import { getAuth, signOut, sendPasswordResetEmail } from 'firebase/auth';
import UserContext from '../services/UserContext';
import { Button, Modal } from 'flowbite-react';
import { updateUserDocument, readUserDocument } from '../services/Firestore';

const Profile = () => {
  const user = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

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
        // Logout successful
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  const handlePasswordReset = () => {
    const auth = getAuth();
    if (user && user.email) {
      sendPasswordResetEmail(auth, user.email)
        .then(() => {
          alert('Password reset email sent!');
          setShowModal(false);
        })
        .catch((error) => {
          console.error('Error sending password reset email:', error);
        });
    }
  };

  return (
    <div className="p-6 w-full bg-gray-800 text-white">
      {user && user.email ? (
        <>
          <h3>Email: {user.email}</h3>
          {user.emailVerified ? <p>Email verified ✔️</p> : <p>Verified: Email has been sent. May Appear in Spam Folder.</p>}
          <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 mt-2">
            Reset Password
          </Button>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 mt-4">
            Logout
          </Button>
          

          <Modal
            onClose={() => setShowModal(false)}
            popup
            size="md"
            show={showModal}
            className='centered-modal'
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  <p>
                    Are you sure you want to reset your password? An email will be sent to {user.email}.
                  </p>
                </h3>
                <div className="flex justify-center gap-4">
                  <Button
                    className='bg-red-600'
                    onClick={handlePasswordReset}
                  >
                    Yes, send email
                  </Button>
                  <Button
                    className='bg-gray-500'
                    onClick={() => setShowModal(false)}
                  >
                    <p>
                      No, cancel
                    </p>
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

        </>
      ) : (
        <p>No email yet. Please sign up.</p>
      )}
    </div>
  );
};

export default Profile;
