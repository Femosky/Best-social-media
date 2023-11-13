import { Heart } from 'lucide-react';
import { useState } from 'react';

type PostGridItem = {
    id: string;
    imageUrl: string;
};

export function PostGridItem({ id, imageUrl }: PostGridItem) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            key={id}
            className="border h-[11rem] relative"
        >
            <img className="object-cover" src={imageUrl} alt="" />
            {isHovered && (
                <div className="flex absolute inset-0 bg-black opacity-50 justify-center items-center">
                    <Heart />
                </div>
            )}
        </div>
    );
}
