import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <div className="flex justify-between bg-green-300">
            <div>
                <a href="/">
                    <img className="border" src="../assets/logo-best.png" alt="" />
                </a>
            </div>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Button>Login</Button>
                <Button variant={'dark'}>Sign up</Button>
            </div>
        </div>
    );
}
