import { Card, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import LessonDelete from '../components/LessonDelete';

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

  const cleanLessonText = (lessonText) => {
    if (lessonText.startsWith('\n\n')) {
      return lessonText.slice(2);
    }
    return lessonText;
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold text-text dark:text-gray-100">Saved Lessons</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {lessons.length === 0 ? (
          <p className="text-center text-lg font-medium text-gray-600">No lessons saved yet.</p>
        ) : (
          lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="relative overflow-y-auto max-h-96 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)',
                color: 'var(--primary)',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--primary) var(--secondary)',
              }}
            >
              <Button
                onClick={() => handleOpenModal(lesson.id)}
                className="absolute top-2 right-2 bg-accent hover:bg-accent_hover text-white font-bold py-1 px-2 rounded-full transition-colors duration-300 ease-in-out"
                aria-label={`Delete lesson ${lesson.id}`}
                variant="danger"
                size="sm"
              >
                <span className="text-lg">✕</span>
              </Button>
              <div className="font-medium text-text dark:text-gray-400 pt-4 whitespace-pre-wrap">
                {cleanLessonText(lesson.lesson)}
              </div>
            </Card>
          ))
        )}
      </div>
      <LessonDelete
        showModal={showModal}
        setShowModal={setShowModal}
        handleDeleteLesson={handleDeleteLesson}
        lessonToDelete={lessonToDelete}
      />
    </div>
  );
};

export default Lessons;
