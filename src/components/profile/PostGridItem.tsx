import { Heart, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../Button';
import { FocusOn } from 'react-focus-on';

type PostGridItem = {
    id: string;
    imageUrl: string;
    likes: number;
};

export function PostGridItem({ id, imageUrl, likes }: PostGridItem) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPostActive, setIsPostActive] = useState(false);

    function togglePostViewer() {
        setIsPostActive((prev) => !prev);
    }

    return (
        <>
            <a
                onClick={togglePostViewer}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                key={id}
                className={`border h-[11rem] relative`}
            >
                <img className="object-cover" src={imageUrl} alt="" />
                {isHovered && (
                    <div className="flex absolute gap-2 inset-0 bg-black opacity-30 justify-center items-center">
                        <p className="text-white opacity-60">{likes}</p>
                        <Heart className="hover:fill-red-500" />
                    </div>
                )}
            </a>

            {isPostActive && (
                <aside className="bg-white flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[998] justify-center items-center min-w-[50rem] w-[60rem] h-[40rem] | | ">
                    <FocusOn onClickOutside={togglePostViewer} onEscapeKey={togglePostViewer}>
                        <div>
                            <Button onClick={togglePostViewer} variant="dark" size="round">
                                <X />
                            </Button>
                        </div>
                        <img src={imageUrl} alt="" />
                        <p className="flex">Likes • {likes}</p>
                    </FocusOn>
                </aside>
            )}

            {isPostActive && <div className="bg-black bg-opacity-50 h-screen inset-0 fixed z-[995]" />}
        </>
    );
}
