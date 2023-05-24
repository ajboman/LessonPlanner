const Navbar = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col">
            <nav className='flex justify-between items-center w-full mb-10 pt-3'>
                <div>Lesson Planner</div>
                {/* can put image logo above here */}
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

export default Navbar