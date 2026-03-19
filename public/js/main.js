// 1. TYPING ANIMATION (Hero Section)
const typingText = "I Am A Web Designer";
let charIndex = 0;

function type() {
    if (charIndex < typingText.length) {
        document.querySelector('.hero-content h1').innerHTML = 
            typingText.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
        charIndex++;
        setTimeout(type, 150);
    }
}

// 2. TAB SWITCHING LOGIC (About Section)
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    const targetTab = document.getElementById(tabname);
    if (targetTab) {
        targetTab.classList.add("active-tab");
    }
}

// 3. MOBILE MENU TOGGLE (Updated for Cancel Button)
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const menuIcon = mobileMenu.querySelector('i');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Swap icons: Bars <-> Times (X)
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
}

// Close menu when a link is clicked (Improved UX)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    });
});

// 4. INITIALIZE ON LOAD
window.onload = () => {
    type();
};