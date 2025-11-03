export function initHeader() {
    const header = document.querySelector('.header');
    const burgerBtn = document.querySelector('.header__burger-container');
    const mobileLinks = document.querySelectorAll('.mobile-menu__item a');
    const currentPath = window.location.pathname.split('/').pop();

    mobileLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    burgerBtn.addEventListener('click', () => {
        header.classList.toggle('modal-open');
        updateViewportHeight();

        const isOpen = header.classList.contains('modal-open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        document.documentElement.style.overflow = isOpen ? 'hidden' : '';

        updateHeaderHeight();
    });


    window.addEventListener('scroll', () => {
        header.classList.toggle('scroll', window.scrollY >= header.offsetHeight);
    });


    window.addEventListener('resize', () => {
        if (header.classList.contains('modal-open')) {
            header.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        updateHeaderHeight();
        updateViewportHeight();
    });

    window.addEventListener('orientationchange', updateViewportHeight);

    updateHeaderHeight();
    updateViewportHeight();


    new ResizeObserver(updateHeaderHeight).observe(header);

    function updateHeaderHeight() {
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }

    function updateViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}
