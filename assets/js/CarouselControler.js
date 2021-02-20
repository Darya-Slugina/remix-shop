   // Create Carousel products
   let slides = Array.from(Array(3), () => new Array(6));
   createCarouselList();

   function createCarouselList() {
       for (let j = 0; j < 3; j++) {
           for (let k = 0; k < 6; k++) {
               let index = Math.floor(Math.random() * siteManager.allProducts.length);
               slides[j][k] = siteManager.allProducts[index];

           }
       }
   }
  
const carouselController = function () {
    // Controller
    const source = document.getElementById("carousel").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(slides);
  
    let container = document.getElementById("carouselPages");
    container.innerHTML = html;
    console.log(container);
  };

// Carousel
let slideIndex = 1;
showSlides(slideIndex);

let next = document.getElementById("next");
next.addEventListener("click", plusSlides);

let previous = document.getElementById("prev");
previous.addEventListener("click", plusSlides);

// Next/previous controls
function plusSlides(e) {
    if (e.target.id === "next" ? showSlides(slideIndex += 1) : showSlides(slideIndex -= 1));
}

let dots = Array.from(document.getElementsByClassName("dot"));
dots.forEach(function (elem) {
    elem.addEventListener("click", currentSlide);
})

// Thumbnail image controls
function currentSlide(e) {
    console.log(e)
    showSlides(slideIndex = e.target.id.slice(-1));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slideshow");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

carouselController();