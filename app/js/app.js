document.addEventListener('DOMContentLoaded', () => {

    function basicSlider() {
        const slider = document.querySelector('.slider'),
            sliders = slider.querySelectorAll('.slide'),
            dot = document.querySelectorAll('.dot');

        let currentPosition = 0;
        let it = 0;
        let curr = document.documentElement.scrollHeight / sliders.length
        let count = true

        window.addEventListener('wheel', function() {
            if (window.event.deltaY > 0 && count && currentPosition !== document.documentElement.scrollHeight - curr) {
                currentPosition += curr;
                it++;
                count = false
                setTimeout(() => {
                    count = true
                }, 500)
                window.scrollBy({
                    top: curr,
                    behavior: 'smooth'
                });
            } else if (window.event.deltaY < 0 && count && currentPosition !== 0) {
                currentPosition -= curr;
                it--;
                count = false
                setTimeout(() => {
                    count = true
                }, 500)
                window.scrollBy({
                    top: -curr,
                    behavior: 'smooth'
                });
            }

            dot.forEach((item, i) => {
                item.classList.remove('dot_active');

                if (i === it) {
                    item.classList.add('dot_active');
                }
            });

            console.log(window.event.deltaY, document.documentElement.scrollTop, curr, currentPosition, ticking);
        })
    }

    function footerSlider() {
        const bloc = document.querySelector('.slider__footer_inner');
        const slider = document.querySelector('.slider__footer_slides');
        const slides = document.querySelectorAll('.slider__footer_slide');

        const btnLeft = document.querySelector('.slider__footer_switch-left');
        const btnRight = document.querySelector('.slider__footer_switch-right');

        const allSlides = slides.length;
        let currentSlide = 0;
        let windowSlide = 5;
        let maxWithSlide = 0;
        let currentWidth = 0;

        slides.forEach((item, i) => {
            if (i < windowSlide) {
                maxWithSlide += slides[i].offsetWidth;
            }
            console.log(slides[i].offsetWidth);
        })

        bloc.style.width = maxWithSlide ? maxWithSlide + 40 * windowSlide + 'px' : '1350px';

        btnRight.addEventListener('click', () => {
            if (currentSlide !== allSlides - windowSlide) {
                currentWidth += (-slides[currentSlide].offsetWidth - 40);
                slider.style.transform = `translateX(${currentWidth}px)`;
                currentSlide++;
                exam();
            }
        });

        btnLeft.addEventListener('click', () => {
            if (currentSlide !== 0) {
                currentWidth += slides[currentSlide - 1].offsetWidth + 40;
                slider.style.transform = `translateX(${currentWidth}px)`;
                currentSlide--;
                exam();
            }
        });

        function exam() {
            if (currentSlide === allSlides - windowSlide) {
                btnLeft.style.display = 'block';
                btnRight.style.display = 'none';
            } else if (currentSlide === 0) {
                btnLeft.style.display = 'none';
                btnRight.style.display = 'block';
            } else {
                btnRight.style.display = 'block';
                btnLeft.style.display = 'block';
            }
        }

        exam();
    }

    basicSlider();
    footerSlider();
});