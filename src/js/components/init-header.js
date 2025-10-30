export function initHeader() {
    const headerLink = document.querySelector('.header');
    const MobileMenulinks = document.querySelectorAll('.mobile-menu__item a');
    const currentPath = window.location.pathname.split('/').pop();
    const burgerBtnLink = document.querySelector('.header__burger-container');


    MobileMenulinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    burgerBtnLink.addEventListener('click', () => {
        headerLink.classList.toggle('modal-open');
        if (headerLink.classList.contains('modal-open')) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }

        setHeaderHeightVariable();
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY >= headerLink.offsetHeight) {
            headerLink.classList.add('scroll');
        } else {
            headerLink.classList.remove('scroll');
        }
    });


    window.addEventListener('resize', () => {
        if (headerLink.classList.contains('modal-open')) {
            headerLink.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        setHeaderHeightVariable();
    });

    setHeaderHeightVariable();

    const resizeObserver = new ResizeObserver(setHeaderHeightVariable);
    resizeObserver.observe(headerLink);











// const modal = document.getElementById("pop-up-modal");
//   const overlay = modal.querySelector(".pop-up-modal__overlay");
//   const closeBtn = modal.querySelector(".pop-up-modal__close");
//   const openBtns = document.querySelectorAll(".header__request-button");

//   openBtns.forEach(btn => {
//     btn.addEventListener("click", () => {
//       modal.classList.add("active");
//       document.body.style.overflow = "hidden";
//     });
//   });

//   const closeModal = () => {
//     modal.classList.remove("active");
//     document.body.style.overflow = "";
//   };

//   overlay.addEventListener("click", closeModal);
//   closeBtn.addEventListener("click", closeModal);

//   document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && modal.classList.contains("active")) {
//       closeModal();
//     }
//   });

//   const form = document.getElementById("modal-form");
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const requiredFields = form.querySelectorAll("[required]");
//     let valid = true;

//     requiredFields.forEach((field) => {
//       const errorEl = field.parentElement.querySelector(".form__error_required");
//       if (!field.value.trim()) {
//         errorEl.classList.add("visible");
//         valid = false;
//       } else {
//         errorEl.classList.remove("visible");
//       }
//     });

//     if (valid) {
//       alert("Form submitted successfully!");
//       closeModal();
//       form.reset();
//     }
//   });








}

function setHeaderHeightVariable() {
    const header = document.querySelector('.header');

    const height = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
}
