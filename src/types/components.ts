import React from 'react'

export interface Searchbar {
  onSearch: (query: string) => void;
}

export interface ImageGallery {
  children: (image: Image, ref: React.Ref<HTMLDivElement> | null) => React.ReactNode;
  searchQuery: string;
}

export interface Image {
  type?: string;
  id: number;
  title: string;
  price: number
  author: string;
  created_at?: string;
  main_attachment: MainAttachment;
  likes_count: number;
  liked: boolean;
  links?: Link[];
}

interface MainAttachment {
  big: string;
  small: string;
}

interface Link {
  rel: string;
  uri: string;
  methods: string;
}

