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
    let showBrands = document.getElementById("show-more");
    let header = document.getElementById("main-header");
    let bannerTop = document.getElementById("banner-container");
    let hiddenButton = document.getElementById("hidden-text-button");
    
    window.addEventListener('scroll', onScroll);
    showBrands.addEventListener("click", showMoreBrands);
    hiddenButton.addEventListener("click", showMoreInfo);

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

     // OnScroll event handler
     function onScroll() {
        const scroll = document.documentElement.scrollTop;

        if (scroll > 25) {
            header.classList.add("main-header-new");
            bannerTop.classList.add("goDown");
        } else {
            header.classList.remove("main-header-new");
            bannerTop.classList.remove("goDown");
        }
    }

    // Show more brands on click
    function showMoreBrands() {

        let moreBrands = Array.from(document.getElementsByClassName("brands-list hidden"));
        moreBrands.forEach(element => {
            element.style.display = "block";
        });
        showBrands.style.display = "none";
    }

    // Show more information about us section on click
    function showMoreInfo(e){
        e.preventDefault();
        let hiddenText = document.getElementById("hiddenText");
        hiddenText.classList.toggle("hidden-text-show");
        hiddenButton.classList.toggle("reverse");
    }

})();