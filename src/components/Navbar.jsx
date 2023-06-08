import { useContext } from 'react';
import { Button, Navbar as Flowbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import UserContext from '../services/UserContext';

const Navbar = ({ openLogin }) => {
  const user = useContext(UserContext);
  const isAnonymous = user ? user.isAnonymous : true;

  return (
    <div className="w-full fixed top-0 z-10">
      <div
        className="fixed inset-x-0 top-0 h-16 backdrop-filter backdrop-blur-sm"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))',
          zIndex: -1,
        }}
      ></div>
      <Flowbar fluid style={{ backgroundColor: 'transparent' }}>
        <Flowbar.Brand>
          <div className="text-2xl text-secondary">Lesson Planner</div>
        </Flowbar.Brand>
        <div className="flex-grow"></div>
        <Flowbar.Link as={Link} to="/plan">
          <Button className="m-2 bg-button hover:bg-button_hover">
            Plan
          </Button>
        </Flowbar.Link>
        <Flowbar.Link as={Link} to="/lessons">
          <Button className="m-2 bg-button hover:bg-button_hover">
            Lessons
          </Button>
        </Flowbar.Link>
        {isAnonymous ? (
          <Button
            className="m-2 bg-button hover:bg-button_hover"
            onClick={openLogin}
          >
            Login
          </Button>
        ) : (
          <Flowbar.Link as={Link} to="/profile">
            <Button className="m-2 bg-button hover:bg-button_hover">
              Profile
            </Button>
          </Flowbar.Link>
        )}
        <div className="flex-grow"></div>
        <Button
          type="button"
          onClick={() =>
            window.open('https://github.com/ajboman/LessonPlanner')
          }
          className="m-2 bg-button hover:bg-button_hover"
        >
          GitHub
        </Button>
      </Flowbar>
    </div>
  );
};

export default Navbar;
