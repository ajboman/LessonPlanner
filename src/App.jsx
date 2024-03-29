import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserContext from './services/UserContext';
import { createUserDocument } from './services/Firestore';
import { createLessonDocument, deleteLessonDocument, readAllUserLessons } from './services/Firestore';

import { getAuth, signInAnonymously } from "firebase/auth";
import { app } from './services/Firebase';
import Navbar from './components/Navbar';
import Info from './components/Info';
import Form from './components/Form';
import Lessons from './components/Lessons';
import Login from './components/Login';
import Profile from './components/Profile';

import './App.css';

const RedirectToPlan = () => {
  return <Navigate to="/plan" replace />
}

const App = () => {
  const [allLessons, setAllLessons] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        signInAnonymously(auth).then(userCredential => {
          createUserDocument(userCredential.user);
        }).catch(error => console.error(error));
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  useEffect(() => {
    if (user && user.uid && !user.isAnonymous) {
      readAllUserLessons(user.uid)
        .then((lessons) => {
          const formattedLessons = lessons.map((lesson) => ({
            id: lesson.id,
            lesson: lesson.lesson,
          }));
          setAllLessons(formattedLessons);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);


  const saveLesson = (lesson) => {
    if (user && user.uid) {
      createLessonDocument(lesson, user.uid)
        .then(newLesson => {
          setAllLessons(prevLessons => [...prevLessons, { id: newLesson.id, lesson: newLesson.lesson }]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };


  const deleteLesson = (lessonId) => {
    deleteLessonDocument(lessonId)
      .then(() => {
        setAllLessons(allLessons.filter(lesson => lesson.id !== lessonId));
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <UserContext.Provider value={user}>
      <Router>
        <main>
          <div className='main' />
          <div className='app'>
            <Navbar openLogin={openLogin} toggleTheme={toggleTheme} currentTheme={theme} />
            <div className='pt-24 w-full max-w-7xl mx-auto sm:px-16 px-6'>
              <Routes>
                <Route path="/" element={<RedirectToPlan />} />
                <Route path="/plan" element={<><Info /><Form saveLesson={saveLesson} /></>} />
                <Route path="/lessons" element={<Lessons allLessons={allLessons} onDeleteLesson={deleteLesson} />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
            {isLoginOpen && (
              <Login isOpen={isLoginOpen} closeModal={closeLogin} />
            )}
          </div>
        </main>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
