import {showDialog} from "./customdialog.js"

const light = "light";
const dark = "dark";

// SVG Icons source: https://fonts.google.com/icons
const lightModeSvg = "<svg xmlns='http://www.w3.org/2000/svg' height='2em' viewBox='0 96 960 960' width='2em' title='light mode icon'>"+
            "<path d='M479.765 716Q538 716 579 675.235q41-40.764 41-99Q620 518 579.235 477q-40.764-41-99-41Q422" +
            " 436 381 476.765q-41 40.764-41 99Q340 634 380.765 675q40.764 41 99 41Zm.235 60q-83 0-141.5-58.5T280" +
            " 576q0-83 58.5-141.5T480 376q83 0 141.5 58.5T680 576q0 83-58.5 141.5T480 776ZM70 606q-12.75" +
            " 0-21.375-8.675Q40 588.649 40 575.825 40 563 48.625 554.5T70 546h100q12.75 0 21.375 8.675 8.625"+
            " 8.676 8.625 21.5 0 12.825-8.625 21.325T170 606H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5" +
            " 0-12.825 8.625-21.325T790 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890" +
            " 606H790ZM479.825 296Q467 296 458.5 287.375T450 266V166q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625" +
            " 12.825 0 21.325 8.625T510 166v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720q-12.825" +
            " 0-21.325-8.62-8.5-8.63-8.5-21.38V886q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325" +
            " 8.625T510 886v100q0 12.75-8.675 21.38-8.676 8.62-21.5 8.62ZM240 378l-57-56q-9-9-8.629-21.603.37-12.604" +
            " 8.526-21.5 8.896-8.897 21.5-8.897Q217 270 226 279l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494" +
            " 495-56-57q-8-9-8-21.375T678.5 774q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896"+
            " 8.897-21.5 8.897Q743 882 734 873Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526" +
            " 8.897 8.896 8.897 21.5Q786 313 777 322l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897" +
            " 873.103q-8.897-8.896-8.897-21.5Q174 839 183 830l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291 783 291" +
            " 795t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526ZM480 576Z'/></svg>"
const darkModeSvg = "<svg xmlns='http://www.w3.org/2000/svg' height='2em' viewBox='0 96 960 960' width='2em' title='dark mode icon'>"+
            "<path d='M480 936q-150 0-255-105T120 576q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20" +
            " 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480 936Zm0-60q109" +
            " 0 190-67.5T771 650q-25 11-53.667 16.5Q688.667 672 660 672q-114.689 0-195.345-80.655Q384 510.689" +
            " 384 396q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180 576q0 125 87.5 212.5T480 876Zm-4-297Z'/></svg>"

/**
 * Loads color scheme depending on first if user has 'color-scheme' stored in local storage
 * Otherwise, refers to users browser's preferred color mode
 * Otherwise, default color scheme is light mode
 * Referred to: https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting 
 */
function loadColorScheme(){
    let colorScheme = light;
    let modeSvg = darkModeSvg;
    let logo = "images/logo.svg";

    if(localStorage.getItem("color-scheme")){
        if(localStorage.getItem("color-scheme") == dark){
            colorScheme = dark;
            modeSvg = lightModeSvg;
            logo = "images/dark-logo.svg";
        }
    }
    else if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
        colorScheme = dark;
        modeSvg = lightModeSvg;
        logo = "images/dark-logo.svg";
    }

    document.getElementById("logo").src = logo; // Update site logo to that for color scheme
    document.getElementById("color-mode").innerHTML = modeSvg; // Update color mode icon
    document.documentElement.setAttribute("color-scheme", colorScheme); // Sets document attribute for color scheme
}


/**
 * Styles and underlines the link in navigation bar corresponding to current page
 * @param {string} mainId 
 */
function selectNav(mainId){
    let navId = mainId + "-nav";
    let selectedCSS = "text-underline-offset: 0.3em; text-decoration: underline 0.15em #faba61; font-weight: 600"
    document.getElementById(navId).style = selectedCSS;
}

window.addEventListener('DOMContentLoaded', ()=>{

    loadColorScheme(); // Loads color mode based on current user preferences

    const main = document.querySelector("main"); // Get current page main id
    selectNav(main.id); 

    if(main.id == "contact"){  
        // Add event listener for contact form submission if current page is contact page
        document.getElementById("contact-form").addEventListener("submit", (e)=>{
            e.preventDefault(); // prevent form submission and page refresh
            let dialog = document.getElementById("contact-form-dialog");
            showDialog(dialog, "ty-msg"); // show thank you message dialog
            document.getElementById("ty-msg-form").addEventListener("submit", ()=>{
                document.getElementById("contact-form").submit(); // submit form
            })
        });
    }

    const colorMode = document.getElementById("color-mode");
    colorMode.addEventListener("click", ()=>{
        // Change color scheme upon click on color mode button
        let curColor = document.documentElement.getAttribute("color-scheme");
        if(curColor == light){
            localStorage.setItem("color-scheme", dark);
        }else{
            localStorage.setItem("color-scheme", light);
        }
        loadColorScheme(); // Update color cheme of page
    })

});