import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

export const splitText = (container) => {
  gsap.registerPlugin(ScrollTrigger)
  const text = container.querySelectorAll('[element="split-text"]')
  text.forEach((element) => {
    const splittedText = SplitType.create(element)
    splittedText.lines.forEach((element) => {
      element.style.overflow = 'hidden'
    })
    const direction = splittedText.elements[0].getAttribute('direction')
    const tl = gsap.timeline({ paused: true })
    ScrollTrigger.create({
      trigger: element,
      start: 'top 75%',
      end: 'bottom 75%',
      animation: tl,
      scrub: 3,
    })
    tl.from(splittedText.chars, {
      y: direction == 'down' ? '-70%' : '70%',
      scaleY: 0.5,
      opacity: 0,
      stagger: splittedText.words.length > 50 ? 0 : 0.01,
      duration: 1,
      ease: 'power2.inOut',
      // onComplete: () => {
      //   splittedText.revert()
      // },
    })
  })
}
