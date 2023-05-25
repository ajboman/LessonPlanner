import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Info from './components/Info';
import Form from './components/Form';
import Lessons from './components/Lessons';

import './App.css';

const RedirectToPlan = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/plan');
  }, [navigate]);

  return null;
}

const App = () => {
  const [allLessons, setAllLessons] = useState([]);

  useEffect(() => {
    const storedLessons = JSON.parse(localStorage.getItem('lessons'));
    if (storedLessons) {
      setAllLessons(storedLessons);
    }
  }, []);

  const saveLesson = (lesson) => {
    const newLessons = [...allLessons, lesson];
    setAllLessons(newLessons);
    localStorage.setItem('lessons', JSON.stringify(newLessons));
  };

  const deleteLesson = (index) => {
    const updatedLessons = [...allLessons];
    updatedLessons.splice(index, 1);
    setAllLessons(updatedLessons);
    localStorage.setItem('lessons', JSON.stringify(updatedLessons));
  };

  
  return (
    <Router>
      <main>
        <div className='main' />
        <Navbar />
        <Routes>
          <Route path="/" element={<RedirectToPlan />} />
          <Route path="/plan" element={<><Info /><Form saveLesson={saveLesson} /></>} />
          <Route path="/lessons" element={<Lessons allLessons={allLessons} onDeleteLesson={deleteLesson} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
