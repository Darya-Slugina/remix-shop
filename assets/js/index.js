(function () {
    window.addEventListener("DOMContentLoaded", onHashChange);
    window.addEventListener("DOMContentLoaded", showCarousel);
    window.addEventListener("DOMContentLoaded", loadEvents);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("hashchange", showCarousel);

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
    let logo = getById('logo');


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

        let allPages = document.querySelector('main').children;
        for (let i = 0; i < allPages.length; i++) {
            if(allPages[i].id === page) {
                allPages[i].style.display = 'block'
            } else {
                allPages[i].style.display = 'none'
            }
        }
    }

    // OnScroll event handler
    function onScroll() {
        const scroll = document.documentElement.scrollTop;

        if (scroll > 25) {
            header.classList.add("main-header-new");
            bannerTop.classList.add("goDown");
            logo.classList.add("small-logo");
        } else {
            header.classList.remove("main-header-new");
            bannerTop.classList.remove("goDown");
            logo.classList.remove("small-logo");
        }
    }

    bannersController();
    brandsController();
    blogController();

    // Prepare the list for carousel 
    const shuffledArr = array => array.sort(() => 0.5 - Math.random());

    // Carousel
    function showCarousel(e) {
        let page = location.hash.slice(1);
        if (page === "home" || page === "") {
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


    // change nav style on click
    const navListMain = Array.from(document.querySelector('.navigation-list').children);
    navListMain.forEach(function (currentNav) {
        currentNav.addEventListener('click', selectPage);
    })

    function selectPage(ev) {
        navListMain.forEach(nav => nav.classList.remove('selectedNav'))
        ev.target.parentElement.classList.add('selectedNav')
    }


    //change filter style on click
    const allFilters = Array.from(document.querySelectorAll('.main-category'));
    allFilters.forEach(function (currentFilter) {
        currentFilter.addEventListener('click', selectFilter)
    })

    function selectFilter(ev) {
        ev.preventDefault();
        allFilters.forEach(filter => filter.classList.remove('selectedFilter'));
        ev.target.parentElement.classList.add("selectedFilter");
    }

    // select female clothes
    const womenBtn = document.getElementById('womenBtn');
    womenBtn.addEventListener('click', function () {
        womenClothesController(siteManager);
    })

    // select male clothes
    const menBtn = document.getElementById('menBtn');
    menBtn.addEventListener('click', function () {
        menClothesController(siteManager);
    })

    // personal filters - dropdown info on hover
    const dropdownPersonalFilters = document.getElementById('dropdown-personal-filters');
    const containerPersonalFilters = document.querySelector('.container-personalFilters');
    containerPersonalFilters.addEventListener('mouseover', function () {
        dropdownPersonalFilters.style.display = 'block';
    })
    containerPersonalFilters.addEventListener('mouseout', function () {
        dropdownPersonalFilters.style.display = 'none';
    })


    // Select current product
    function selectProduct(e) {
        let productId = e.target.parentNode.children[0].value;
        product = siteManager.allProducts.find(el => el.id === Number(productId));

        productController();
        loadEvents();
        window.scrollTo(0, 0);
    }

    // Show the current tab in overView page
    function changeInfo(e) {
        e.preventDefault();

        let tab = Array.from(document.getElementsByClassName("nav-link"));
        tab.forEach(el => el.classList.remove("active"));
        e.target.parentElement.classList.add("active");

        let info = getById("overview");
        let delivery = getById("delivery");
        let reclamation = getById("reclamation");

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
