import { Heart } from 'lucide-react';
import { useState } from 'react';

type PostGridItem = {
    id: string;
    imageUrl: string;
    likes: number;
};

export function PostGridItem({ id, imageUrl, likes }: PostGridItem) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            key={id}
            className="border h-[11rem] relative"
        >
            <img className="object-cover" src={imageUrl} alt="" />
            {isHovered && (
                <div className="flex absolute gap-2 inset-0 bg-black opacity-30 justify-center items-center">
                    <p className="text-white opacity-60">{likes}</p>
                    <Heart className="hover:fill-red-500" />
                </div>
            )}
        </a>
    );
}
