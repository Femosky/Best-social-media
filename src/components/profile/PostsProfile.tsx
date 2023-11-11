import { images } from '../../data/stockImages';

export function PostsProfile() {
    return (
        <div className="grid grid-cols-3">
            {images.map((image) => (
                <div className="border h-[11rem">
                    <img className="object-cover" src={image.imageUrl} alt="" />
                </div>
            ))}
        </div>
    );
}
