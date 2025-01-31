import KeenSlider from 'keen-slider'

function WheelControls(slider) {
  var touchTimeout
  var position
  var wheelActive

  function dispatch(e, name) {
    position.x -= e.deltaX
    position.y -= e.deltaY
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    )
  }

  function wheelStart(e) {
    position = {
      x: e.pageX,
      y: e.pageY,
    }
    dispatch(e, 'ksDragStart')
  }

  function wheel(e) {
    dispatch(e, 'ksDrag')
  }

  function wheelEnd(e) {
    dispatch(e, 'ksDragEnd')
  }

  function eventWheel(e) {
    // Only lock horizontal scrolling (x-axis)
    if (Math.abs(e.deltaX) > 0) {
      e.preventDefault()

      if (!wheelActive) {
        wheelStart(e)
        wheelActive = true
      }
      wheel(e)

      clearTimeout(touchTimeout)
      touchTimeout = setTimeout(() => {
        wheelActive = false
        wheelEnd(e)
      }, 50)
    }
    // Let vertical scrolling (y-axis) happen naturally
  }

  slider.on('created', () => {
    slider.container.addEventListener('wheel', eventWheel, {
      passive: false,
    })
  })
}

export const ProductSlider = (container) => {
  let keenSliders = []

  const initializeSliders = () => {
    const sliders = container.querySelectorAll('.products_collection-list')
    sliders.forEach((slider) => {
      const keenSliderInstance = new KeenSlider(
        slider,
        {
          slides: {
            perView: window.innerWidth < 768 ? 1.2 : 4.3,
            spacing: window.innerWidth < 768 ? undefined : 0,
            origin: window.innerWidth < 768 ? 'center' : undefined,
          },
          loop: true,
          selector: '.products_collection-item',
        },
        window.innerWidth >= 768 ? [WheelControls] : []
      )

      // Attach navigation to corresponding arrows
      const leftArrow = slider
        .closest('.container-large')
        .querySelector('[slider="left-arrow"]')
      const rightArrow = slider
        .closest('.container-large')
        .querySelector('[slider="right-arrow"]')

      if (leftArrow) {
        leftArrow.addEventListener('click', () => keenSliderInstance.prev())
      }

      if (rightArrow) {
        rightArrow.addEventListener('click', () => keenSliderInstance.next())
      }

      keenSliders.push(keenSliderInstance)
    })
  }

  // Initial check
  initializeSliders()

  // Add event listener for window resize
  window.addEventListener('resize', initializeSliders)
}
