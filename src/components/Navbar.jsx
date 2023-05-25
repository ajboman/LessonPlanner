import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col p-5">
            <nav className='flex justify-between items-center w-full mb-10 pt-3'>
                <div className="text-2xl text-black">Lesson Planner</div>
                <div>
                    <Link to="/plan" className='mr-4 text-black'>Plan</Link>
                    <Link to="/lessons" className='text-black'>Lessons</Link>
                </div>
                <button
                    type='button'
                    onClick={() =>
                        window.open('https://github.com/ajboman/LessonPlanner')}
                    className='black_btn'>
                    GitHub
                </button>
            </nav>
        </header>
    )
}

export default Navbar;
