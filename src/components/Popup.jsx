import { Modal, Button } from 'flowbite-react';

const Popup = ({ response, isVisible, onClose, onSave }) => {
    return (
        <Modal onClose={onClose} popup show={isVisible} size="md" color='gray'>
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
                            color="success"
                            onClick={onSave}
                        >
                            Save
                        </Button>
                        <Button
                            color="gray"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Popup;
