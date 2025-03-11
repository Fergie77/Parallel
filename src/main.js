import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Dropdown } from './Animations/Dropdown'
import { FooterLink } from './Animations/FooterLink'
import { navAnimation, tl, closeAllDropdowns } from './Animations/Nav'
import { numberCounter } from './Animations/NumberCounter'
import { numberCounterInitialLoad } from './Animations/NumberCounterInitialLoad'
import { fadeIn, fadeInSection } from './Animations/ScrollTriggered'
import { splitText } from './Animations/SplitText'
import { heroBlockHover } from './Elements/HeroBlockHover'
import { ProductItem } from './Elements/ProductItem'
import { ProductImagesSlider } from './Elements/ProductPageSlider'
import { ProductSlider } from './Elements/ProductSlider'

navAnimation()

numberCounterInitialLoad()
  .then(() => {
    initializePage()
  })
  .catch((error) => {
    console.error('Number counter failed to load:', error)
    initializePage() // Optionally initialize the page even if the counter fails
  })

/**
 * Initializes the page mask animation.
 * Barba is initialized halfway through the mask animation.
 */
function initializePage() {
  const pageMask = document.querySelector('.page-mask')

  if (pageMask) {
    pageMask.classList.add('mask-animation')

    // Initialize Barba halfway through the animation (e.g., after 250ms)
    const halfDuration = 0
    setTimeout(() => {
      initializeBarba()
      document.querySelector('.page-wrapper').classList.remove('initial-load')
    }, halfDuration)

    // Optional: Ensure Barba initializes after the full animation as a fallback
    pageMask.addEventListener('animationend', () => {
      // If Barba hasn't been initialized yet, initialize it now
      if (!barbaInitialized) {
        initializeBarba()
      }
    })

    // Fallback in case 'animationend' doesn't fire
    setTimeout(() => {
      initializeBarba()
    }, 2000)
  } else {
    // If no page mask is present, initialize Barba immediately
    initializeBarba()
  }
}

let barbaInitialized = false

/**
 * Initializes Barba.js with your configurations.
 */
function initializeBarba() {
  if (barbaInitialized) return // Prevent multiple initializations
  barbaInitialized = true

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
          ProductItem()
          ProductSlider(data.next.container)
          FooterLink()
          fadeInSection(data)
        },
        // afterEnter(data) {

        // },
      },
      {
        namespace: 'product',
        beforeEnter(data) {
          //    SubifySubscriptions()
          ProductImagesSlider(data.next.container)
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
          Dropdown(data.next.container)
        },
      },
      {
        namespace: 'shop',
        beforeEnter() {
          heroBlockHover()
        },
      },
    ],
    transitions: [
      {
        name: 'product-transition',
        to: { namespace: ['product'] },
        enter(data) {
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
          const tl = gsap.timeline()

          // const images = []

          // data.next.container.querySelectorAll('img').forEach((img) => {
          //   images.push(img)
          // })

          // gsap.set(images, {
          //   scale: 0.9,
          //   opacity: 0,
          // })

          tl.fromTo(
            data.current.container,
            {
              filter: 'blur(0px)',
              opacity: '1',
            },
            {
              filter: 'blur(20px)',
              opacity: 0,
              duration: 2,
            }
          )

          tl.fromTo(
            data.next.container,
            {
              opacity: '0',
              filter: 'blur(20px)',
            },
            {
              opacity: '1',
              filter: 'blur(0px)',

              duration: 1.5,
            },
            '<1'
          )

          // tl.to(
          //   images,
          //   {
          //     opacity: 1,
          //     scale: 1,
          //     duration: 2,
          //     stagger: 0.05,
          //     ease: 'expo.inOut',
          //   },
          //   '<'
          // )

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

  barba.hooks.beforeEnter(() => {
    tl.reverse()
    closeAllDropdowns()

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 2000)
  })

  barba.hooks.afterEnter(() => {
    setTimeout(() => {
      window.SealSubs.hardRefresh()
    }, 5000)
  })
}
