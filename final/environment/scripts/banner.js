
(function(){

let svgList = document.querySelectorAll('.svg')

svgList.forEach(elem => {
  fetch(elem.dataset.src).then(x => x.text()).then(
    x => elem.innerHTML = x
  ).catch(x => elem.innerHTML = "Error " + x);
})

})()