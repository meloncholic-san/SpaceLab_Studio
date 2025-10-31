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

}

function setHeaderHeightVariable() {
    const header = document.querySelector('.header');

    const height = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
}
