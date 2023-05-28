import { Modal, Button } from 'flowbite-react';

const Popup = ({ response, isVisible, onClose, onSave }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <Modal onClose={onClose} popup show={isVisible} size="md">
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">
                                Lesson Plan
                            </h3>
                            <p className='text-sm text-black whitespace-pre-wrap'>
                                {response}
                            </p>
                            <div className="flex justify-center gap-4 mt-5">
                                <Button
                                    color="black"
                                    onClick={onSave}
                                >
                                    Save
                                </Button>
                                <Button
                                    color="black"
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default Popup;
