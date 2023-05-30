import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useContext } from 'react';
import UserContext from '../services/UserContext';

const Navbar = ({ openLogin }) => {
	const user = useContext(UserContext);
	const isAnonymous = user ? user.isAnonymous : true;

	return (
		<header className="w-full flex justify-center items-center flex-col p-5">
			<nav className='flex justify-between items-center w-full mb-10 pt-3'>
				<div className="text-2xl text-black">Lesson Planner</div>
				<div className="link-buttons-container">
					<Link to="/plan" className='text-white'>
						<Button className="link-button">Plan</Button>
					</Link>
					<Link to="/lessons" className='text-white'>
						<Button className="link-button"> Lessons</Button>
					</Link>

				</div>
				{isAnonymous ? (
					<Button
						className="link-button"
						onClick={openLogin}
					>
						Login
					</Button>
				) : (
					<Link to="/profile" className='text-white'>
						<Button className="link-button"> Profile </Button>
					</Link>
				)}
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
