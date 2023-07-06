import { useEffect, useState } from 'react';
import LessonDelete from '../components/LessonDelete';
import LessonCard from './LessonCard';
import NoLessons from './NoLessons';

const Lessons = ({ allLessons, onDeleteLesson }) => {
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [copiedLessonId, setCopiedLessonId] = useState(null);

  const handleDeleteLesson = (lessonId) => {
    onDeleteLesson(lessonId);
    setShowModal(false);
  };

  const handleOpenModal = (lessonId) => {
    setLessonToDelete(lessonId);
    setShowModal(true);
  };

  const handleCopyToClipboard = (lessonId, lessonText) => {
    navigator.clipboard.writeText(lessonText);
    setCopiedLessonId(lessonId);

    setTimeout(() => {
      setCopiedLessonId(null);
    }, 3000);
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
          <NoLessons />
        ) : (
          lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              handleDeleteLesson={handleOpenModal}
              handleCopyToClipboard={handleCopyToClipboard}
              copiedLessonId={copiedLessonId}
            />
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
