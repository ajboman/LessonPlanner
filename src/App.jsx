import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Info from './components/Info';
import Form from './components/Form';
import Lessons from './components/Lessons';

import './App.css';

const App = () => {
  const [allLessons, setAllLessons] = useState(JSON.parse(localStorage.getItem('lessons')) || []);

  const saveLesson = (lesson) => {
    const newLessons = [...allLessons, lesson];
    setAllLessons(newLessons);
    localStorage.setItem('lessons', JSON.stringify(newLessons));
  };

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.pathname = '/plan';
    }
  }, []);

  return (
    <Router>
      <main>
        <div className='main' />
        <Navbar />
        <Routes>
          <Route path="/plan" element={<><Info /><Form saveLesson={saveLesson} /></>} />
          <Route path="/lessons" element={<Lessons allLessons={allLessons} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
