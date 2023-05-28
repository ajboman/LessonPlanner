import { Modal, Button } from 'flowbite-react';

const Popup = ({ response, isVisible, onClose, onSave }) => {
    return (
        <Modal onClose={onClose} popup visible={isVisible} size="md" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <Modal.Header />
            <Modal.Body style={{backgroundColor: 'gray'}}>
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        API Response
                    </h3>
                    <p className='text-sm text-gray-500 whitespace-pre-wrap'>
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
