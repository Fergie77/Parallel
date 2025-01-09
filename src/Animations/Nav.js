import gsap from 'gsap'

export const tl = gsap.timeline({ paused: true })

export const navAnimation = () => {
  const navButton = document.querySelector('.nav-menu_button')
  const closeButton = document.querySelector('.nav_close-button')
  const navMenu = document.querySelector('.nav_menu')
  const divider = document.querySelectorAll('.nav_menu_divider')
  const navLinks = document.querySelectorAll('.nav_menu_link')

  // Convert NodeList to Array and map to get text content
  const navLinksText = Array.from(navLinks).map((link) => link.children[0])

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

  navDropdownAnimation()
}

const navDropdownAnimation = () => {
  const dropdowns = document.querySelectorAll('.nav_dropdown')

  dropdowns.forEach((dropdown) => {
    const dropdownToggle = dropdown.querySelector('.nav_dropdown-toggle')
    const dropdownList = dropdown.querySelector('.nav_dropdown-list')

    if (!dropdownToggle || !dropdownList) return

    // Ensure the dropdown list is hidden initially
    gsap.set(dropdownList, { height: 0, overflow: 'hidden' })

    // Function to open the dropdown
    const openDropdown = () => {
      gsap.to(dropdownList, {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }

    // Function to close the dropdown
    const closeDropdown = () => {
      gsap.to(dropdownList, { height: 0, duration: 0.5, ease: 'power2.inOut' })
    }

    // Open dropdown on mouse enter
    dropdownToggle.addEventListener('mouseenter', openDropdown)

    // Close dropdown when mouse leaves both toggle and dropdown list
    dropdownToggle.addEventListener('mouseleave', () => {
      // Use a timeout to check if the mouse enters the dropdown list
      setTimeout(() => {
        if (!dropdownList.matches(':hover')) {
          closeDropdown()
        }
      }, 100)
    })

    // Ensure dropdown stays open when hovering over the dropdown list
    dropdownList.addEventListener('mouseenter', openDropdown)

    // Close dropdown when mouse leaves the dropdown list
    dropdownList.addEventListener('mouseleave', closeDropdown)
  })
}

// closeAllDropdowns function
export const closeAllDropdowns = () => {
  const dropdownLists = document.querySelectorAll('.nav_dropdown-list')

  dropdownLists.forEach((dropdownList) => {
    gsap.to(dropdownList, {
      height: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    })
  })
}
