/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import gsap from "gsap"; 

const AnimatedTitle = ({title, containerClass}) => {
  const containerRef = useRef(null);

  useEffect(()=>{
    const context = gsap.context(()=>{
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse' //basically toggleAction = once or also togglePlaces are onEnter, onLeave, on EnterBack and onLeaveBack i.e in our case onEnter=play, onLeave=onEnterBack=none and onLeaveBack=reverse the animation
        }
      })

      titleAnimation.to('.animated-word',{
        opacity: 1,
        transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
        ease: 'power1.inOut',
        stagger: 0.02
      })
    }, containerRef)

    return () => context.revert(); //clean up on mouting of the component
  }, [])

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
           {title.split('<br />').map((line, index) => (
            <div key={index} className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3">
              {line.split(' ').map((word, i) => (
                <span key={i} className="animated-word" dangerouslySetInnerHTML={{__html : word}} />
              ))}
            </div>
           ))}
    </div>
  )
}

export default AnimatedTitle