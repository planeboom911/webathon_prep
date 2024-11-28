
/* ========== Search.js ========== */

/*
  CAUTION : CHANGES WITHOUT POTENTIAL CONSIDERATION CAN BREAK THINGS
  NOTE : Coupled with the search.html 
*/


// temporary function for not storing variables on global basis
(function() {
  
/* DOM elements to use */
const searchElement = document.querySelector('.search.list')
const searchNotFound = document.querySelector('.search.notfound')
const searchInput = document.querySelector('.input')
const searchButton = document.querySelector('.search.button')

const container = document.querySelector('.search.container')
const options = {
  valueNames: [
    "name",
    "companyName",
    {name: "image", attr: 'src'},
    "desc",
    "oldPrice",
    "newPrice",
    "rating",
    "stock"
  ],
  item: 'searchItem',
  searchColumns: [
    "name", "companyName"
  ]
}

const list = new List(container, options)

Products.forEach(x => list.add(x))

async function doSearch() {
  if ( searchInput.value == "" ) {
    searchElement.classList.add('hidden')
    searchNotFound.classList.remove('hidden')
    return
  }

  /* wait for event to get fired */
  setTimeout(() => {
    if ( searchElement.classList.contains('hidden') ) {
      searchElement.classList.remove('hidden')
      searchNotFound.classList.add('hidden')
    }
    setTimeout(() => {
      if ( searchElement.children.length < 1 ) {
        searchElement.classList.add('hidden')
        searchNotFound.classList.remove('hidden')
      }
    }, 200);
  }, 100);
}

searchInput.addEventListener('input', doSearch)

searchButton.addEventListener('click', doSearch);
})()