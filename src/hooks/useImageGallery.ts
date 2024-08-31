import { useState, useEffect, useRef, useCallback } from 'react';
import { getAllImages } from '../services/api.ts';
import { Image, UseImageGallery } from '../types/components.ts'

const IMAGES_PER_PAGE = 5;

const useImageGallery: UseImageGallery = (searchQuery: string) => {
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [displayedImages, setDisplayedImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Callback ref for the last image element
  // This is used to detect when the last image is visible and load more images
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

  // Effect to fetch all images from the API when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const images = await getAllImages();
        setAllImages(images);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Effect to reset page and displayed images when the search query changes
  useEffect(() => {
    setPage(1);
    setDisplayedImages([]);
  }, [searchQuery]);

  // Effect to update displayed images when page or search query changes
  useEffect(() => {
    const filteredImages = allImages.filter((image) =>
      image.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const start = (page - 1) * IMAGES_PER_PAGE;
    const end = page * IMAGES_PER_PAGE;
    let newImages = filteredImages.slice(start % filteredImages.length, end % filteredImages.length);

    if (newImages.length === 0 && filteredImages.length > 0) {
      const remainingCount = IMAGES_PER_PAGE - newImages.length;
      const repeatedImages = filteredImages.slice(0, remainingCount);
      newImages = [...newImages, ...repeatedImages];
    }
    setDisplayedImages(prevImages => [...prevImages, ...newImages]);
    setHasMore(filteredImages.length > 0);

    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    params.set('page', page.toString());
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [page, searchQuery, allImages]);

  return {
    displayedImages,
    loading,
    lastImageElementRef,
  };
};

export default useImageGallery;