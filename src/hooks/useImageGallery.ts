import { useState, useEffect, useRef, useCallback } from 'react';
import { getAllImages } from '../services/api.ts';
import { Image } from '../types/components.ts';

const IMAGES_PER_PAGE = 5;

const useImageGallery = () => {
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [displayedImages, setDisplayedImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastImageElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
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

  useEffect(() => {
    if (page > 1) {
      const start = (page - 1) * IMAGES_PER_PAGE;
      const end = page * IMAGES_PER_PAGE;
      let newImages = allImages.slice(start, end);

      if (newImages.length === 0 && hasMore) {
        const repeatedImages = allImages.slice(0, IMAGES_PER_PAGE);
        newImages = repeatedImages.slice(0, end - start);
      }

      setDisplayedImages((prevImages) => [...prevImages, ...newImages]);
      setHasMore(newImages.length > 0);
    }
  }, [page, allImages, hasMore]);

  return {
    displayedImages,
    loading,
    lastImageElementRef,
  };
};

export default useImageGallery;