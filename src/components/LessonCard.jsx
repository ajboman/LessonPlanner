import { Card, Button } from 'flowbite-react';
import { BsClipboard, BsCheckCircle, BsTrash } from 'react-icons/bs';
import { cleanLessonText } from '../services/utils';


const LessonCard = ({ lesson, handleDeleteLesson, handleCopyToClipboard, copiedLessonId, handleOpenPopup }) => {
  return (
    <Card
      key={lesson.id}
      onClick={() => handleOpenPopup(lesson)}
      className="relative overflow-y-auto max-h-96 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
        color: 'var(--primary)',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--primary) var(--secondary)',
      }}
    >
      {copiedLessonId === lesson.id && (
        <div className="absolute top-2 left-2 text-primary">
          <BsCheckCircle size={20} />
        </div>
      )}
      <Button
        onClick={(e) => {
          e.stopPropagation(); 
          handleDeleteLesson(lesson.id);
        }}
        className="absolute top-2 right-2 mx-2 px-2 py-1 bg-button hover:bg-button_hover text-white font-bold  rounded-full transition-colors duration-300 ease-in-out"
        aria-label={`Delete lesson ${lesson.id}`}
        variant="danger"
        size="sm"
      >
        <span className="text-lg"> <BsTrash size={24} />
        </span>
      </Button>
      <div className="font-medium overflow-y-auto text-text dark:text-gray-400 pt-6 whitespace-pre-wrap" style={{ width: '110%' }}>
        {cleanLessonText(lesson.lesson)}
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation(); 
          handleCopyToClipboard(lesson.id, lesson.lesson);
        }}
        className="absolute top-2 left-2 px-2 bg-button hover:bg-button_hover text-white font-bold py-2 rounded-full transition-colors duration-300 ease-in-out"
        aria-label={`Copy lesson ${lesson.id}`}
        size="sm"
      >
        {copiedLessonId === lesson.id ? (
          <BsCheckCircle size={20} />
        ) : (
          <BsClipboard size={20} />
        )}
      </Button>
    </Card>
  );
};

export default LessonCard;
