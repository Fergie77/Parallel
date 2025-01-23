import KeenSlider from 'keen-slider'

export const ProductImagesSlider = (container) => {
  let keenSliders = []

  const initializeSliders = () => {
    if (window.innerWidth < 768 && keenSliders.length === 0) {
      const sliders = container.querySelectorAll('.product-images_list')
      sliders.forEach((slider) => {
        keenSliders.push(
          new KeenSlider(slider, {
            slides: {
              perView: 1.2,
              spacing: 15,
              origin: 'center',
            },
            loop: true,
            selector: '.product-image_wrapper',
          })
        )
      })
    } else if (window.innerWidth >= 768 && keenSliders.length > 0) {
      keenSliders.forEach((sliderInstance) => sliderInstance.destroy())
      keenSliders = []
    }
  }

  // Initial check
  initializeSliders()

  // Add event listener for window resize
  window.addEventListener('resize', initializeSliders)
}
