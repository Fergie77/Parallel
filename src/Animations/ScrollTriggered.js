import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const fadeInSection = () => {
  gsap.registerPlugin(ScrollTrigger)

  const animatedElements = document.querySelectorAll('section')

  animatedElements.forEach((element) => {
    gsap.set(element.firstChild, {
      opacity: 0,
      filter: 'blur(20px)',
      scale: 0.9,
    })

    const tl = gsap.timeline({ paused: true })

    tl.to(element.firstChild, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 2,
      scale: 1,
      ease: 'power2.inOut',
    })

    ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      end: 'bottom bottom',
      animation: tl,
    })
  })
}

export const fadeIn = () => {
  const animatedElements = document.querySelectorAll('[animation="fade-in"]')

  animatedElements.forEach((element) => {
    const textBlocks = element.querySelectorAll('.product-block_info-line')
    let textBlocksChildren = []

    textBlocks.forEach((block) => {
      // Convert the HTMLCollection or NodeList of children to an array
      const childrenArray = Array.from(block.children)
      // Spread the childrenArray into textBlocksChildren
      textBlocksChildren.push(...childrenArray)
    })

    gsap.set(element, {
      opacity: 0,
      //yPercent: 20,
      scale: 0.9,
      filter: 'blur(20px)',
    })

    const tl = gsap.timeline({ paused: true })

    gsap.set(textBlocksChildren, {
      yPercent: -150,
    })

    tl.to(element, {
      opacity: 1,
      //yPercent: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.inOut',
    })

    tl.to(
      element,
      {
        scale: 1,
        duration: 1,
        ease: 'power2.inOut',
      },
      '<0.1'
    )

    tl.to(
      textBlocksChildren,
      {
        yPercent: 0,
        ease: 'power2.inOut',
        delay: 0.5,
        duration: 1,
        stagger: 0.05,
      },
      '<'
    )

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom bottom',
      animation: tl,
    })
  })
}
