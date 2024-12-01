(function(){

let html = document.querySelector('html')

html.addEventListener('mouseover', function() {
  if ( window.matchMedia("(max-width: 900px)").matches ) return;
  html.classList.add('hasHover');
})

html.addEventListener('mouseout', function() {
  if ( window.matchMedia("(max-width: 900px)").matches ) return;
  html.classList.remove('hasHover')
})

})()