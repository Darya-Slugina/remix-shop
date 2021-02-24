(function () {
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("DOMContentLoaded", onHashChange);
    window.addEventListener("hashchange", showCarousel);
    window.addEventListener("DOMContentLoaded", showCarousel);
    window.addEventListener("DOMContentLoaded", loadEvents);

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

    brandsController();
    blogController();

    // Prepare the list for carousel 
    const shuffledArr = array => array.sort(() => 0.5 - Math.random());


    // Carousel
    function showCarousel(e) {
        let page = location.hash.slice(1);
        if (page === "home") {
            let listForCarousel = shuffledArr(siteManager.allProducts);
            createCarouselList(listForCarousel, 3);

        } else if (page === "overView") {
            let listForCarousel = shuffledArr(siteManager.allProducts);
            createCarouselList(listForCarousel, 2);
        }
        carouselController(page);

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
            showSlides(slideIndex = Number(e.target.id.slice(-1)));
        }

        function showSlides(n) {
            let slides = document.getElementsByClassName("slideshow");
            let dots = document.getElementsByClassName("dot");

            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";

        }

        loadEvents();
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

    // Change img on hover
    function onMouseOver(e) {
        let picture = e.target.src;
        let newImg = siteManager.allProducts.find(el => el.image_front === picture);
        e.target.src = newImg.image_back;
    }

    function onMouseOut(e) {
        let picture = e.target.src;
        let newImg = siteManager.allProducts.find(el => el.image_back === picture);
        e.target.src = newImg.image_front;
    }

    // Select current product
    function selectProduct(e) {
        let productId = e.target.parentNode.children[0].value;
        product = siteManager.allProducts.find(el => el.id === Number(productId));

        productController();
        
        if (productId === "undefined" || productId === "null") {
            let errorMessage = document.getById("overViewContainer");
            errorMessage.innerHTML = "Не е избран продукт за отобразяването";
        }
        // TODO, if no product -> show Msg to user -> === undefinded
    }

    // Show the current tab in overView page
    function changeInfo(e) {
        e.preventDefault();
        let info = getById("overview");
        let delivery = getById("delivery");
        let reclamation = getById("reclamation");

        // let newClass = Array.from(document.getElementsByClassName("nav-item"));


        if (e.target.innerHTML === "Доставка") {
            delivery.classList.add("show");
            reclamation.classList.remove("show");
            info.classList.remove("show");
        } else if (e.target.innerHTML === "Връщане") {
            delivery.classList.remove("show");
            reclamation.classList.add("show");
            info.classList.remove("show");
        } else if (e.target.innerHTML === "Детайли") {
            delivery.classList.remove("show");
            reclamation.classList.remove("show");
            info.classList.add("show");
        }
    }

    //Change big img on overViewPage on click
    function changeImg(e) {
        let mainImg = getById("big-img");
        mainImg.src = e.target.src;
    }

    function loadEvents() {
        let productImages = Array.from(document.getElementsByClassName("product-img"));
        productImages.forEach(function (img) {
            img.addEventListener("mouseover", onMouseOver);
            img.addEventListener("mouseout", onMouseOut);
        });

        let buttons = Array.from(document.getElementsByClassName("product-photos"));
        buttons.forEach(function (currentBtn) {
            currentBtn.addEventListener('click', selectProduct)
        });

        let nav = Array.from(document.getElementsByClassName("nav-item"));
        nav.forEach(function (currentBtn) {
            currentBtn.addEventListener("click", changeInfo);
        });

        let items = Array.from(document.getElementsByClassName("img-fluid"));
        items.forEach(function (currentImg) {
            currentImg.addEventListener("click", changeImg);
        });
    }




})();
