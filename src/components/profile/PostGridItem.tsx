import { useState } from 'react';
import { images } from '../../data/stockImages';

export function PostGridItem() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="border h-[11rem relative"
        >
            <img className="object-cover" src={image.imageUrl} alt="" />
            {isHovered && <div className="flex absolute inset-0 bg-black opacity-50"></div>}
        </div>
    );
}
