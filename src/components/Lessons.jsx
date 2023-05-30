import { Card, Button } from 'flowbite-react';

const Lessons = ({ allLessons, onDeleteLesson }) => {
  const handleDeleteLesson = (index) => {
    onDeleteLesson(index);
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Lessons</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {allLessons.length === 0 ? (
          <p>No lessons saved yet.</p>
        ) : (
          allLessons.map((lesson) => (
            <Card key={lesson.id} className="relative overflow-y-auto max-h-96 bg-inherit">
              <Button 
                onClick={() => handleDeleteLesson(lesson.id)}
                className="absolute top-2 right-2 bg-transparent hover:bg-red-500 text-red-500 hover:text-white font-bold py-1 px-2 rounded"
                aria-label={`Delete lesson ${lesson.id}`}
                variant="danger"
                size="sm"
              >
                <span className="text-lg">✕</span>
              </Button>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Lesson
              </h5>
              <div className="font-normal text-gray-900 dark:text-gray-400 pl-2 whitespace-pre-wrap">
                {lesson.lesson}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Lessons;
