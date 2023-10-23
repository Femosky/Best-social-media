import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <div className="flex justify-between items-center py-4 px-3">
            <div>
                <Link to="/">
                    <img className="w-[80px]" src="src\assets\logo-best.png" alt="" />
                </Link>
            </div>
            {/* <div>
                <Link to="/">Home</Link>
            </div> */}
            <div className="flex gap-4">
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
                <Link to="/login">
                    <Button className="hover:font-semibold" variant={'dark'}>
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
    );
}
