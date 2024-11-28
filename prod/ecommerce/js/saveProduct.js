
/* ========== saveProduct.js ========== */
/*
  For saving / loading products in favorites, cart, ...
*/

function toggleSaveProduct(keyName, productId) {

  let product = undefined;

  for (let i = 0; i < Products.length; i++) {
    if ( Products[i].id == productId ) {
      product = Products[i];
      break;
    }
  }

  if ( product && keyName ) {
    let savedProducts = loadProducts(keyName);

    if ( savedProducts.includes(productId) ) {
      savedProducts = savedProducts.filter(x => x !== productId)
    } else {
      savedProducts.push(productId)
    }

    localStorage.setItem(`${keyName}-products`, JSON.stringify(savedProducts))
  }
}

function loadProducts(keyName, parsed=false) {
  let savedProducts = JSON.parse(localStorage.getItem(`${keyName}-products`) || "[]")
  if ( parsed )
    savedProducts = savedProducts.map(x => Products.filter(y => y.id == x)[0])
  return savedProducts
}