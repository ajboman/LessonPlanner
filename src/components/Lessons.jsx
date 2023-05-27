import React from 'react';

const Lessons = ({ allLessons, onDeleteLesson }) => {
  const handleDeleteLesson = (index) => {
    onDeleteLesson(index);
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Lessons</h1>
      <div className="grid grid-cols-3 gap-4">
        {allLessons.length === 0 ? (
          <p>No lessons saved yet.</p>
        ) : (
          allLessons.map((lesson, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded relative overflow-y-auto max-h-96">
              <button
                onClick={() => handleDeleteLesson(index)}
                className="absolute top-2 right-2 bg-transparent hover:bg-red-500 text-red-500 hover:text-white font-bold py-1 px-2 rounded"
                aria-label={`Delete lesson ${index}`}
              >
                <span className="text-lg">✕</span>
              </button>
              <p className="pl-2 whitespace-pre-wrap">
                {lesson.startsWith('\n\n') ? lesson.substring(2) : lesson}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Lessons;
