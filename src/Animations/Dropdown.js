import { gsap } from 'gsap'

export const Dropdown = (container) => {
  const dropdowns = container.querySelectorAll('.product-info_dropdown-toggle')

  dropdowns.forEach((dropdown) => {
    const tl = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: 'power2.inOut',
      },
      paused: true, // Initialize timeline as paused
    })

    const dropdownList = dropdown.nextElementSibling.querySelector(
      '.product-info_rich-text'
    )
    let isOpen = false

    // Store initial height as 0
    gsap.set(dropdownList, { height: 0 })

    // Create the animation once
    tl.to(dropdownList, {
      height: 'auto',
    })

    dropdown.addEventListener('click', () => {
      if (!isOpen) {
        tl.play()
      } else {
        tl.reverse()
      }
      isOpen = !isOpen
    })
  })
}
