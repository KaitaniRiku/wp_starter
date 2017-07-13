import Manager from 'slider-manager'
import gsap from 'gsap'

const slides = [].slice.call(document.querySelectorAll('.slider-content .slide'))
 
const slider = new Manager({
    length: slides.length -1,
    loop: false,
    callback: (event) => {
     
     console.log(event)
        
        const index = event.current
        const previous = event.previous
        const down = event.direction === 'down' 
 
        slider.animating = true
 
        const windowheight = window.innerHeight
        const tl = new TimelineMax({ paused: true, onComplete: () => {
      
            slider.animating = false

        }})
 
        tl.staggerTo(slides, 1, { cycle: {

            autoAlpha: (loop) => index === loop ? 1 : 0,
            
        }, ease: Power1.easeInOut}, 0, 0)
     
        tl.restart()
    }
})
 
slider.init()

export default slider