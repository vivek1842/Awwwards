/* eslint-disable no-unused-vars */
import { useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVidoes, setLoadedVidoes] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVidoes((prev) => prev+1);
  }

  // Modulo operator : used to loop videos
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  //0 % 4 = 0 + 1 => 1
  //1 % 4 = 1 + 1 => 2
  //2 % 4 = 2 + 1 => 3
  //3 % 4 = 3 + 1 => 4
  //4 % 4 = 0 + 1 => 1 

  const handleMinVidClick = () => {
    setHasClicked(true);
    // setCurrentIndex((prevIndex) => prevIndex+1);
    setCurrentIndex(upcomingVideoIndex);
    console.log(upcomingVideoIndex);
    console.log(currentIndex);
  }

  useGSAP(()=>{
    if(hasClicked){
      gsap.set('#next-video', {visibility: 'visible'});

      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale : 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: nextVideoRef.current.play(),
      });

      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut'
      })
    }
  },{dependencies: [currentIndex], revertOnUpdate: true})

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      <div id='video-frame' className='relative h-dvh z-10 w-screen overflow-hidden rounded-lg bg-blue-75'>
        <div>
          <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
              <div onClick={handleMinVidClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                <video 
                  ref={nextVideoRef}
                  src={getVideoSrc(upcomingVideoIndex)}
                  loop
                  muted
                  id='current-video'
                  className='size-64 origin-center scale-150 object-cover object-center'
                  onLoadedData={handleVideoLoad}
                />
              </div>
          </div>

          <video
             ref={nextVideoRef}
             src={getVideoSrc(currentIndex)}
             loop
             muted
             id='next-video'
             className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
             onLoadedData={handleVideoLoad}
          />

          <video 
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className='absolute left-0 top-0 size-full object-cover object-center'
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
            G<b>a</b>ming
        </h1>

        <div className='absolute top-0 left-0 z-40 size-full'>
          <div className='mt-24 px-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-100'>
              Redifi<b>n</b>e
            </h1>

            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button id='watch-trailer' title='Watch Trailer' leftIcon={<TiLocationArrow />} containerClass='!bg-yellow-300 flex-center gap-1'/>
          </div>
        </div>
      </div>

      <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
        G<b>a</b>ming
      </h1>

    </div>
  )
}

export default Hero