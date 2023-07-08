import { useContext, useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import UserContext from '../services/UserContext';
import { Button } from 'flowbite-react';
import { updateUserDocument, readUserDocument } from '../services/Firestore';
import ResetPassword from '../components/ResetPassword';
import Logout from '../components/Logout';
import { sendVerificationEmail } from '../services/emailVerification'; 

const Profile = () => {
  const user = useContext(UserContext);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [totalSubmits, setTotalSubmits] = useState(0);
  const [resendButtonVisible, setResendButtonVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await readUserDocument(user.uid);
      if (userData) {
        setTotalSubmits(userData.totalSubmits || 0);
      }
    };

    const verifyUserEmail = async () => {
      const userData = await readUserDocument(user.uid);
      if (user.emailVerified && !userData.verified) {
        await updateUserDocument(user.uid, { verified: true, type: 'verified', clicksRemaining: 3 });
      }
    };

    if (user) {
      fetchData();
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

  const handleResendVerificationEmail = async () => {
    const auth = getAuth();
    try {
      await sendVerificationEmail(auth.currentUser); 
      console.log('Verification email sent successfully');
      setResendButtonVisible(false);
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };
  

  return (
    <div className="p-6 w-full bg-primary text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      {user?.email ? (
        <div className="space-y-3">
          <h3 className="text-xl font-medium">
            Email: <span className="font-light">{user.email}</span>
          </h3>
          <p className="text-lg">
            {user.emailVerified ? (
              'Email verified ✔️'
            ) : (
              <>
                Verification: Email has been sent. May Appear in Spam Folder.
                {resendButtonVisible && (
                  <Button
                    onClick={handleResendVerificationEmail}
                    className="bg-button hover:bg-button_hover w-full py-2 text-lg rounded-lg mt-2"
                  >
                    Resend Verification Email
                  </Button>
                )}
              </>
            )}
          </p>
          <p className="text-lg">Total Lessons Made: {totalSubmits}</p>
          <div className="space-y-2">
            <Button
              onClick={() => setShowResetPasswordModal(true)}
              className="bg-button hover:bg-button_hover w-full py-2 text-lg rounded-lg"
            >
              Reset Password
            </Button>
            <Button
              onClick={() => setShowLogoutModal(true)}
              className="bg-red-600 hover:bg-red-700 w-full py-2 text-lg rounded-lg"
            >
              Logout
            </Button>
          </div>

          <ResetPassword showModal={showResetPasswordModal} setShowModal={setShowResetPasswordModal} />
          <Logout showModal={showLogoutModal} setShowModal={setShowLogoutModal} handleLogout={handleLogout} />
        </div>
      ) : (
        <p className="text-xl">No email yet. Please sign up.</p>
      )}
    </div>
  );
};

export default Profile;
