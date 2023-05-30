import { useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import UserContext from '../services/UserContext';
import { TextInput, Button, Label } from 'flowbite-react';
import { sendVerificationEmail } from '../services/emailVerification';

const Login = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const user = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Login successful
      const user = userCredential.user;
      console.log('Logged in user:', user);
      closeModal();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Sign-up successful
      const user = userCredential.user;
      console.log('New user created:', user);
      await sendVerificationEmail(user); // Send email verification
      closeModal();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
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
        </button>
        <h3 className="text-xl font-medium text-gray-900">
          {isLogin ? 'Sign in to our platform' : 'Create an account'}
        </h3>
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
              <Button type="submit" className="bg-cyan-600 text-white rounded-md">
                Sign in
              </Button>
            </div>
            <div>
              <Button onClick={toggleForm} className="text-sm text-blue-500 hover:underline">
                Create an account
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
              <Button type="submit" className="bg-green-500 text-white rounded-md">
                Sign up
              </Button>
            </div>
            <div>
              <Button onClick={toggleForm} className="text-sm text-blue-500 hover:underline">
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
