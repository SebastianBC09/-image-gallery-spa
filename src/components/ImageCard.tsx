import React from 'react';
import { Image } from '../types/components.ts'

const ImageCard: React.FC<Image> = ({
  title,
  price,
  author,
  main_attachment,
  likes_count,
  liked}) => {
  return (
    <div className="ImageCard--container">
      <div className="ImageCard--body">
        <img className="ImageCard--image" src={main_attachment.big} alt={title} />
        <p>{price}</p>
        <p>{likes_count}</p>
        <p>{liked}</p>
      </div>
      <div className="ImageCard--footer">
        <h1>{title}</h1> by <h2>{author}</h2>
      </div>
    </div>
  )
}

export default ImageCard;