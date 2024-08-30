import React from 'react'
import ImageCard from './ImageCard.tsx'
import { getAllImages } from '../services/api.ts';
import { Image } from '../types/components.ts'

const IMAGES_PER_PAGE = 10;

const ImageGallery = () => {
  const [allImages, setAllImages] = React.useState<Image[]>([]);
  const [displayedImages, setDisplayedImages] = React.useState<Image[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const observer = React.useRef<IntersectionObserver | null>(null);

  const lastImageElementRef = React.useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  React.useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const images = await getAllImages();
        setAllImages(images);
        setDisplayedImages(images.slice(0, IMAGES_PER_PAGE));
        setHasMore(images.length > IMAGES_PER_PAGE);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  React.useEffect(() => {
    if (page > 1) {
      const start = (page - 1) * IMAGES_PER_PAGE;
      const end = page * IMAGES_PER_PAGE;
      let newImages = allImages.slice(start, end);

      if (newImages.length === 0 && hasMore) {
        const repeatedImages = allImages.slice(0, IMAGES_PER_PAGE);
        newImages = repeatedImages.slice(0, end - start); // Reassign `newImages`
      }

      setDisplayedImages((prevImages) => [...prevImages, ...newImages]);
      setHasMore(newImages.length > 0);
    }
  }, [page, allImages, hasMore]);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-[20px]">
      {displayedImages.map((image, index) => (
        <div key={image.id} ref={index === displayedImages.length - 1 ? lastImageElementRef : null}>
          <ImageCard {...image} />
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;