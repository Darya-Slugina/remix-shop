(function () {
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("DOMContentLoaded", onHashChange);

    // Initial DOM elements selectors
    let homePage = document.getElementById("pageHome");
    let allProducts = document.getElementById("pageAllProducts");
    let secondHand = document.getElementById("pageSecondHand");
    let outlet = document.getElementById("pageOutlet");
    let newSeason = document.getElementById("pageNewSeason");
    let overView = document.getElementById("pageOverView");



    //   Router
    function onHashChange() {
        let page = location.hash.slice(1);

        switch (page) {
            case "home":
                homePage.style.display = "block";
                allProducts.style.display = "none";
                secondHand.style.display = "none";
                outlet.style.display = "none";
                newSeason.style.display = "none";
                overView.style.display = "none";
                break;
            case "allProducts":
                homePage.style.display = "none";
                allProducts.style.display = "block";
                secondHand.style.display = "none";
                outlet.style.display = "none";
                newSeason.style.display = "none";
                overView.style.display = "none";
                break;
            case "secondHand":
                homePage.style.display = "none";
                allProducts.style.display = "none";
                secondHand.style.display = "block";
                outlet.style.display = "none";
                newSeason.style.display = "none";
                overView.style.display = "none";
                break;
            case "outlet":
                homePage.style.display = "none";
                allProducts.style.display = "none";
                secondHand.style.display = "none";
                outlet.style.display = "block";
                newSeason.style.display = "none";
                overView.style.display = "none";
                break;
            case "newSeason":
                homePage.style.display = "none";
                allProducts.style.display = "none";
                secondHand.style.display = "none";
                outlet.style.display = "none";
                newSeason.style.display = "block";
                overView.style.display = "none";
                break;
            case "overView":
                homePage.style.display = "none";
                allProducts.style.display = "none";
                secondHand.style.display = "none";
                outlet.style.display = "none";
                newSeason.style.display = "none";
                overView.style.display = "block";
                break;
            default:
                homePage.style.display = "block";
                allProducts.style.display = "none";
                secondHand.style.display = "none";
                outlet.style.display = "none";
                newSeason.style.display = "none";
                overView.style.display = "none";
        }
    }

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
        showSlides(slideIndex = e.target.id.slice(-1));
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("slideshow");
        var dots = document.getElementsByClassName("dot");
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
})();