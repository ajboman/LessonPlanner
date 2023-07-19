import { Button, Modal } from 'flowbite-react';

const Logout = ({ showModal, setShowModal, handleLogout }) => {
  return (
    <Modal
      onClose={() => setShowModal(false)}
      popup
      size="md"
      show={showModal}
      className="centered-modal"
    >
      <Modal.Header className='bg-secondary text-text' />
      <Modal.Body className='bg-secondary text-text'>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-text">
            <p>Are you sure you want to logout?</p>
          </h3>
          <div className="flex justify-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
              Yes, Logout
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

export default Logout;
