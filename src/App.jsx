import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Info from './components/Info';
import Form from './components/Form';
import Lessons from './components/Lessons';

import './App.css';

const App = () => {
    return (
        <Router>
            <main>
                <div className='main' />
                <Navbar />
                <Routes>
                    <Route path="/plan" element={<><Info /><Form /></>} />
                    <Route path="/lessons" element={<Lessons />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
