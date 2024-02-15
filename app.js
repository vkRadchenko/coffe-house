const burgerMenu = document.querySelector('.header__burger_menu')
const header = document.querySelector('#nav__menu').cloneNode(1)
const modal = document.querySelector('.modal')

const headerIconMenu = document
  .querySelector('.header__cofee_menu')
  .cloneNode(1)

burgerMenu.addEventListener('click', burgerMenuHandler)
modal.addEventListener('click', (e) => {
  burgerMenu.classList.remove('active')
  modal.classList.remove('active')
})

function burgerMenuHandler(e) {
  burgerMenu.classList.toggle('active')
  modal.classList.toggle('active')
  renderMenu()
}

function renderMenu() {
  modal.appendChild(header)
  modal.appendChild(headerIconMenu)
}

/////////////////////////////
/* Slider */
/////////////////////////////

const sliderWrap = document.querySelector('.slider__wrapper')
const arrow_left = document.querySelector('.slider__arrow_left')
const arrow_right = document.querySelector('.slider__arrow_right')

const itemsCount = document.querySelectorAll('.slide__item').length

const controlAnimate = document.querySelectorAll('.control__animate')

const itemWidth = 100 / itemsCount
let slidePositionNumber = 0

const time = 7000
const timeSlideControl = 500
let progres = 0

arrow_right.addEventListener('click', () => {
  moveSlide('right')
})
arrow_left.addEventListener('click', () => {
  moveSlide('left')
})

function moveSlide(btn) {
  btn === 'right' ? (slidePositionNumber += 1) : (slidePositionNumber -= 1)

  if (slidePositionNumber >= itemsCount) {
    slidePositionNumber = 0
  }
  if (slidePositionNumber < 0) {
    slidePositionNumber = itemsCount - 1
  }

  clearProgress()
  clearInterval(scroolInterval)
  progres = 0
  count = 0

  let position = slidePositionNumber * itemWidth
  sliderWrap.style.transform = `translateX(-${position}%`
  startInterval()
}

function animateSliderControl(slide) {
  progres += timeSlideControl
  count = (progres / time) * 100

  if (progres > time) {
    moveSlide('right')
  }
  controlAnimate[slide].style.width = `${count}%`
}

function clearProgress() {
  controlAnimate.forEach((el) => {
    el.style.width = `0%`
  })
}

let pause = false

function startInterval() {
  scroolInterval = setInterval(() => {
    if (!pause) {
      animateSliderControl(slidePositionNumber)
    }
  }, timeSlideControl)
}

sliderWrap.addEventListener('mouseenter', () => {
  pause = true
})

sliderWrap.addEventListener('mouseleave', () => {
  pause = false
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    moveSlide('right')
  }
  if (e.key === 'ArrowLeft') {
    moveSlide('left')
  }
})

let start = 0
let end = 0
const touch = 100

sliderWrap.addEventListener('touchstart', (e) => {
  pause = true
  start = e.touches[0].clientX
})

sliderWrap.addEventListener('touchend', (e) => {
  pause = false
  end = e.changedTouches[0].clientX

  const diff = start - end
  if (Math.abs(diff) > touch) {
    diff > 0 ? moveSlide('right') : moveSlide('left')
  }
})

startInterval()
