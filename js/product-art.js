/**
 * ==========================================================================
 * SKYLINE RELIGION — HIGH-FASHION PRODUCT ARTWORK & PHOTOGRAPHY ENGINE
 * Renders high-resolution real garment photography from authentic brand assets
 * ==========================================================================
 */

/**
 * Return real garment photography for product ID and perspective angle
 */
function getProductArtwork(id, angle = 'front') {
  const cleanAngle = angle || 'front';
  const product = (typeof SKYLINE_PRODUCTS !== 'undefined')
    ? SKYLINE_PRODUCTS.find(p => p.id === id)
    : null;

  let imagePath = `assets/products/${id}-front.jpg`;
  let altText = "Skyline Religion Garment";

  if (product) {
    altText = `${product.title} ${cleanAngle} elevation`;
    if (product.images) {
      if (product.images[cleanAngle]) {
        imagePath = product.images[cleanAngle];
      } else if (product.images.front) {
        imagePath = product.images.front;
      }
    }
  }

  return `<img src="${imagePath}"
               alt="${altText}"
               class="product-img-${cleanAngle}"
               loading="lazy"
               style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);"
               onerror="this.onerror=null; this.src='assets/products/${id}-front.jpg';">`;
}

window.getProductArtwork = getProductArtwork;
