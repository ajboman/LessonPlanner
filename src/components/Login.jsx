import { useState, useContext } from 'react';
import { getAuth, linkWithCredential, signInWithEmailAndPassword, EmailAuthProvider } from 'firebase/auth';
import UserContext from '../services/UserContext';
import { TextInput, Button, Label } from 'flowbite-react';
import { sendVerificationEmail } from '../services/emailVerification';
import { updateUserDocument } from '../services/Firestore';

const Login = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const user = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const auth = getAuth();
    const anonymousUser = auth.currentUser;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);
      closeModal();
  
      if (anonymousUser && anonymousUser.isAnonymous) {
        const anonymousUserId = anonymousUser.uid;
  
        await anonymousUser.delete(); 
        console.log('Deleted anonymous user:', anonymousUserId);
  
        await deleteUserDocument(anonymousUserId);
        console.log('Deleted user document:', anonymousUserId);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Incorrect email or password. Please try again.');
    }
  };
  

  const handleSignUp = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    try {
      const emailCredential = EmailAuthProvider.credential(email, password);

      await linkWithCredential(auth.currentUser, emailCredential);

      const user = auth.currentUser;
      console.log('User upgraded:', user);
      await sendVerificationEmail(user);

      await updateUserDocument(user.uid, { email: user.email, type: 'basic', clicksRemaining: 2 });

      closeModal();
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('Error creating an account. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-end">
          <Button
            className="relative rounded-full bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 focus:outline-none"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <h3 className="text-xl font-medium text-gray-900">
          {isLogin ? 'Login' : 'Create an account'}
        </h3>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isLogin ? (
          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" className="bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
                Sign in
              </Button>
            </div>
            <div>
              <Button onClick={toggleForm} style={{ color: '#3B82F6' }}
                className="text-sm text-blue-500 hover:underline">
                Don't have an account? Create an account
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-md">
                Sign up
              </Button>
            </div>
            <div>
              <Button onClick={toggleForm} style={{ color: '#3B82F6' }} className="text-sm text-blue-500 hover:underline">
                Already have an account? Log in
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
