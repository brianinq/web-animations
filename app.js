let controller;
let slideScene;
let pageScene;

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



        //create scene
        slideScene = new ScrollMagic.Scene({
                triggerElement: slide,
                triggerHook: 0.25,
                reverse: false //default is true and undoes animation on scrolling up

            })
            .setTween(gsapTimeline) // runs the gsap animations when we get to the trigger
            .addIndicators({
                colorStart: 'white',
                colorTrigger: 'white'
            })
            .addTo(controller);

        //new animation
        const pageTimeline = gsap.timeline();
        pageTimeline.fromTo(slide, {
            opacity: 1,
            scale: 1
        }, {
            opacity: 0,
            scale: 0
        })
        // new scene
        pageScene = new ScrollMagic.Scene({
                triggerElement: slide,
                duration: '100%',
                triggerHook: 0
            })
            .addIndicators({
                colorStart: 'white',
                colorTrigger: 'white',
                name: 'pageTrigger',
                indent: 200
            })
            .setPin(slide, {
                pushFollowers: false
            })
            .setTween(pageTimeline)
            .addTo(controller);
    });
}

let mouse = document.querySelector('.cursor')

function cursor(event) {
    mouse.style.top = event.pageY + 'px';
    mouse.style.left = event.pageX + 'px';
}

function activeCursor(event) {
    const item = event.target;
    if (item.id === 'logo' || item.classList.contains('burger')) {
        mouse.classList.add('nav-active')
    } else {
        mouse.classList.remove('nav-active')
    }
}

window.addEventListener('mousemove', cursor)
window.addEventListener('mousemove', activeCursor)
animateSlides();