/* eslint-disable no-unused-vars */
import { useRef, useState } from "react"


const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVidoes, setLoadedVidoes] = useState(0);

  const totalVideos = 3;
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVidoes((prev) => prev+1);
  }

  // Modulo operator : used to loop videos
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  //0 % 3 = 0 + 1 => 1
  //1 % 3 = 1 + 1 => 2
  //2 % 3 = 2 + 1 => 3
  //3 % 3 = 0 + 1 => 1
  //4 % 3 = 1 + 1 => 2 

  const handleMinVidClick = () => {
    setHasClicked(true);
    // setCurrentIndex((prevIndex) => prevIndex+1);
    setCurrentIndex(upcomingVideoIndex);
  }

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      <div id='video-frame' className='relative h-dvh z-10 w-screen overflow-hidden rounded-lg bg-blue-75'>
        <div>
          <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
              <div onClick={handleMinVidClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                <video 
                  ref={nextVideoRef}
                  src={getVideoSrc(currentIndex+1)}
                  loop
                  muted
                  id='current-video'
                  className='size-64 origin-center scale-150 object-cover object-center'
                  onLoadedData={handleVideoLoad}
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero