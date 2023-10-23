import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <div>
            <div>
                <a href="/">
                    <img src="../assets/logo-best.png" alt="" />
                </a>
            </div>
            <div>
                <Link to="/"></Link>
            </div>
            <div>
                <Button>Login</Button>
                <Button variant={'dark'}>Sign up</Button>
            </div>
        </div>
    );
}
