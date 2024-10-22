import gsap from 'gsap'

export const heroBlockHover = () => {
  const blocks = document.querySelectorAll('.hero_block')

  blocks.forEach((block) => {
    const hoverBackground = block.querySelector('.background-fill')
    const ribbon = block.querySelector('.product-block_ribbon')
    const viewProductButton = block.querySelector('.product-block_arrow-text')
    const gradientBG = block.querySelector('.hover-gradient-overlay')
    const parallelInfo = block.querySelector('.hero_block_parallel-info')

    gsap.set(hoverBackground, {
      scale: 0,
    })
    gsap.set(viewProductButton, {
      xPercent: -75,
    })

    gsap.set(gradientBG, {
      opacity: 0,
    })

    const tl = gsap.timeline({ paused: true })

    tl.to(ribbon, {
      width: 0,
      borderColor: 'transparent',
      opacity: 0,
      ease: 'power2.inOut',
      duration: 1,
    })

    tl.to(
      ribbon.children[0],
      {
        x: 200,
        ease: 'power2.inOut',
        duration: 1,
      },
      '<'
    )
    tl.to(
      parallelInfo,
      {
        yPercent: -150,
        ease: 'power2.inOut',
        duration: 1,
      },
      '<'
    )

    tl.to(
      viewProductButton,
      {
        xPercent: 2,
        opacity: 1,
        ease: 'power2.inOut',
        duration: 1,
      },
      '0.1'
    )

    tl.to(
      hoverBackground,
      {
        scale: 35,
        ease: 'power2.inOut',
        duration: 1,
      },
      '0.25'
    )

    tl.to(
      gradientBG,
      {
        opacity: 1,
        ease: 'power2.inOut',
        duration: 1,
      },
      '0.5'
    )

    block.addEventListener('mouseenter', () => {
      tl.play()
    })
    block.addEventListener('mouseleave', () => {
      tl.reverse()
    })
    block.addEventListener('mousemove', (e) => {
      const parent = gradientBG.parentElement

      // Get the mouse position
      const mouseX = e.clientX
      const mouseY = e.clientY

      // Get the parent's position
      const parentRect = parent.getBoundingClientRect()
      const parentX = parentRect.left
      const parentY = parentRect.top

      // Calculate the position relative to the parent
      const relativeX = mouseX - parentX
      const relativeY = mouseY - parentY

      // Adjust for the element's size (if you want it centered around the cursor)
      const offsetX = gradientBG.offsetWidth / 2
      const offsetY = gradientBG.offsetHeight / 2

      // Set the new position of the element
      gradientBG.style.left = relativeX - offsetX + 'px'
      gradientBG.style.top = relativeY - offsetY + 'px'
    })
  })
}
