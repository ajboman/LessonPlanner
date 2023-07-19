import { useEffect, useState } from 'react';
import LessonDelete from './LessonDelete';
import LessonCard from './LessonCard';
import NoLessons from './NoLessons';
import LessonPopup from './LessonPopup';

const Lessons = ({ allLessons, onDeleteLesson }) => {
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [copiedLessonId, setCopiedLessonId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [editedLesson, setEditedLesson] = useState('');

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

  const handleOpenPopup = (lesson) => {
    setEditedLesson(lesson.lesson);
    setSelectedLesson(lesson);
  };

  const handleClosePopup = () => {
    setSelectedLesson(null);
  };

  const handleUpdateLesson = (updatedLesson) => {
    setLessons(lessons.map(lesson => lesson.id === updatedLesson.id ? updatedLesson : lesson));
    setSelectedLesson(updatedLesson);
  };


  useEffect(() => {
    setLessons(allLessons);
  }, [allLessons]);


  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold text-text dark:text-dark">Saved Lessons</h1>
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
              handleOpenPopup={handleOpenPopup}
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
      <LessonPopup
        lesson={selectedLesson}
        open={!!selectedLesson}
        handleClose={handleClosePopup}
        onUpdateLesson={handleUpdateLesson}
        editedLesson={editedLesson}
        setEditedLesson={setEditedLesson}
      />
    </div>
  );
};

export default Lessons;
