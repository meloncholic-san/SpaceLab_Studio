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

    let scrollPosition = 0;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    function openBurger() {
        scrollPosition = window.scrollY;
        header.classList.add('modal-open');
        updateHeaderHeight();
        updateViewportHeight();

        if (isIOS) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
        }
    }

    function closeBurger() {
        header.classList.remove('modal-open');
        updateHeaderHeight();
        updateViewportHeight();

        if (isIOS) {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollPosition);
        }
    }
    
    // function openBurger() {
    //     scrollPosition = window.scrollY;
    //     header.classList.add('modal-open');

    //     updateHeaderHeight();
    //     updateViewportHeight();
    //     document.body.style.position = 'fixed';
    //     document.body.style.top = `-${scrollPosition}px`;
    //     document.body.style.width = '100%';
    // }

    // function closeBurger() {
    //     header.classList.remove('modal-open');

    //     updateHeaderHeight();
    //     updateViewportHeight();

    //     document.body.style.position = '';
    //     document.body.style.top = '';
    //     document.body.style.width = '';
    //     window.scrollTo(0, scrollPosition);
    // }


    // function openBurger() {
    //     scrollPosition = window.scrollY;
    //     header.classList.add('modal-open');
    //     updateHeaderHeight();
    //     updateViewportHeight();

    //     document.documentElement.style.overflow = 'hidden';
    //     document.body.style.overflow = 'hidden';
    // }

    // function closeBurger() {
    //     header.classList.remove('modal-open');
    //     updateHeaderHeight();
    //     updateViewportHeight();
        
    //     document.documentElement.style.overflow = '';
    //     document.body.style.overflow = '';
    //     window.scrollTo(0, scrollPosition);
    // }

    burgerBtn.addEventListener('click', () => {
        if (header.classList.contains('modal-open')) {
            closeBurger();
        } else {
            openBurger();
        }
        updateHeaderHeight();
        updateViewportHeight();
    });

    window.addEventListener('scroll', () => {
        header.classList.toggle('scroll', window.scrollY >= header.offsetHeight);
    });

    let lastWindowWidth = window.innerWidth;

    window.addEventListener('resize', () => {
        updateHeaderHeight();
        updateViewportHeight();

        if (header.classList.contains('modal-open') && Math.abs(window.innerWidth - lastWindowWidth) > 50) {
            closeBurger();
        }

        lastWindowWidth = window.innerWidth;
    });

    window.addEventListener('orientationchange', () => {
        updateHeaderHeight();
        updateViewportHeight();
    });

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', () => {
            updateHeaderHeight();
            updateViewportHeight();
        });
    }

    new ResizeObserver(updateHeaderHeight).observe(header);


    updateHeaderHeight();
    updateViewportHeight();
}
