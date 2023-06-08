import React from 'react';

const Info = () => {
  return (
    <header className='w-full flex flex-col items-center justify-center py-12 px-6 text-center bg-gradient-to-r from-secondary to-accent text-text rounded-lg shadow-xl'>
      <h1 className='text-5xl font-bold mb-6'>
        Plan Lessons Quick and Easy
      </h1>
      <h2 className='text-lg font-medium space-y-2'>
        <p>Provide as many details as you need.</p>
        <p>More details will result in a more precise plan.</p>
        <p>Login to save the Lesson Plan and view it in the Lessons page.</p>
        <p>Verify your email for longer responses.</p>
        <p>Example will not affect your lesson.</p>
      </h2>
    </header>
  )
};

export default Info;
