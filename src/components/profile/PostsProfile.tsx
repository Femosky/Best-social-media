import { PostGridItem } from './PostGridItem';
import { images } from '../../data/stockImages';

export function PostsProfile() {
    return (
        <div className="grid grid-cols-3">
            {images.map((image) => (
                <PostGridItem key={image.id} {...image} />
            ))}
        </div>
    );
}
