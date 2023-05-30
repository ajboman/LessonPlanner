import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserContext from './services/UserContext';  

import { getAuth, signInAnonymously } from "firebase/auth";
import { app } from './services/Firebase';
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedLessons = JSON.parse(localStorage.getItem('lessons'));
    if (storedLessons) {
      setAllLessons(storedLessons);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        signInAnonymously(auth).catch(error => console.error(error));
      } else {
        setUser(user);
        console.log(user);
      }
    });

    return () => unsubscribe();
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
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>

  );
}

export default App;
