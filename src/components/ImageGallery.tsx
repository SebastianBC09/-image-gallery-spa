import React from 'react'
import ImageCard from './ImageCard.tsx'
import { getAllImages } from '../services/api.ts';
import { Image } from '../types/components.ts'

const ImageGallery = () => {
  const [images, setImages] = React.useState<Image[]>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imageList = await getAllImages();
        setImages(imageList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages().catch(console.error);
  }, []);

  const imageCards = React.useMemo(() => {
    return images?.map(({ id, title, price, author, main_attachment, likes_count, liked }, i) => (
      <ImageCard
        key={i}
        id={id}
        title={title}
        price={price}
        author={author}
        main_attachment={main_attachment}
        likes_count={likes_count}
        liked={liked}
      />
    ));
  }, [images]);

  return (
    <div className="container flex flex-row flex-wrap justify-center gap-[20px]">
      {imageCards}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default ImageGallery;