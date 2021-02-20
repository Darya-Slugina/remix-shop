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

    bannersController();
   

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

 

 

    // showCarousel(slides);

    // let freeClothes = [...siteManager.allProducts];
    // list.forEach(function (el) {
    //     showCarousel(el, freeClothes);
    // })

    // function showCarousel(product) {
    //     let carousel =  '';

    //     for (let i = 0; i < product.length; i++) {

    //         carousel += '<div class="slideshow fade">';
    //         carousel += '<div id="slideshowContainer' + (i+1) + '" class="page' + (i+1) + '">';
    //         carousel += '<ul class="product-list">';

    //         for (let j = 0; j < product[i].length; j++) {
    //             let currentProduct = product[i][j];
    //             carousel += '<li class="slide-box">';
    //             carousel += '<div class="favourite-icon-container">';
    //             carousel += '<span class="favourite-icon"></span></div>';
    //             carousel += '<div class="cornerWrapper"><span class="discount">%</span>';
    //             carousel += '<span class="outletPic"></span></div><div class="product-box"><a class="product-photos" href="#">';
    //             carousel += '<img src="' + currentProduct.image_front + '" alt="' + currentProduct.name + '" class="product-img">';
    //             carousel += '</a></div><div class="product-info"><a class="product-brand" href="#">' + currentProduct.brand  + '</a>';
    //             carousel += '<span class="product-size">' + currentProduct.size + '</span></div><div class="price-box"><div class="old-price-box">';
    //             carousel += '<span class="price-title">Начална цена</span><span class="old-price">' + currentProduct.price + 'лв</span></div><div class="new-price-box">';
    //             carousel += '<span class="promo">' + currentProduct.discount + '%</span><span class="new-price">' + getNewPrice(currentProduct.price, currentProduct.discount) + 'лв</span></div></div><div class="product-button">';
    //             carousel += '<button class="add-button">Добавете</button></div></li>';


    //             // let currentProduct = product[i][j];

    //             // // Product container and img //////////////////////////////
    //             // let li = document.createElement("li");
    //             // li.classList.add("slide-box");

    //             // let productBox = document.createElement("div");
    //             // productBox.classList.add("product-box");
    //             // let link = document.createElement("a");
    //             // link.classList.add("product-photos");
    //             // link.href = "#";
    //             // let img = document.createElement("img");
    //             // img.src = currentProduct.image_front;
    //             // img.alt = currentProduct.name;
    //             // img.classList.add("product-img");

    //             // // Change picture on hover////////////////////////////
    //             // img.addEventListener("mouseover", function (ev) {
    //             //     ev.target.src = currentProduct.image_back;
    //             // });
    //             // img.addEventListener("mouseout", function (ev) {
    //             //     ev.target.src = currentProduct.image_front;
    //             // });

    //             // link.appendChild(img);
    //             // productBox.appendChild(link);

    //             // // Favourite ion ////////////////////////////////
    //             // let productDetailInfo = document.createElement("div");
    //             // productDetailInfo.classList.add("favourite-icon-container");
    //             // let favouriteIcon = document.createElement("span");
    //             // favouriteIcon.classList.add("favourite-icon");
    //             // productDetailInfo.appendChild(favouriteIcon);
    //             // li.appendChild(productDetailInfo);

    //             // //  Product discount pictures //////////////////////////////////
    //             // if (currentProduct.discount.length > 0) {
    //             //     console.log(currentProduct.discount);
    //             //     let cornerWrapper = document.createElement("div");
    //             //     cornerWrapper.classList.add("cornerWrapper");
    //             //     let discountPic = document.createElement("span");
    //             //     discountPic.innerHTML = "%";
    //             //     discountPic.classList.add("discount");
    //             //     cornerWrapper.append(discountPic);
    //             //     if (currentProduct.type.some(el => el === "OUTLET ПРОДУКТ")) {
    //             //         let outlet = document.createElement("span");
    //             //         outlet.classList.add("outletPic");
    //             //         cornerWrapper.appendChild(outlet);
    //             //     }
    //             //     if (currentProduct.type.some(el => el === "ПРОДУКТ ОТ СЛЕДВАЩ СЕЗОН")) {
    //             //         let nextSeason = document.createElement("span");
    //             //         nextSeason.classList.add("nextSeasonPic");
    //             //         cornerWrapper.appendChild(nextSeason);
    //             //     }
    //             //     li.appendChild(cornerWrapper);
    //             // }

    //             // //Product info - brand and size/////////////////////
    //             // let productInfo = document.createElement("div");
    //             // productInfo.classList.add("product-info");
    //             // let productLink = document.createElement("a");
    //             // productLink.classList.add("product-brand")
    //             // productLink.href = "#";
    //             // productLink.innerHTML = currentProduct.brand;
    //             // let size = document.createElement("span");
    //             // size.classList.add("product-size");
    //             // size.innerHTML = currentProduct.size;
    //             // productInfo.append(productLink, size);

    //             // // Product price /////////////////////////////////////
    //             // let productPrice = document.createElement("div");
    //             // productPrice.classList.add("price-box");
    //             // if (currentProduct.discount.length > 0) {
    //             //     let oldPriceBox = document.createElement("div");
    //             //     oldPriceBox.classList.add("old-price-box");
    //             //     let priceTitle = document.createElement("span");
    //             //     priceTitle.classList.add("price-title");
    //             //     priceTitle.innerHTML = "Начална цена";
    //             //     let oldPrice = document.createElement("span");
    //             //     oldPrice.classList.add("old-price");
    //             //     oldPrice.innerHTML = `${currentProduct.price}лв`;
    //             //     oldPriceBox.append(priceTitle, oldPrice);

    //             //     let newPriceBox = document.createElement("div");
    //             //     newPriceBox.classList.add("new-price-box");
    //             //     let newPriceTitle = document.createElement("span");
    //             //     newPriceTitle.classList.add("promo");
    //             //     newPriceTitle.innerHTML = currentProduct.discount;
    //             //     let newPrice = document.createElement("span");
    //             //     newPrice.classList.add("new-price");
    //             //     newPrice.innerHTML = `${getNewPrice(currentProduct.price, currentProduct.discount)}лв`;
    //             //     newPriceBox.append(newPriceTitle, newPrice);

    //             //     productPrice.append(oldPriceBox, newPriceBox);
    //             // } else {
    //             //     let priceBox = document.createElement("div");
    //             //     priceBox.classList.add("price-container");
    //             //     let onePriceTitle = document.createElement("span");
    //             //     onePriceTitle.classList.add("price-without-discount");
    //             //     onePriceTitle.innerHTML = "Цена";
    //             //     let onePrice = document.createElement("span");
    //             //     onePrice.classList.add("price");
    //             //     onePrice.innerHTML = `${currentProduct.price}лв`;
    //             //     priceBox.append(onePriceTitle, onePrice)
    //             //     productPrice.append(priceBox);
    //             // }

    //             // // Product button //////////////////////////////////////
    //             // let productButton = document.createElement("div");
    //             // productButton.classList.add("product-button");
    //             // let button = document.createElement("button");
    //             // button.innerHTML = "Добавете";
    //             // button.classList.add("add-button");
    //             // productButton.appendChild(button);

    //             // li.append(productBox, productInfo, productPrice, productButton);
    //             // el.appendChild(li);

    //             // // product.splice(index, 1);

    //         }

    //         carousel += '</ul></div></div>';
    //     }

    //     let mainDiv = document.getElementById('carouselPages');
    //     mainDiv.innerHTML = carousel;
    // }

    


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