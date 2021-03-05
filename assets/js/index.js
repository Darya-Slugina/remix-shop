(function () {
    window.addEventListener("DOMContentLoaded", onHashChange);
    window.addEventListener("DOMContentLoaded", loadPreviousSession);
    window.addEventListener("DOMContentLoaded", showCarousel);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("hashchange", showCarousel);

    //  Site manager
    let siteManager = new Manager;


    // Initial DOM elements selectors
    let homePage = getById("home");
    let showBrands = getById("show-more");
    let header = getById("main-header");
    let bannerTop = getById("banner-container");
    let hiddenButton = getById("hidden-text-button");
    let logo = getById("logo");
    let enter = getById("enterButton");
    let loginForm = getById("loginForm");
    let loginCloseIcon = getById("loginCloseIcon");
    let registerLink = getById("registerLink");
    let loginBackBtn = getById("loginBackBtn");
    let loginSlide = getById("loginSlide");
    let registerSlide = getById("registerSlide");
    let loginLink = getById("loginLink");
    let favoritesCounter = getById("favorites_count_top");
    let favouritIconMain = getById("favourit-icon-main");
    let desiredCounter = getById("basketProductCount");
    let basketIcon = getById("basket-icon");
    let loginButton = getById("loginButton");
    let srchProd = getById("srchProd");



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
    enter.addEventListener("click", showloginForm);
    loginCloseIcon.addEventListener("click", closeLoginForm);
    registerLink.addEventListener("click", showRegistrationForm)
    loginBackBtn.addEventListener("click", backTologinForm);
    loginLink.addEventListener("click", backTologinForm);
    loginButton.addEventListener("click", updateFavourites);
    loginButton.addEventListener("click", updateDesires);
    basketIcon.addEventListener("click", showBasketInfo);


    //Router
    function onHashChange() {
        let page = location.hash.slice(1);

        let allPages = document.querySelector('main').children;
        for (let i = 0; i < allPages.length; i++) {
            if (allPages[i].id === page) {
                allPages[i].style.display = 'block'
            } else if (page === '') {
                allPages[i].style.display = 'none'
                homePage.style.display = 'block';
            } else {
                allPages[i].style.display = 'none'
            }

            if (page === 'favourites') {
                showMyFavourites();
            }
        }
        moveToBasket();
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

    // On click show Login page
    function showloginForm(e) {
        e.preventDefault();
        loginForm.classList.add("show");
    }

    // On click close Login page
    function closeLoginForm(e) {
        e.preventDefault();
        loginForm.classList.remove("show");
    }

    //// On click change Login page on Registration page
    function showRegistrationForm(e) {
        e.preventDefault();
        loginSlide.style.display = "none";
        registerSlide.style.display = "block";
        loginBackBtn.style.visibility = "visible";
    }

    // On click back to login page
    function backTologinForm(e) {
        e.preventDefault();
        loginSlide.style.display = "block";
        registerSlide.style.display = "none";
        loginBackBtn.style.visibility = "hidden";
    }

    function loadPreviousSession() {
        if (JSON.parse(localStorage.getItem("login"))) {
            loginForm.classList.remove("show");
            enterButton.style.display = "none";
            let icons = document.querySelectorAll(".registration>.afterRegistration>a");
            icons.forEach(el => el.style.display = "block");
        }
    }

    bannersController();
    brandsController();
    blogController();

    //Serch by name
    srchProd.addEventListener("blur", function (event) {
        let filtered = siteManager.filterByName(event.target.value);
        showFilteredProducts(filtered);

    });

    // Show allProducts page with filtered content
    function showFilteredProducts(products) {
        getById("home").style.display = "none";
        getById("allProducts").style.display = "block";
        filteredClothesController(products);
        getById("search-button").addEventListener("click", function () {
            srchProd.value = "";
        })

        let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
        productImages.forEach(img => changeImgOnHover(img));
    }

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
        moveToBasket();
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

        let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
        productImages.forEach(img => changeImgOnHover(img));

        let buttons = Array.from(document.getElementsByClassName("product-photos"));
        buttons.forEach(function (currentBtn) {
            currentBtn.addEventListener('click', selectProduct);
        });

        likeItem();
        moveToBasket();
        updateDesires();
    })

    // select male clothes
    const menBtn = document.getElementById('menBtn');
    menBtn.addEventListener('click', function () {
        menClothesController(siteManager);

        let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
        productImages.forEach(img => changeImgOnHover(img));

        let buttons = Array.from(document.getElementsByClassName("product-photos"));
        buttons.forEach(function (currentBtn) {
            currentBtn.addEventListener('click', selectProduct);
        });

        likeItem();
        moveToBasket();
        updateDesires();
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
        goBack();

        loadEvents();
        window.scrollTo(0, 0);
    }

    // Show the current tab in overView page
    function changeInfo(e) {
        e.preventDefault();

        let tab = Array.from(document.getElementsByClassName("nav-link"));
        tab.forEach(el => el.classList.remove("activeTab"));

        e.target.parentElement.classList.add("activeTab");
        e.target.classList.add("activeTab");

        let info = getById("overview");
        let delivery = getById("delivery");
        let reclamation = getById("reclamation");

        if (e.target.innerHTML === "Доставка" || e.target.innerText === "ДОСТАВКА") {
            delivery.classList.add("show");
            reclamation.classList.remove("show");
            info.classList.remove("show");
        } else if (e.target.innerHTML === "Връщане" || e.target.innerText === "ВРЪЩАНЕ") {
            delivery.classList.remove("show");
            reclamation.classList.add("show");
            info.classList.remove("show");
        } else if (e.target.innerHTML === "Детайли" || e.target.innerText === "ДЕТАЙЛИ") {
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

    //Go back on the previous page 
    function goBack() {
        let backButton = getById("goBack");
        backButton.addEventListener("click", function (e) {
            e.preventDefault();
            history.go(-1);
        })
    }

    //favourite items counter
    function updatefavouriteCounter() {
        let counter = userStorage.myFavouritesCount;

        if (counter > 0) {
            favoritesCounter.style.display = "flex";
            favouritIconMain.classList.add("liked");
            favoritesCounter.innerHTML = counter;

        } else {
            favoritesCounter.style.display = "none";
            favouritIconMain.classList.remove("liked");
            favoritesCounter.innerHTML = '';
        }
    }

     //Desired items counter
    function updateDesiredCounter() {
        let counter = userStorage.myDesiredCounter;

        if (counter > 0) {
            desiredCounter.style.display = "flex";
            basketIcon.classList.add("full");
            desiredCounter.innerHTML = counter;

        } else {
            desiredCounter.style.display = "none";
            basketIcon.classList.remove("full");
            desiredCounter.innerHTML = '';
        }
    }

    // On click like the item
    function likeItem() {
        let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
        userStorage.init();

        favouriteIcon.forEach(el => el.addEventListener("click", function (e) {
            if (userStorage.isLogged == true) {
                let currentItem = siteManager.allProducts.filter(el => el.id === Number(e.target.previousElementSibling.value));

                if (userStorage.myFavourites.filter(function (elem) { return elem.id === currentItem[0].id }).length > 0) {
                    userStorage.removeFromFavourite(currentItem[0]);
                    e.target.classList.remove("liked");
                    counter = userStorage.myFavourites.length;
                    favoritesCounter.innerHTML = counter;
                    userStorage.myFavouritesCount = counter;
                } else {
                    userStorage.addToFavourite(currentItem[0]);
                    e.target.classList.add("liked");
                    counter = userStorage.myFavourites.length;
                    favoritesCounter.innerHTML = counter;
                    userStorage.myFavouritesCount = counter;
                }

                updatefavouriteCounter();
            }
        }));
    }

    // Check if item in favourites and put current styles
    function updateLikes() {
        let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
        favouriteIcon.forEach(el => {
            if (userStorage.myFavourites.some(item => item.id == el.getAttribute("productId"))) {
                el.classList.add("liked");
            }
        });
    }

    // Check if item in desired and put current styles
    function updateDesiredProd() {
        let desiredBtn = document.querySelectorAll(".add-button");
        desiredBtn.forEach(el => {
            if (userStorage.myDesiredProd.some(item => item.id == el.value)) {
                el.innerText = "Добавено";
                el.classList.add("clicked");
            }
        });
    }

    function updateFavourites() {
        updatefavouriteCounter();
        updateLikes();
    }

    function updateDesires() {
        updateDesiredCounter();
        updateDesiredProd();
    }

    function changeImgOnHover(img) {
        img.addEventListener("mouseover", onMouseOver);
        img.addEventListener("mouseout", onMouseOut);
    }

    function loadEvents() {

        updatefavouriteCounter();
        likeItem();
        updateDesiredCounter();
        updateDesiredProd();

        let productImages = Array.from(document.getElementsByClassName("product-img"));
        productImages.forEach(img => changeImgOnHover(img));

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

        // On click show the user subMenu with logout button
        let userMenu = getById("user-button");
        userMenu.addEventListener("click", function () {
            userLogoutController();
            userMenu.classList.add("clicked");
            let userSubMenu = getById("userSubMenu");
            userSubMenu.style.display = "block";
            setTimeout(function () {
                userSubMenu.style.display = "none";
                userMenu.classList.remove("clicked")
            }, 5000);

            let logOutBtn = getById("logOutBtn");
            logOutBtn.addEventListener("click", function () {
                userStorage.logout();
                enterButton.style.display = "block";
                let icons = document.querySelectorAll(".registration>.afterRegistration>a");
                icons.forEach(el => el.style.display = "none");
                userSubMenu.style.display = "none";
                let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
                favouriteIcon.forEach(el => el.classList.remove("liked"));
            })
        });

        let showFavouritesBtn = getById("showFavouritesBtn");
        showFavouritesBtn.addEventListener("click", showMyFavourites);

        // showMyFavourites();
    }

    // Update favourites page with favourites products
    function showMyFavourites() {
        likeItem();
        window.scrollTo(0, 0);
        let user = userStorage.currentUser[0].email;
        favouritesClothesController(JSON.parse(localStorage.getItem(user)));
        let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
        favouriteIcon.forEach(el => {
            if (userStorage.myFavourites.some(item => item.id == el.getAttribute("productId"))) {
                el.classList.add("liked");
            }
        });

        let buttons = Array.from(document.getElementsByClassName("product-photos"));
        buttons.forEach(function (currentBtn) {
            currentBtn.addEventListener('click', selectProduct)
        });

        let productImages = Array.from(document.getElementsByClassName("product-img"));
        productImages.forEach(img => changeImgOnHover(img));

        moveToBasket();
        updateDesires();

    }

    // On click add to shopping bag
    function moveToBasket() {
        let wantedProduct = document.querySelectorAll(".add-button");
        userStorage.init();

        wantedProduct.forEach(el => el.addEventListener("click", function (e) {
            if (userStorage.isLogged == true) {
                let currentItem = siteManager.allProducts.filter(el => el.id === Number(e.target.value));

                if (userStorage.myDesiredProd.filter(function (elem) { return elem.id === currentItem[0].id }).length > 0) {
                    userStorage.removeFromDesired(currentItem[0]);
                    e.target.innerHTML = "Добавете";
                    e.target.classList.remove("clicked");
                    counter = userStorage.myDesiredProd.length;
                    desiredCounter.innerHTML = counter;
                    userStorage.myDesiredCounter = counter;
                    updateDesiredCounter();
                } else {
                    userStorage.addToDesired(currentItem[0]);
                    e.target.innerHTML = "Добавено";
                    e.target.classList.add("clicked");
                    counter = userStorage.myDesiredProd.length;
                    desiredCounter.innerHTML = counter;
                    userStorage.myDesiredCounter = counter;
                    updateDesiredCounter();
                }
            } 
        }));
    }

    //On click show the shopping-bag
    function showBasketInfo(e) {
        e.preventDefault();
        let basket = getById("shopping-cart-content");
        basket.classList.toggle("show");

        if (userStorage.myDesiredCounter <= 0){
            getById("emptyBag").style.display = "block";
        } else if (userStorage.myDesiredCounter > 0) {
            getById("emptyBag").style.display = "none";
            getById("fullBag").style.display = "block";
            shoppingBagController(userStorage.myDesiredProd);
        }
    }

})();
