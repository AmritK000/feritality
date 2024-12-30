// src/aosInit.js
import AOS from 'aos';
import 'aos/dist/aos.css';

const initAOS = () => {
    AOS.init({
        offset: 200,
        delay: 0,
        duration: 1000,
        easing: 'ease',
        once: true, // Change to false if you want animations to happen every time you scroll
        mirror: true, // Whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom',
    });
};

export default initAOS;
