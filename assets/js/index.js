(function () {
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("DOMContentLoaded", onHashChange);

    //  Site manager
    let siteManager = new Manager;

    // Initial DOM elements selectors
    let homePage = document.getElementById("pageHome");
    let allProducts = document.getElementById("pageAllProducts");
    let secondHand = document.getElementById("pageSecondHand");
    let outlet = document.getElementById("pageOutlet");
    let newSeason = document.getElementById("pageNewSeason");
    let overView = document.getElementById("pageOverView");
    // let slideshowContainer1 = document.getElementById("slideshowContainer1");
    // let slideshowContainer2 = document.getElementById("slideshowContainer2");
    // let slideshowContainer3 = document.getElementById("slideshowContainer3");
    let list = Array.from(document.getElementsByClassName("slide-box"));


    //   Adds the initial male products
    maleClothes.forEach(function (item) {
        let product = createProduct(item);
        siteManager.addManProduct(product);
    });

    // Created the product from array
    function createProduct(item) {
        let product = new Product(
            item.id,
            item.name,
            item.brand,
            item.price,
            item.discount,
            item.type,
            item.size,
            item.condition,
            item.materials,
            item.color,
            item.description,
            item.image_front,
            item.image_back,
            item.image_closeup,
        );
        return product;
    }

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

    // Show Carousel products
    function showCarousel(el, product) {
        
        let index = Math.floor(Math.random()* product.length);
        let currentProduct = product[index];

        let productBox = document.createElement("div");
        let link = document.createElement("a");
        link.href = "#";
        let img = document.createElement("img");
        img.src = currentProduct.image_front;
        img.alt = currentProduct.name;
        link.appendChild(img);
        productBox.appendChild(link);

        let productDetailInfo = document.createElement("div");
        let favouriteIcon = document.createElement("span");
        favouriteIcon.classList.add("favourite-icon");
        productDetailInfo.appendChild(favouriteIcon);

        if (currentProduct.discount.length > 0) {
            let cornerWrapper = document.createElement("div");
            let discountPic = document.createElement("span");
            discountPic.innerHTML = "%";
            discountPic.classList.add = "discount";
            if (currentProduct.type.some(el => el === "OUTLET ПРОДУКТ")) {
                let outlet = document.createElement("span");
                outlet.classList.add("outletPic");
                cornerWrapper.appendChild(outlet);
            }
            if (currentProduct.type.some(el => el === "ПРОДУКТ ОТ СЛЕДВАЩ СЕЗОН")) {
                let nextSeason = document.createElement("span");
                nextSeason.classList.add("nextSeasonPic");
                cornerWrapper.appendChild(nextSeason);
            }
            cornerWrapper.append(discountPic);
            el.appendChild(cornerWrapper);
        }

        let productInfo = document.createElement("div");
        productInfo.classList.add = "productInfo";
        let productLink = document.createElement("a");
        productLink.href = "#";
        productLink.innerHTML = currentProduct.brand;
        let size = document.createElement("span");
        size.innerHTML = currentProduct.size;
        productInfo.append(productLink, size);

        let productButton = document.createElement("div");
        productButton.classList.add = "product-button";
        let button = document.createElement("button");
        button.innerHTML = "Добавете";
        button.classList.add = "add-button";
        productButton.appendChild(button);

        el.append(productBox, productInfo, productButton);

        product.splice(index,1);

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

    let freeClothes = siteManager.maleClothes;
    list.forEach(function (el) {
        showCarousel(el, freeClothes);

    })

})();