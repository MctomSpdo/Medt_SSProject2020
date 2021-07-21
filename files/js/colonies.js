/**************************************************************************************************
 * MARS 2020
 * Author: Mctom Spdo
 * Project: MARS 2020
 * 
 * Page: Colonizing Mars
 * Descripton: This is the JS for the colonies Page
 * Libs: SwiperJS
 **************************************************************************************************/

//Side 1:
const slide1 = new Swiper('.swiper-container', {
    speed: 300,
    calculateHeight: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});