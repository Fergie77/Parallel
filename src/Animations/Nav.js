import gsap from 'gsap'

export const navAnimation = () => {
  console.log('navAnimation')
  const tl = gsap.timeline({ paused: true })
  const navButton = document.querySelector('.nav-menu_button')
  const closeButton = document.querySelector('.nav_close-button')
  const navMenu = document.querySelector('.nav_menu')
  const divider = document.querySelectorAll('.nav_menu_divider')
  const navLinks = document.querySelectorAll('.nav_menu_link')

  // Convert NodeList to Array and map to get text content
  const navLinksText = Array.from(navLinks).map((link) => link.children[0])

  console.log(navLinksText)

  navButton.addEventListener('click', () => {
    tl.play()
  })

  closeButton.addEventListener('click', () => {
    tl.reverse()
  })

  gsap.set(divider, {
    width: '0',
  })

  tl.to(navMenu, {
    x: '0',
    ease: 'power2.inOut',
  })

  tl.to(
    divider,
    {
      width: '100%',
      duration: 1,
      ease: 'power2.inOut',
    },
    '<0.2'
  )

  tl.from(
    navLinksText,
    {
      yPercent: 150,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.inOut',
    },
    '<'
  )
}
