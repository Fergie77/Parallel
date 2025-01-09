import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

export const splitText = (container) => {
  gsap.registerPlugin(ScrollTrigger)
  const text = container.querySelectorAll('[element="split-text"]')

  // Determine if the current device is mobile
  const isMobile = window.innerWidth <= 768 // Adjust the breakpoint as needed

  text.forEach((element) => {
    // Skip animation for elements with no-mobile=true on mobile devices
    if (isMobile && element.getAttribute('no-mobile') === 'true') {
      return
    }

    const splittedText = SplitType.create(element)
    const direction = splittedText.elements[0].getAttribute('direction')
    const tl = gsap.timeline({ paused: true })

    ScrollTrigger.create({
      trigger: element,
      start: 'top 95%',
      end: 'bottom 75%',
      animation: tl,
      scrub: 3,
      markers: true,
    })

    tl.from(splittedText.words, {
      y: direction == 'down' ? '-70%' : '70%',
      opacity: 0,
      filter: 'blur(20px)',
      stagger: splittedText.words.length > 50 ? 0 : 0.05,
      duration: 1,
      ease: 'power2.inOut',
      // onComplete: () => {
      //   splittedText.revert()
      // },
    })
  })
}
