import React from 'react';

const Lessons = ({ allLessons, onDeleteLesson }) => {
  const handleDeleteLesson = (index) => {
    onDeleteLesson(index);
  };

  return (
    <div>
      <h1>Lessons</h1>
      {allLessons.length === 0 ? (
        <p>No lessons saved yet.</p>
      ) : (
        <ul>
          {allLessons.map((lesson, index) => (
            <li key={index}>
              {lesson}
              <button
                onClick={() => handleDeleteLesson(index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Lessons;
