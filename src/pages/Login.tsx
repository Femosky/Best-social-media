import { Link } from 'react-router-dom';

export function Login() {
    return (
        <div>
            This is the Login Page, click{' '}
            <Link to="/">
                <span className="text-red-400">here</span>
            </Link>{' '}
            to go back to home.
        </div>
    );
}
