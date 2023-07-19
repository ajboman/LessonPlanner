import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useContext } from 'react';
import { Button, Modal } from 'flowbite-react';
import UserContext from '../services/UserContext';

const ResetPassword = ({ showModal, setShowModal }) => {
  const user = useContext(UserContext);

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
    <Modal
      onClose={() => setShowModal(false)}
      popup
      size="md"
      show={showModal}
      className="centered-modal"
    >
      <Modal.Header className='bg-secondary text-text'/>
      <Modal.Body className='bg-secondary text-text'>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-text">
            <p>
              Are you sure you want to reset your password? An email will be sent to {user.email}.
            </p>
          </h3>
          <div className="flex justify-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700" onClick={handlePasswordReset}>
              Yes, send email
            </Button>
            <Button className="bg-button hover:bg-button_hover" onClick={() => setShowModal(false)}>
              <p>No, cancel</p>
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPassword;
