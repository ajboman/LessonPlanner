import { Card, Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';

const Lessons = ({ allLessons, onDeleteLesson }) => {
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  const handleDeleteLesson = (lessonId) => {
    onDeleteLesson(lessonId);
    setShowModal(false);  
  };

  const handleOpenModal = (lessonId) => {
    setLessonToDelete(lessonId);
    setShowModal(true);
  };

  useEffect(() => {
    setLessons(allLessons);
  }, [allLessons]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Saved Lessons</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {lessons.length === 0 ? (
          <p>No lessons saved yet.</p>
        ) : (
          lessons.map((lesson) => (
            <Card key={lesson.id} className="relative overflow-y-auto max-h-96" style={{backgroundColor: "transparent"}}>
              <Button 
                onClick={() => handleOpenModal(lesson.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-transparent text-red-500 hover:text-red-500 font-bold py-1 px-2 rounded"
                aria-label={`Delete lesson ${lesson.id}`}
                variant="danger"
                size="sm"
              >
                <span className="text-lg">✕</span>
              </Button>
              <div className="font-normal text-gray-900 dark:text-gray-400 pl-2 whitespace-pre-wrap">
                {lesson.lesson}
              </div>
            </Card>
          ))
        )}
      </div>
      <Modal
        onClose={() => setShowModal(false)}
        popup
        size="md"
        show={showModal}
        className='centered-modal'
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              <p>
                Are you sure you want to delete this lesson?
              </p>
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className='bg-red-500'
                onClick={() => handleDeleteLesson(lessonToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button
                className='bg-gray-500'
                onClick={() => setShowModal(false)}
              >
                <p>
                  No, cancel
                </p>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Lessons;