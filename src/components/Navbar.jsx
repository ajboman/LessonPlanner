import { useContext } from 'react';
import { Button, Navbar as Flowbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import UserContext from '../services/UserContext';

const Navbar = ({ openLogin }) => {
	const user = useContext(UserContext);
	const isAnonymous = user ? user.isAnonymous : true;

	return (
		<div className='w-full fixed top-0 z-10'>
			<Flowbar fluid style={{backgroundColor: 'gray'}} >
				<Flowbar.Brand>
					<div className="text-2xl text-black">Lesson Planner</div>
				</Flowbar.Brand>
				<div className="flex-grow"></div>
				<Flowbar.Link as={Link} to="/plan">
					<Button className="m-2 bg-gray-500 hover:bg-gray-600">
						Plan
					</Button>
				</Flowbar.Link>
				<Flowbar.Link as={Link} to="/lessons">
					<Button className="m-2 bg-gray-500 hover:bg-gray-600">
						Lessons
					</Button>
				</Flowbar.Link>
				{isAnonymous ? (
					<Button
						className="m-2 bg-gray-500 hover:bg-gray-600"
						onClick={openLogin}
					>
						Login
					</Button>
				) : (
					<Flowbar.Link as={Link} to="/profile">
						<Button className="m-2 bg-gray-500 hover:bg-gray-600">
							Profile
						</Button>
					</Flowbar.Link>
				)}
				<div className="flex-grow"></div>
				<Button
					type='button'
					onClick={() => window.open('https://github.com/ajboman/LessonPlanner')}
					className='black_btn m-2'
				>
					GitHub
				</Button>
			</Flowbar>
		</div>
	);
};

export default Navbar;
