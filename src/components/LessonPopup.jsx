import { Modal, Button } from 'flowbite-react';
import { useState, useEffect, useRef } from 'react';
import { cleanLessonText } from '../services/utils';
import { updateLessonDocument } from '../services/Firestore';

const LessonPopup = ({ lesson, open, handleClose, onUpdateLesson, editedLesson, setEditedLesson }) => {
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.focus();
    }
  }, [isEditing]);

  if (!lesson) return null;

  const handleEditClick = () => {
    setIsEditing(true);
    textareaRef.current.value = cleanLessonText(editedLesson);
  };

  const handleSaveClick = async () => {
    const { id, ...lessonData } = lesson;
    const updatedLessonText = textareaRef.current.value;
    const updatedLessonData = { ...lessonData, lesson: updatedLessonText };
    await updateLessonDocument(id, updatedLessonData);
    onUpdateLesson({ id, ...updatedLessonData });
    setEditedLesson(updatedLessonText);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <Modal
      show={open}
      size="lg"
      className="text-text bg-primary"
    >
      <Modal.Body className="bg-secondary min-h-[89vh] max-h-[89vh] overflow-y-auto">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            defaultValue={cleanLessonText(editedLesson)} 
            className="w-full text-text bg-secondary border-none resize-none font-inherit overflow-hidden"
          />
        ) : (
          <div className="whitespace-pre-wrap">{cleanLessonText(editedLesson)}</div>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-primary">
        {isEditing ? (
          <>
            <Button
              onClick={handleSaveClick}
              className="px-2 bg-button hover:bg-button_hover text-white font-bold py-2 rounded-full transition-colors duration-300 ease-in-out"
            >
              Save
            </Button>
            <Button
              onClick={handleCancelClick}
              className="px-2 bg-button hover:bg-button_hover text-white font-bold py-2 rounded-full transition-colors duration-300 ease-in-out"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleEditClick}
              className="px-2 bg-button hover:bg-button_hover text-white font-bold py-2 rounded-full transition-colors duration-300 ease-in-out"
            >
              Edit
            </Button>
            <Button
              onClick={handleClose}
              className="px-2 bg-button hover:bg-button_hover text-white font-bold py-2 rounded-full transition-colors duration-300 ease-in-out"
            >
              Close
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default LessonPopup;
