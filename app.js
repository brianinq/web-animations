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
            // .addIndicators({
            //     colorStart: 'white',
            //     colorTrigger: 'white'
            // })
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
            // .addIndicators({
            //     colorStart: 'white',
            //     colorTrigger: 'white',
            //     name: 'pageTrigger',
            //     indent: 200
            // })
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

const burger = document.querySelector('.burger')

function navToggle(event) {
    if (!event.target.classList.contains('active')) {
        event.target.classList.add('active')
        gsap.to('.line1', {
            rotate: '45',
            y: 5,
            background: 'black'
        })
        gsap.to('.line2', {
            rotate: '-45',
            y: -5,
            background: 'black'
        })
        gsap.to('#logo', {
            color: 'black'
        })
        gsap.to('.nav-bar', 1, {
            clipPath: "circle(2500px at 100% 10%)"
        })
        document.body.classList.add('hide')
    } else {
        event.target.classList.remove('active')
        gsap.to('.line1', {
            rotate: '0',
            y: 0,
            background: 'white'
        })
        gsap.to('.line2', {
            rotate: '0',
            y: 0,
            background: 'white'
        })
        gsap.to('#logo', {
            color: 'white'
        })
        gsap.to('.nav-bar', 1, {
            clipPath: "circle(50px at 100% -10%)"
        })
        document.body.classList.remove('hide')
    }
}


// //barba js
// barba.init({
//     views: [{
//             namespace: 'home',
//             beforeEnter() {
//                 animateSlides()
//             },
//             beforeLeave() {
//                 pageScene.destroy()
//                 slideScene.destroy()
//                 controller.destroy()
//             }
//         },
//         {
//             namespace: 'fashion'
//         }
//     ],
//     transitions: [{
//         leave({
//             current,
//             next
//         }) {
//             let done = this.async()
//             //animation
//             const timeline = gsap.timeline({
//                 defaults: {
//                     ease: power2.inOut
//                 }
//             })
//             timeline.fromTo(current.container, 1, {
//                 opacity: 1
//             }, {
//                 opacity: 0,
//                 onComplete: done
//             })
//         }
//     }, {
//         enter({
//             current,
//             next
//         }) {
//             let done = this.async()
//             //animate next page in
//             const timeline = gsap.timeline({
//                 defaults: {
//                     ease: power2.inOut
//                 }
//             })
//             timeline.fromTo(next.container, 1, {
//                 opacity: 0
//             }, {
//                 opacity: 1,
//                 onComplete: done
//             })
//         }
//     }]
// })

burger.addEventListener('click', navToggle)
window.addEventListener('mousemove', cursor)
window.addEventListener('mousemove', activeCursor)
animateSlides();