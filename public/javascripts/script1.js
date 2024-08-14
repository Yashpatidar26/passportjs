/* SHOW MENU */
const navMenu = document.getElementById("nav-menu"),
	navToggle = document.getElementById("nav-toggle"),
	navClose = document.getElementById("nav-close");

/* MENU SHOW */
/* Validate if constant exists */
if (navToggle) {
	navToggle.addEventListener("click", () => {
		navMenu.classList.add("show-menu");
	});
}

/* MENU HIDDEN */
/* Validate if constant exists */
if (navClose) {
	navClose.addEventListener("click", () => {
		navMenu.classList.remove("show-menu");
	});
}

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
	const navMenu = document.getElementById("nav-menu");
	// When we click on each nav__link, we remove the show-menu class
	navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/* HOME SWIPER */
let homeSwiper = new Swiper(".home-swiper", {
	spaceBetween: 30,
	loop: "true",

	pagination: {
		el: ".swiper-pagination",
		clickable: true
	}
});

/* change body's background color */

let root = document.documentElement;

homeSwiper.on("transitionEnd", function (e) {
	if (this.activeIndex == 1) {
		root.style.setProperty(
			"--body-color",
			"linear-gradient(to right, #5B874B, #0C3720)"
		);
		root.style.setProperty("--sub", "#ffffff");
		root.style.setProperty("--title-color", "#ffffff");
		root.style.setProperty(
			"--container-color",
			"linear-gradient(136deg, #5B874B, #0C3720)"
		);
	}
	if (this.activeIndex == 2) {
		root.style.setProperty(
			"--body-color",
			"linear-gradient(to right, #E8CAFB, #6A4FB6)"
		);
		root.style.setProperty("--sub", "#303056");
		root.style.setProperty("--title-color", "#303056");
		root.style.setProperty(
			"--container-color",
			"linear-gradient(136deg, #E8CAFB, #6A4FB6)"
		);
	}
	if (this.activeIndex == 3) {
		root.style.setProperty(
			"--body-color",
			"linear-gradient(to right, #2E0916, #200A2B)"
		);
		root.style.setProperty("--sub", "#ff5b79");
		root.style.setProperty("--title-color", "#ffffff");
		root.style.setProperty(
			"--container-color",
			"linear-gradient(136deg, #2E0916, #200A2B)"
		);
	}
});

/* CHANGE BACKGROUND HEADER */
function scrollHeader() {
	const header = document.getElementById("header");
	// When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
	if (this.scrollY >= 50) header.classList.add("scroll-header");
	else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* NEW SWIPER */
let newSwiper = new Swiper(".new-swiper", {
	centeredSlides: true,
	slidesPerView: "auto",
	loop: "true",
	spaceBetween: 16
});

/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight,
			sectionTop = current.offsetTop - 58,
			sectionId = current.getAttribute("id");

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector(".nav__menu a[href*=" + sectionId + "]")
				.classList.add("active-link");
		} else {
			document
				.querySelector(".nav__menu a[href*=" + sectionId + "]")
				.classList.remove("active-link");
		}
	});
}
window.addEventListener("scroll", scrollActive);

/* SHOW SCROLL UP */
function scrollUp() {
	const scrollUp = document.getElementById("scroll-up");
	// When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
	if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
	else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/* SCROLL REVEAL ANIMATION */
const sr = ScrollReveal({
	origin: "top",
	distance: "10px",
	duration: 2500,
	delay: 400
	// reset: true
});

sr.reveal(`.home-swiper, .new-swiper, .newsletter__container`);
sr.reveal(`.category__data, .trick__content, .footer__content`, {
	interval: 100
});
sr.reveal(`.about__data, .discount__img`, { origin: "left" });
sr.reveal(`.about__img, .discount__data`, { origin: "right" });
// rukojara
/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.1
const speedDrag = -0.2

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseDown)
// clients
$(document).ready(function(){
	$('.pp-quote').click(function(){
	  $('.pp-quote').removeClass("active");
	  $(this).addClass("active");
  });
  });
  
  $(document).ready(function(){
	  
		 // hide-top
  
		  $('.li-quote-1').click(function(e){ 
			  e.stopPropagation();
			  $(".show").addClass('hide-top');
			  $(".hide-top").removeClass('show');
			  $('.quote-text-1').addClass('show');
			  $('.quote-text-1').removeClass('hide-bottom');             
		  });
  
		  $('.li-quote-2').click(function(e){ 
			  e.stopPropagation();
			  $(".show").addClass('hide-top');
			  $(".hide-top").removeClass('show');
			  $('.quote-text-2').addClass('show');             
			  $('.quote-text-2').removeClass('hide-bottom');
		  });
  
		  $('.li-quote-3').click(function(e){ 
			  e.stopPropagation();
			  $(".show").addClass('hide-top');
			  $(".hide-top").removeClass('show');         
			  $('.quote-text-3').addClass('show');             
			  $('.quote-text-3').removeClass('hide-bottom');
		  });
		  $('.li-quote-4').click(function(e){ 
			  e.stopPropagation();
			  $(".show").addClass('hide-top');
			  $(".hide-top").removeClass('show');      
			  $('.quote-text-4').addClass('show');             
			  $('.quote-text-4').removeClass('hide-bottom');
		  });
		  $('.li-quote-5').click(function(e){ 
			  e.stopPropagation();
			  $(".show").addClass('hide-top');
			  $(".hide-top").removeClass('show');      
			  $('.quote-text-5').addClass('show');             
			  $('.quote-text-5').removeClass('hide-bottom');
		  });
		  $('.li-quote-6').click(function(e){ 
			  e.stopPropagation();
			  $(".show").addClass('hide-top');
			  $(".hide-top").removeClass('show');      
			  $('.quote-text-6').addClass('show');             
			  $('.quote-text-6').removeClass('hide-bottom');
		  });
		  $('.li-quote-7').click(function(e){ 
			  e.stopPropagation();
			  $(".show").addClass('hide-top');
			  $(".hide-top").removeClass('show');      
			  $('.quote-text-7').addClass('show');             
			  $('.quote-text-7').removeClass('hide-bottom');
		  });
		  $('.li-quote-8').click(function(e){ 
			  e.stopPropagation();
			  $(".show").addClass('hide-top');
			  $(".hide-top").removeClass('show');      
			  $('.quote-text-8').addClass('show');             
			  $('.quote-text-8').removeClass('hide-bottom');
		  });
			 
	  
  });
  
  
  $(document).ready(function(){
	  
		 // hide-top
  
		  $('.li-quote-1').click(function(e){ 
			  e.stopPropagation();
			  $(".look").addClass('hide-dp-top');
			  $(".hide-dp-top").removeClass('look');
			  $('.dp-name-1').addClass('look');
			  $('.dp-name-1').removeClass('hide-dp-bottom');             
		  });
  
		  $('.li-quote-2').click(function(e){ 
			  e.stopPropagation();
			  $(".look").addClass('hide-dp-top');
			  $(".hide-dp-top").removeClass('look');
			  $('.dp-name-2').addClass('look');
			  $('.dp-name-2').removeClass('hide-dp-bottom');             
		  });
  
		  $('.li-quote-3').click(function(e){ 
			  e.stopPropagation();
			  $(".look").addClass('hide-dp-top');
			  $(".hide-dp-top").removeClass('look');
			  $('.dp-name-3').addClass('look');
			  $('.dp-name-3').removeClass('hide-dp-bottom');             
		  });
	  $('.li-quote-4').click(function(e){ 
			  e.stopPropagation();
			  $(".look").addClass('hide-dp-top');
			  $(".hide-dp-top").removeClass('look');
			  $('.dp-name-4').addClass('look');
			  $('.dp-name-4').removeClass('hide-dp-bottom');             
		  });
	  
		  $('.li-quote-5').click(function(e){ 
			  e.stopPropagation();
			  $(".look").addClass('hide-dp-top');
			  $(".hide-dp-top").removeClass('look');
			  $('.dp-name-5').addClass('look');
			  $('.dp-name-5').removeClass('hide-dp-bottom');             
		  });
	  
		  $('.li-quote-6').click(function(e){ 
			  e.stopPropagation();
			  $(".look").addClass('hide-dp-top');
			  $(".hide-dp-top").removeClass('look');
			  $('.dp-name-6').addClass('look');
			  $('.dp-name-6').removeClass('hide-dp-bottom');             
		  });
		  $('.li-quote-7').click(function(e){ 
			  e.stopPropagation();
			  $(".look").addClass('hide-dp-top');
			  $(".hide-dp-top").removeClass('look');
			  $('.dp-name-7').addClass('look');
			  $('.dp-name-7').removeClass('hide-dp-bottom');             
		  });
		  $('.li-quote-8').click(function(e){ 
			  e.stopPropagation();
			  $(".look").addClass('hide-dp-top');
			  $(".hide-dp-top").removeClass('look');
			  $('.dp-name-8').addClass('look');
			  $('.dp-name-8').removeClass('hide-dp-bottom');             
		  });
			 
	  
  });
//   mapppppppppppppppp
