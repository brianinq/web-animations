let controller;
let slideScene;

function animateSlides() {
    controller = new ScrollMagic.Controller();

    //selectors
    const sliders = document.querySelectorAll('.slide')
    const nav = document.querySelector('.nav-header')


    sliders.forEach((slide) => {
        const revealImg = slide.querySelector('.reveal-img')
        const img = slide.querySelector('img')
        const revealText = slide.querySelector('.reveal-text')

        // gsap animation
        // gsap.to(revealImg, 1, {x: '100%'});

        const gsapTimeline = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "power2.inOut"
            }
        })

        gsapTimeline.to(revealImg, {
            x: '100%'
        });
        gsapTimeline.fromTo(img, {
            scale: 2
        }, {
            scale: 1
        }, '-=1');

        gsapTimeline.to(revealText, {
            x: '100%'
        }, '-=0.8');

        gsapTimeline.fromTo(nav, {
            y: '-100%'
        }, {
            y: 0
        }, '-=0.9')

    });
}

animateSlides();