// slider

var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    loop: true,

    navigation: {
        nextEl: ".slider__button-next",
        prevEl: ".slider__button-prev",
    },

    keyboard: {
        enabled: true,
    },

    breakpoints: {
        0: {
            spaceBetween: 20,
        },
        1180: {
            spaceBetween: 40,
        }
    },

    on: {
        init: function () {
            updateCounter(this);
        },
        slideChange: function () {
            updateCounter(this);
        },
    },
});

function updateCounter(swiper) {
    let currentSlide = swiper.realIndex + 1;
    let totalSlides = swiper.slides.length;
    document.querySelector('.slider__counter span').textContent = `(${currentSlide.toString().padStart(2, '0')} / ${totalSlides.toString().padStart(2, '0')})`;
}



// header
const headerPage = document.querySelector('header');

window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition >= 200 && !headerPage.classList.contains('header--scroll')) {
        headerPage.classList.add('header--scroll');
    }

    else if (scrollPosition < 200 && headerPage.classList.contains('header--scroll')) {
        headerPage.classList.remove('header--scroll');
    }
}, { passive: true });


// modal

let mainForm = document.querySelector('#modal-form');


const modalTriggersCta = document.querySelectorAll('[data-modal="cta-modal"]'),
    modalCta = document.querySelector('.modal-cta'),
    modalMenu = document.querySelector('.modal-menu'),
    modalBtnClose = document.querySelectorAll('.modal-close'),
    modalInner = document.querySelector('.modal-inner'),
    headerMenuToogle = document.querySelector('.header__menu-toggle');

modalTriggersCta.forEach(trigger => {
    openModalWindow(trigger, modalCta)
});

openModalWindow(headerMenuToogle, modalMenu)

function openModalWindow(itemBtn, modalWindow) {
    itemBtn.addEventListener('click', () => {
        modalWindow.classList.add('modal-window--active');
    });
}

modalBtnClose.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.modal-window').forEach(modalWindow => modalWindow.classList.remove('modal-window--active'));

        let formTitleSuccess = document.querySelector('.form__title--success');
        if (formTitleSuccess) {
            mainForm.classList.remove('modal__form--hidden');
            mainForm.reset();
            modalInner.removeChild(formTitleSuccess);
        }

    });
})

modalMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu__link')) {
        modalMenu.classList.remove('modal-window--active');
    }
});



// form valid


mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let nameField = mainForm.querySelector('input[name="name"]');
    let phoneField = mainForm.querySelector('input[name="phone"]');

    let nameValue = nameField.value.trim();
    let phoneValue = phoneField.value.trim();

    let isValid = true;

    clearErrors();

    let namePattern = /^[a-zA-Z]{2,15}$/;
    if (nameValue === '') {
        showError(nameField, 'Name cannot be empty');
        isValid = false;
    } else if (!namePattern.test(nameValue)) {
        showError(nameField, 'Name must contain 2 to 15 Latin letters');
        isValid = false;
    }

    let phonePattern = /^[+]?[0-9]{6,}$/;
    if (phoneValue === '') {
        showError(phoneField, 'Phone cannot be empty');
        isValid = false;
    } else if (!phonePattern.test(phoneValue)) {
        showError(phoneField, 'Phone must contain at least 6 digits and may start with a plus sign');
        isValid = false;
    }

    if (isValid) {
        console.log('form send...');
        mainForm.classList.add('modal__form--hidden');

        let successAnswer = document.createElement('h2');
        successAnswer.classList.add('form__title', 'form__title--success');
        successAnswer.textContent = 'Form submitted successfully!';

        modalInner.appendChild(successAnswer);

        // mainForm.submit();
    }
});

function showError(input, message) {
    let error = document.createElement('span');
    error.classList.add('error-message');
    error.innerText = message;
    input.parentElement.appendChild(error);

    input.addEventListener('input', function () {
        let value = input.value.trim();
        if (value) {
            if (input === mainForm.querySelector('input[name="name"]') && /^[a-zA-Z]{2,15}$/.test(value)) {
                error.remove();
            }
            if (input === mainForm.querySelector('input[name="phone"]') && /^[+]?[0-9]{6,}$/.test(value)) {
                error.remove();
            }
        }
    });
}

function clearErrors() {
    let errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 600,
  })
})
