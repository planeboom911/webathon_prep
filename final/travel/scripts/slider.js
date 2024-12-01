
(function () {

let slideSections = document.querySelectorAll('.hasSlider')

slideSections.forEach(function (slideSection) {
  
  let slider = slideSection.querySelector('.slider')
  let controls = slideSection.querySelector('.slideControls')
  let controlLeft = controls.querySelector('.left')
  let controlRight = controls.querySelector('.right')

  let sampleChild = slideSection.querySelector('.slider > div')
  
  let scrollSpeed = sampleChild ? sampleChild.getBoundingClientRect().width: 0
  scrollSpeed = scrollSpeed ? (scrollSpeed + 0.08 * scrollSpeed) : 250;

  if ( !controlLeft || !controlRight ) return;

  controlLeft.addEventListener('click', e => {
    /* cannot scroll */
    if ( slider.scrollWidth == slider.clientWidth ) return;
    if ( !slider.scrollLeft ) return;

    let scrollLeft = slider.scrollLeft - scrollSpeed;
    scrollLeft = scrollLeft < 0 ? 0: scrollLeft;

    slider.scrollTo({left: scrollLeft, behavior: 'smooth'});
  })

  controlRight.addEventListener('click', e => {
    /* cannot scroll */
    if ( slider.scrollWidth == slider.clientWidth ) return;
    if ( slider.scrollLeft + slider.clientWidth >= slider.scrollWidth ) return;

    let scrollLeft = slider.scrollLeft + scrollSpeed;
    scrollLeft = (scrollLeft + slider.clientWidth >= slider.scrollWidth) ? (
      slider.scrollWidth - slider.clientWidth
    ): scrollLeft;

    slider.scrollTo({left: scrollLeft, behavior: 'smooth'});
  })

})

})()