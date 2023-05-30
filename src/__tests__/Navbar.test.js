import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
	beforeEach(() => {
		render(
			<Router>
				<Navbar />
			</Router>
		);
	});

	it('renders without crashing', () => {
		const navbarElement = screen.getByText(/Lesson Planner/i);
		expect(navbarElement).toBeInTheDocument();
	});

	it('renders links correctly', () => {
		const planLinkElement = screen.getByRole('link', { name: /Plan/i });
		expect(planLinkElement).toBeInTheDocument();
		expect(planLinkElement).toHaveAttribute('href', '/plan');

		const lessonsLinkElement = screen.getByRole('link', { name: /Lessons/i });
		expect(lessonsLinkElement).toBeInTheDocument();
		expect(lessonsLinkElement).toHaveAttribute('href', '/lessons');
	});

	it('renders GitHub button correctly', () => {
		const githubButtonElement = screen.getByText(/GitHub/i);
		expect(githubButtonElement).toBeInTheDocument();
	});
});
