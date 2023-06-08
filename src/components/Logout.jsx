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
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <p>Are you sure you want to logout?</p>
          </h3>
          <div className="flex justify-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
              Yes, Logout
            </Button>
            <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowModal(false)}>
              <p>No, cancel</p>
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Logout;
