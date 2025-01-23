export const ProductItem = () => {
  const product = document.querySelectorAll('.product-item_component')

  product.forEach((item) => {
    const productImage = item.querySelector('.product-item_image')
    const productTitle = item.querySelectorAll('.product-item_name_heading')

    item.addEventListener('mouseenter', () => {
      productImage.classList.add('is-hover')
      productTitle.forEach((title) => {
        title.classList.add('is-hover')
      })
    })

    item.addEventListener('mouseleave', () => {
      productImage.classList.remove('is-hover')
      productTitle.forEach((title) => {
        title.classList.remove('is-hover')
      })
    })
  })
}
