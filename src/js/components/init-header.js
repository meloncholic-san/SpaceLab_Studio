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


    function updateHeaderHeight() {
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }

    function updateViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    function closeBurger() {
        header.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    function handleResizeLikeEvent() {
        updateHeaderHeight();
        updateViewportHeight();
    }


    burgerBtn.addEventListener('click', () => {
        const isOpen = header.classList.toggle('modal-open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        document.documentElement.style.overflow = isOpen ? 'hidden' : '';
        updateHeaderHeight();
        updateViewportHeight();
    });

    window.addEventListener('scroll', () => {
        header.classList.toggle('scroll', window.scrollY >= header.offsetHeight);
    });

    window.addEventListener('resize', () => {
        if (header.classList.contains('modal-open')) closeBurger();
        handleResizeLikeEvent();
    });

    window.addEventListener('orientationchange', handleResizeLikeEvent);

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResizeLikeEvent);
    }

    new ResizeObserver(updateHeaderHeight).observe(header);

    updateHeaderHeight();
    updateViewportHeight();
}
