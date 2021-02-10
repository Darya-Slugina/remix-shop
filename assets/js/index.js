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
})();