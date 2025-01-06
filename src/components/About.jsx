import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { ScrollTrigger } from "gsap/all"
import AnimatedTitle from "./AnimatedTitle"

gsap.registerPlugin(ScrollTrigger)

const About = () => {

    useGSAP(() =>{
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',  //it will trigger 800px after it passes to center
                scrub: 0.5, //scrub refers to how we're moving through animation on scroll
                pin: true,
                pinSpacing: true
            }
        })

        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0
        })
    })

  return (
    <div id="about" className="min-h-screen w-screen">
        <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
            <h2 className="font-general text-sm uppercase md:text-[10px]">
                Welcome to Zentry
            </h2>

            <AnimatedTitle />

            <div className="about-subtext">
                <p>The Metagame begins-your life, now an epic MMORPG</p>
                <p>Zentry is the unified play layer that bridges players, agentic AI, and blockchains, creating a new economic paradigm</p>
            </div>
        </div>

        <div id="clip" className="h-dvh w-screen">
            <div className="mask-clip-path about-image">
                <img 
                    src="img/about.webp"
                    alt="Background"
                    className="absolute left-0 top-0 size-full object-cover"
                  />
            </div>
        </div>

    </div>
  )
}

export default About