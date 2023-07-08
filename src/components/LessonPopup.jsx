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
      style={{
        color: 'var(--text)',
        backgroundColor: 'var(--primary)',
      }}
    >
      <Modal.Body style={{
        backgroundColor: 'var(--secondary)',
        maxHeight: '89vh',
        overflowY: 'auto'
      }}>
        {isEditing ? (
          <textarea
            ref={textareaRef}
            defaultValue={cleanLessonText(editedLesson)} 
            className="w-full"
            style={{
              color: 'var(--text)',
              backgroundColor: 'var(--secondary)',
              border: 'none',
              resize: 'none',
              fontFamily: 'inherit',
              overflow: 'hidden',
            }}
          />
        ) : (
          <div className="whitespace-pre-wrap">{cleanLessonText(editedLesson)}</div>
        )}
      </Modal.Body>
      <Modal.Footer style={{
        backgroundColor: 'var(--primary)',
      }}
      >
        {isEditing ? (
          <>
            <Button
              variant="secondary"
              onClick={handleSaveClick}
              style={{
                backgroundColor: 'var(--button)',
                color: 'var(--text)',
              }}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancelClick}
              style={{
                backgroundColor: 'var(--button)',
                color: 'var(--text)',
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={handleEditClick}
              style={{
                backgroundColor: 'var(--button)',
                color: 'var(--text)',
              }}
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{
                backgroundColor: 'var(--button)',
                color: 'var(--text)',
              }}
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
