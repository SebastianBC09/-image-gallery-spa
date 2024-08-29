import React from 'react'
import { getAllImages } from '../services/api.ts';
import { Image } from '../types/components.ts'
import ImageCard from './ImageCard.tsx'

const ImageGallery = () => {
  const [images, setImages] = React.useState<Image[]>();
  // const [page, setPage] = React.useState(1);
  // const [search, setSearch] = React.useState('');

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

  console.log(images);

  return (
    <div className="ImageGallery">
      {loading && <p>Loading...</p>}
      {images?.map(({title, price, author, main_attachment}, i) => {
        return (
          <div key={i}>
            <ImageCard title={title} price={price} author={author} main_attachment={main_attachment} />
          </div>
        )
      })}
    </div>
  )
}

export default ImageGallery;