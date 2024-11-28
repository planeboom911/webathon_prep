
/* ========== Search.js ========== */
/*
  NOTE : Coupled with the search.html 
  DO NOT CHANGE ONLY ONE FILE
*/


// temporary function to not store variables on global basis
(function() {
  
/* get the search element */
const searchElement = document.querySelector('.search.container')
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
    "ratings",
    "stock"
  ],
  item: 'searchItem',
  searchColumns: [
    "name", "companyName"
  ]
}

const list = new List(container, options)

Products.forEach(x => list.add(x))

async function doSearch(x) {
  if ( x ) {
    searchElement.classList.add('hidden')
    return
  }
  searchElement.classList.remove('hidden')
}

searchInput.addEventListener('keydown', k => {
  setTimeout(() => {
    doSearch(searchInput.value == "")
  }, 100)
})

searchButton.addEventListener('click', doSearch);

})()