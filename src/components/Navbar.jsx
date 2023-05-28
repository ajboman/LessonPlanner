import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const Navbar = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col p-5">
            <nav className='flex justify-between items-center w-full mb-10 pt-3'>
                <div className="text-2xl text-black">Lesson Planner</div>
                <div className="link-buttons-container"> {/* Added container div */}
                    <Button className="link-button">
                        <Link to="/plan" className='text-white'>Plan</Link>
                    </Button>
                    <Button className="link-button">
                        <Link to="/lessons" className='text-white'>Lessons</Link>
                    </Button>
                </div>
                <Button
                    type='button'
                    onClick={() => window.open('https://github.com/ajboman/LessonPlanner')}
                    className='black_btn'
                >
                    GitHub
                </Button>
            </nav>
        </header>
    )
}

export default Navbar;
