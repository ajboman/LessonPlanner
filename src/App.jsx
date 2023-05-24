import React from 'react'
import Navbar from './components/Navbar'
import Info from './components/Info'
import Form from './components/Form'

import './App.css'

const App = () => {
    return (
        <main>
            <div className='main'>
                {/* background */}
            </div>

            <div className='app'>
                <Navbar />
                <Info />
                <Form />
            </div>
        </main>
    )
}

export default App