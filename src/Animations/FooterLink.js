import gsap from 'gsap'

export const FooterLink = () => {
  // Check if the device supports hover
  const supportsHover = window.matchMedia('(hover: hover)').matches

  if (!supportsHover) return // Exit if it's a touch device

  const footerLinks = document.querySelectorAll('.button')

  footerLinks.forEach((link) => {
    // Create arrow element
    const arrow = document.createElement('span')
    arrow.innerHTML = '→'
    //arrow.style.position = 'absolute'
    //arrow.style.left = '-20px'

    gsap.set(arrow, { x: '-2rem', opacity: 0, width: '0' })
    link.style.position = 'relative'

    //link.append(arrow)
    link.prepend(arrow)

    // Set up hover animations
    link.addEventListener('mouseenter', () => {
      gsap.to(arrow, {
        opacity: 1,
        width: '2rem',
        x: '-0.2rem',
        duration: 0.7,
      })

      //gsap.to(link, { x: 10, duration: 0.7 })
    })

    link.addEventListener('mouseleave', () => {
      gsap.to(arrow, {
        opacity: 0,
        width: '0',
        x: '-2rem',
        duration: 0.7,
      })
      gsap.to(link, { x: 0, duration: 0.7 })
    })
  })
}
