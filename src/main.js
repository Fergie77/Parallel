import barba from '@barba/core'
import gsap from 'gsap'

//import { navAnimation } from './Animations/Nav'
import { numberCounter } from './Animations/NumberCounter'
import { fadeIn } from './Animations/ScrollTriggered'
import { splitText } from './Animations/SplitText'
import { heroBlockHover } from './Elements/HeroBlockHover'

//navAnimation()

// function loadExternalScript(src) {
//   const script = document.createElement('script')
//   script.src = src
//   script.type = 'text/javascript'
//   script.async = true
//   document.body.appendChild(script)
// }

barba.init({
  preventRunning: true,
  views: [
    {
      namespace: 'home',
      beforeEnter(data) {
        heroBlockHover()
        fadeIn()
        splitText(data.next.container)
        numberCounter()
      },
    },
    {
      namespace: 'product',
      beforeEnter() {
        // Dynamically reload the liquify_custom.js script on each transition
        // loadExternalScript(
        //   '//testparallel.myshopify.com/cdn/shop/t/38/assets/liquify_custom.js?v=99708878005376017301728214743'
        // )
        // Avoid initializing Alpine.js twice by checking if it has already been initialized
        if (!window.Alpine.initialized) {
          // eslint-disable-next-line no-undef
          //   Alpine.start()
          window.Alpine.initialized = true // Flag that Alpine has started
        }
      },
    },
  ],
  transitions: [
    {
      name: 'product-transition',
      to: { namespace: ['product'] },
      enter(data) {
        console.log('product')
        data.next.container.classList.add('fixed')

        const gsapFadeIn = data.next.container.querySelectorAll(
          "[data-animation='gsap-fade-in']"
        )
        const gsapSlideIn = data.next.container.querySelectorAll(
          "[data-animation='gsap-slide-in']"
        )
        const gsapLineWidth = data.next.container.querySelectorAll(
          "[data-animation='gsap-line-width']"
        )
        const gsapLineHeight = data.next.container.querySelectorAll(
          "[data-animation='gsap-line-height']"
        )

        console.log(gsapSlideIn)

        gsap.from(gsapFadeIn, {
          opacity: 0,
          duration: 2,
          stagger: 0.05,
          ease: 'expo.inOut',
          delay: 0.5,
        })

        gsap.from(gsapSlideIn, {
          y: 100,
          opacity: 0,
          duration: 2,
          stagger: 0.05,
          ease: 'expo.inOut',
          delay: 0.5,
        })

        gsap.from(gsapLineWidth, {
          width: '0%',
          duration: 2,
          stagger: 0.05,
          ease: 'expo.inOut',
          delay: 1.5,
        })

        gsap.fromTo(
          gsapLineHeight,
          {
            height: '0%',
          },
          {
            height: 'auto',
            duration: 2,
            stagger: 0.05,
            ease: 'expo.inOut',
            delay: 1.5,
          }
        )

        return gsap.from(data.next.container, {
          y: '100vh',
          duration: 2,
          ease: 'expo.inOut',
          onComplete: () => {
            window.scrollTo(0, 0)
            setTimeout(() => {
              data.next.container.classList.remove('fixed')
            }, 100)
          },
        })
      },
    },
    {
      name: 'general-transition',

      enter(data) {
        gsap.fromTo(
          data.current.container,
          {
            filter: 'blur(0px)',
            opacity: '1',
            scale: '1',
          },
          {
            filter: 'blur(10px)',
            opacity: 0,
            duration: 2,
          }
        )
        gsap.fromTo(
          data.next.container,
          {
            opacity: '0',
          },
          {
            opacity: '1',
            scale: '1',
            delay: 1,
            duration: 1.5,
          }
        )
        data.next.container.classList.add('fixed')

        return gsap.from(data.next.container, {
          duration: 2,
          ease: 'expo.inOut',
          onComplete: () => {
            window.scrollTo(0, 0)
            setTimeout(() => {
              data.next.container.classList.remove('fixed')
            }, 100)
          },
        })
      },
    },
  ],
})
