export const SubifySubscriptions = () => {
  const container = document.querySelector('.subify-widget-container')
  const productHandle = document
    .querySelector('[data-attribute]')
    .getAttribute('data-attribute')
  console.log(productHandle)
  if (container) {
    return
  } else {
    setTimeout(() => {
      console.log('render widget')
      window.subifySdk.renderWidget(productHandle, {
        renderPosition: { wrapper: '.widget-wrapper' },
      })
    }, 2000)
  }
}
