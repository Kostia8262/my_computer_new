var scene = document.getElementById('promoScene');
var parallaxInstance = new Parallax(scene);


const navMenu = document.querySelector('.nav_menu')
const burger = document.querySelector('.nav_burger')
burger.addEventListener('click', function () {
  navMenu.classList.toggle('active')
})
navMenu.addEventListener('click', function () {
  navMenu.classList.remove('active')
})

let faqCards = document.querySelectorAll('.faq__card')
faqCards.forEach(card => {
    card.addEventListener('click', function (e) {
        console.log(e)
        toggler = card.querySelector('.faq__card_head')
        let path = e.path || e.composedPath()
        if (path.includes(toggler)) {
            card.classList.toggle('active')
        }
    })
})

let forms = document.querySelectorAll('.form__wrap')
forms.forEach(form => {
    let formTrigger = form.querySelector('.form__trigger')
    formTrigger.addEventListener('click', function (e) {
        e.preventDefault()
        let formData = new FormData(form);
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        fetch('/', {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(response => alert(response.message))
    })
})

let formShows = document.querySelectorAll('.call')
let formClose = document.querySelector('.form__wrapper .form__close')
let formWrapper = document.querySelector('.form__wrapper')
formShows.forEach(btn => {
    btn.addEventListener('click', function (e) {
        formWrapper.classList.add('active')
        console.log(formWrapper)
    })
})

formClose.addEventListener('click', function (e) {
    formWrapper.classList.remove('active')
    console.log(formWrapper)
})
formWrapper.addEventListener('click', function (e) {
    if (e.target == formWrapper) {
        formWrapper.classList.remove('active')
        console.log(formWrapper)
    }

})

let swiperInstance = null;

function initMobileSwiper() {
  const container = document.querySelector('.description__slider');

  if (window.innerWidth < 425 && !swiperInstance) {
    swiperInstance = new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  } else if (window.innerWidth >= 425 && swiperInstance) {
    swiperInstance.destroy(true, true); // Полностью уничтожить
    swiperInstance = null;
  }
}

window.addEventListener('load', initMobileSwiper);
window.addEventListener('resize', () => {
  clearTimeout(window._resizeTimeout);
  window._resizeTimeout = setTimeout(initMobileSwiper, 200);
});