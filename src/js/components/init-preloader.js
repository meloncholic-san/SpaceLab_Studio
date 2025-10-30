import { disablePageScroll, enablePageScroll } from 'scroll-lock';


export function initPreloader() {
    const images = document.querySelectorAll('img:not([loading="lazy"])')
    const preloader = document.querySelector('.preloader')
    const preloaderPercent = document.querySelector('.preloader__percent')
    const preloaderText = document.querySelector('.preloader__hi-text')
        if (!preloader) return;
        
    const totalImages = images.length
    let loadedImages = 0
    let currentPercent = 0;



    disablePageScroll();


    function updatePreloaderPercent() {
        loadedImages++
        const targetPercent  = Math.round((loadedImages / totalImages) * 100)
        
        const interval = setInterval(() => {
            if (currentPercent < targetPercent) {
            currentPercent++;
            preloaderPercent.innerText = `${currentPercent}%`;
            } else {
            clearInterval(interval);
            }
        }, 10);

        if (loadedImages === totalImages) {
            preloaderPercent.innerText = '100%';

            setTimeout(() => {
                preloaderText.innerText = ''
                preloaderPercent.innerText = 'hilight';

                setTimeout(() =>{
                    preloader.classList.add('loaded')
                    document.body.classList.remove('loading')
                    enablePageScroll()
                    preloader.addEventListener('transitionend', () =>{
                        preloader.remove()
                    }, {once: true})
                        },500)
            }, 500)
        }
    }

    images.forEach(image => {
        if (image.complete) {
            updatePreloaderPercent()
    }   else {
            image.addEventListener('load', updatePreloaderPercent)
            image.addEventListener('error', updatePreloaderPercent)
        }
    })

    if (totalImages === 0) {
        document.body.classList.remove('loading')
        enablePageScroll()
        preloader.style.display = 'none'
    }



}
