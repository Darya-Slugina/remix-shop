(function () {
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("DOMContentLoaded", onHashChange);

    //  Site manager
    let siteManager = new Manager;


    // Initial DOM elements selectors
    let homePage = getById("pageHome");
    let allProducts = getById("pageAllProducts");
    let secondHand = getById("pageSecondHand");
    let outlet = getById("pageOutlet");
    let newSeason = getById("pageNewSeason");
    let overView = getById("pageOverView");
    let showBrands = getById("show-more");
    let header = getById("main-header");
    let bannerTop = getById("banner-container");
    let hiddenButton = getById("hidden-text-button");
    let list = Array.from(document.getElementsByClassName("slide-box"));


    //   Adds the initial male products
    maleClothes.forEach(function (item) {
        let product = createProduct(item);
        siteManager.addManProduct(product);
    });

    //   Adds the initial female products
    femaleClothes.forEach(function (item) {
        let product = createProduct(item);
        siteManager.addWomanProduct(product);
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

    //created the array with all products
    siteManager.createAllProducts();

    //Event listeners
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

    // Show Carousel products
    let freeClothes = [...siteManager.allProducts];
    list.forEach(function (el) {
        showCarousel(el, freeClothes);
    })

    function showCarousel(el, product) {

        let index = Math.floor(Math.random() * product.length);
        let currentProduct = product[index];

        // Product container and img //////////////////////////////
        let productBox = document.createElement("div");
        productBox.classList.add("product-box");
        let link = document.createElement("a");
        link.classList.add("product-photos");
        link.href = "#";
        let img = document.createElement("img");
        img.src = currentProduct.image_front;
        img.alt = currentProduct.name;
        img.classList.add("product-img");

        // Change picture on hover////////////////////////////
        img.addEventListener("mouseover", function(ev){
            console.log("On mouse over: ", ev);
        ev.target.src = currentProduct.image_back;
        });
        img.addEventListener("mouseout", function(ev){
            console.log("On mouse out: ", ev);
        ev.target.src = currentProduct.image_front;
        });

        link.appendChild(img);
        productBox.appendChild(link);

        // Favourite ion ////////////////////////////////
        let productDetailInfo = document.createElement("div");
        productDetailInfo.classList.add("favourite-icon-container");
        let favouriteIcon = document.createElement("span");
        favouriteIcon.classList.add("favourite-icon");
        productDetailInfo.appendChild(favouriteIcon);
        el.appendChild(productDetailInfo);

        //  Product discount pictures //////////////////////////////////
        if (currentProduct.discount.length > 0) {
            let cornerWrapper = document.createElement("div");
            cornerWrapper.classList.add("cornerWrapper");
            let discountPic = document.createElement("span");
            discountPic.innerHTML = "%";
            discountPic.classList.add("discount");
            cornerWrapper.append(discountPic);
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
            el.appendChild(cornerWrapper);
        }

        //Product info - brand and size/////////////////////
        let productInfo = document.createElement("div");
        productInfo.classList.add("product-info");
        let productLink = document.createElement("a");
        productLink.classList.add("product-brand")
        productLink.href = "#";
        productLink.innerHTML = currentProduct.brand;
        let size = document.createElement("span");
        size.classList.add("product-size");
        size.innerHTML = currentProduct.size;
        productInfo.append(productLink, size);

        // Product price /////////////////////////////////////
        let productPrice = document.createElement("div");
        productPrice.classList.add("price-box");
        if (currentProduct.discount.length > 0) {
            let oldPriceBox = document.createElement("div");
            oldPriceBox.classList.add("old-price-box");
            let priceTitle = document.createElement("span");
            priceTitle.classList.add("price-title");
            priceTitle.innerHTML = "Начална цена";
            let oldPrice = document.createElement("span");
            oldPrice.classList.add("old-price");
            oldPrice.innerHTML = `${currentProduct.price}лв`;
            oldPriceBox.append(priceTitle, oldPrice);

            let newPriceBox = document.createElement("div");
            newPriceBox.classList.add("new-price-box");
            let newPriceTitle = document.createElement("span");
            newPriceTitle.classList.add("promo");
            newPriceTitle.innerHTML = currentProduct.discount;
            let newPrice = document.createElement("span");
            newPrice.classList.add("new-price");
            newPrice.innerHTML = `${getNewPrice(currentProduct.price, currentProduct.discount)}лв`;
            newPriceBox.append(newPriceTitle, newPrice);

            productPrice.append(oldPriceBox, newPriceBox);
        } else {
            let priceBox = document.createElement("div");
            priceBox.classList.add("price-container");
            let onePriceTitle = document.createElement("span");
            onePriceTitle.classList.add("price-without-discount");
            onePriceTitle.innerHTML = "Цена";
            let onePrice = document.createElement("span");
            onePrice.classList.add("price");
            onePrice.innerHTML = `${currentProduct.price}лв`;
            priceBox.append(onePriceTitle, onePrice)
            productPrice.append(priceBox);
        }

        // Product button //////////////////////////////////////
        let productButton = document.createElement("div");
        productButton.classList.add("product-button");
        let button = document.createElement("button");
        button.innerHTML = "Добавете";
        button.classList.add("add-button");
        productButton.appendChild(button);

        el.append(productBox, productInfo, productPrice, productButton);

        product.splice(index, 1);

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


    // Show more brands on click
    function showMoreBrands(e) {
        e.preventDefault();
        let hiddenBrands = getById("brands-hidden");
        hiddenBrands.classList.add("hidden-brands-show");
        showBrands.style.display = "none";
    }

    // Show more information about us section on click
    function showMoreInfo(e) {
        e.preventDefault();
        let hiddenText = getById("hiddenText");
        hiddenText.classList.toggle("hidden-text-show");
        hiddenButton.classList.toggle("reverse");
    }
})();