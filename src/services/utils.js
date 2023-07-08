export const cleanLessonText = (lessonText) => {
  if (lessonText.startsWith('\n\n')) {
    return lessonText.slice(2);
  }
  return lessonText;
};
