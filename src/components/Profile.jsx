import { useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import UserContext from '../services/UserContext';
import { Button } from 'flowbite-react';

const Profile = () => {
  const user = useContext(UserContext);

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
