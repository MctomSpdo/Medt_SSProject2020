/**************************************************************************************************
 * MEDT - SSProject 2020
 * Author: Thomas Spindler
 * Project: Medientechnik Sommersemesterprojekt 2020 (Mars)
 * HTL Leonding -> 2 BHTIM
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