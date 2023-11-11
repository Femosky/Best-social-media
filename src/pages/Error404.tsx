import { Link } from 'react-router-dom';

export function Error404() {
    return (
        <div className="flex flex-col items-center">
            <div className="text-red-500">ERROR 404</div>
            <Link to="/" reloadDocument>
                CLICK TO GO BACK HOME
            </Link>
        </div>
    );
}
