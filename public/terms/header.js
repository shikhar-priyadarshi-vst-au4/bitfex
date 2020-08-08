
// var main = document.getElementById("main");
// var menu = document.getElementById("menu");
// var overlay = document.getElementById("overlay");
// var hamburgerButton = document.getElementsByClassName("menu-btn");

// menu.style.display = "none";

// const Overlay = (status) => {
//     if (status) {
//         overlay.style.display = "none";
//     }
//     else {
//         overlay.style.display = "block";
//     }
// }


// const closeBar = () => {

//     // menu.style.width = "0px";
//     Overlay(false);
// }

// const openBar = () => {
//     menu.style.display = "flex";
//     Overlay(true);
// }

// main.addEventListener('click', closeBar);
// hamburgerButton[0].addEventListener('click', openBar);

// let menuButton = document.querySelector(".menu-btn");
// let menu = document.querySelector(".header-right");

// menuButton.addEventListener("click", (e) => {
//   e.stopPropagation();
//   menu.style.right = "0";
// });

// document.body.addEventListener("click", (e) => {
//   menu.style.right = "-300px";
// });

function home() {
    window.location.href = "/";
}

$(document).ready(function () {
    var main = $("#main");
    var hamburger = $(".menu-btn");
    var menu = $("#menu");
    // var overlay = $("#overlay");

    var closeBar = function () {
        menu.removeClass("d-flex");
        menu.addClass("d-none");
    }

    var openBar = function (e) {
        e.stopPropagation();
        menu.removeClass("d-none")
        menu.addClass("d-flex");
    }
    closeBar();
    hamburger.on("click", openBar)
    main.on("click", closeBar);

})