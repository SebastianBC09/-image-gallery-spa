import React from 'react';
import { Image } from '../types/components.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons/faThumbsUp'
import { faRotateLeft} from '@fortawesome/free-solid-svg-icons/faRotateLeft'
import { likeImage } from '../services/api.ts'
import { useResponsiveElement } from '../hooks/useResponsiveElement.ts'

const ImageCard: React.FC<Image> = ({
  id,
  title,
  price,
  author,
  main_attachment,
  likes_count,
  liked}) => {
  const [likeCount, setLikeCount] = React.useState(likes_count ?? 0);
  const [isLiked, setIsLiked] = React.useState(liked ?? false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLikeClick = async () => {
    try {
      if(!isLiked) {
        await likeImage(id);
        setLikeCount(likeCount + 1);
        setIsLiked(true)
      } else {
        setLikeCount(likeCount - 1);
        setIsLiked(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const responsiveBlock = useResponsiveElement(<div
    className="flex flex-row justify-center border-t border-[#e2e2e2] w-[356px] h-[61px] bg-white">
    <div className="flex flex-row justify-evenly items-center w-[178px] border-r border-[#e2e2e2]">
      <span className="text-[24px]">{likeCount}</span>
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-full ${isLiked ? 'bg-[#83f3c5]' : 'bg-[#b5b5b3]'}`}
        onClick={handleLikeClick}>
        <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'white', transform: 'scaleX(-1)' }} />
      </button>
    </div>
    <div className="flex flex-row justify-evenly items-center w-[178px]">
      <button
        className="w-10 h-10 flex items-center justify-center bg-[#b5b5b3] rounded-full">
        <FontAwesomeIcon icon={faRotateLeft} style={{ color: 'white' }} />
      </button>
      <span className="text-[24px]">000</span>
    </div>
  </div>)

  return (
    <div className="w-[358px] h-[auto] border border-[#e2e2e2] md:w-[405px]">
      <div className="w-[356px] relative overflow-hidden md:w-[403px] h-[361px]"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}>
        {price !== null && (
          <div className="relative">
            <div className="absolute top-0 left-0 w-[161px] h-[101px]">
              <div className="absolute inset-0 clip-triangle bg-white">
                <div className="flex items-start justify-start pt-[21px] pl-[17px]">
                <span className="text-black text-[20px] font-bold">
                  {price}.00 <span className="text-[12px]"> € </span>
                </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {isHovered && (
          <div className="absolute inset-0 flex items-end p-4 lg:block hidden"
               style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)' }}>
            <div className="absolute top-[20px] right-[20px] flex flex-col items-center space-y-2">
              <button className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e5e7eb] transition-colors ${isLiked ? 'bg-[#83f3c5]' : 'bg-white'}`} onClick={handleLikeClick}>
                <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'black', transform: 'scaleX(-1)' }} />
              </button>
              <span className="text-white text-sm">{likeCount}</span>
              <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-[#e5e7eb] transition-colors">
                <FontAwesomeIcon icon={faRotateLeft} />
              </button>
              <span className="text-white text-sm">000</span>
            </div>
          </div>
        )}
        <img className="w-[358px] h-[361px] md:w-[403px] h-[361px]" src={main_attachment.big} alt={title}/>
      </div>
      <div className="w-[356px] h-[98px] bg-white md:w-[403px]">
        <div className="m-0 py-[14px] font-serif text-[18px]">
          <h1 className="font-sans uppercase text-[24px]">{title}</h1> by {author}
        </div>
      </div>
      {responsiveBlock}
    </div>
  )
}

export default ImageCard;