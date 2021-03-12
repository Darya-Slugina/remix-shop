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
    let finalBreadcrumbTarget = getById('final-breadcrumb-target');
    let allBreadcrumbTarget = getById('all-breadcrumb-target');


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
    const navListMain = Array.from(document.querySelector('.navigation-list').children);
    const allFilters = Array.from(document.querySelectorAll('.main-category'));
    const womenBtn = getById('womenBtn');
    const menBtn = getById('menBtn');
    let wholePage;

    function onHashChange() {
        let page = location.hash.slice(1);
        let slashLocation = page.indexOf('/') + 1;
        let extension = location.hash.slice(slashLocation);
        let allPages = document.querySelector('main').children;

        if (slashLocation > 1) {
            wholePage = location.hash.slice(1, slashLocation);
        } else {
            wholePage = page;
        }

        for (let i = 0; i < allPages.length; i++) {
            if (allPages[i].id === wholePage) {
                allPages[i].style.display = 'block';
            } else if (wholePage === 'home' || wholePage === '') {
                allPages[i].style.display = 'none';
                homePage.style.display = 'block';
                navListMain.forEach(nav => nav.classList.remove('selectedNav'));
                allFilters.forEach(el => el.classList.remove("selectedFilter"));
            } else {
                allPages[i].style.display = 'none';
            }

            if (page === 'favourites') {
                showMyFavourites();
            }
        }
        moveToBasket();

        if (extension === '/women') {
            womenBtn.classList.add("selectedFilter");
            menBtn.classList.remove('selectedFilter');
            displayClothes(siteManager.femaleClothes);
            getFilterOptions(siteManager.femaleClothes);
            // event listeners for sort buttons
            sortByPriceAscBtn.addEventListener('click', function (ev) {
                ev.preventDefault();
                siteManager.femaleClothes.sort((a, b) => (a.price - b.price));
                displayClothes(siteManager.femaleClothes);
                let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
                productImages.forEach(img => changeImgOnHover(img));
            });
            sortByPriceDescBtn.addEventListener('click', function (ev) {
                ev.preventDefault();
                siteManager.femaleClothes.sort((a, b) => (b.price - a.price));
                displayClothes(siteManager.femaleClothes);
                let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
                productImages.forEach(img => changeImgOnHover(img));
            });

            finalBreadcrumbTarget.innerHTML = 'Дамски дрехи';
            finalBreadcrumbTarget.href = '#allProducts/women';
            allBreadcrumbTarget.addEventListener('click', function (ev) {
                ev.preventDefault();
                displayClothes(siteManager.femaleClothes);
                let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
                productImages.forEach(img => changeImgOnHover(img));
                // clear checked filters
            })

        } else if (extension === '/men') {
            womenBtn.classList.remove('selectedFilter');
            menBtn.classList.add("selectedFilter");
            displayClothes(siteManager.maleClothes);
            getFilterOptions(siteManager.maleClothes);
            // event listeners for sort buttons
            sortByPriceAscBtn.addEventListener('click', function (ev) {
                ev.preventDefault();
                siteManager.maleClothes.sort((a, b) => (a.price - b.price));
                displayClothes(siteManager.maleClothes);
                let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
                productImages.forEach(img => changeImgOnHover(img));
            });
            sortByPriceDescBtn.addEventListener('click', function (ev) {
                ev.preventDefault();
                siteManager.maleClothes.sort((a, b) => (b.price - a.price));
                displayClothes(siteManager.maleClothes);
                let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
                productImages.forEach(img => changeImgOnHover(img));
            });

            finalBreadcrumbTarget.innerHTML = 'Мъжки дрехи';
            finalBreadcrumbTarget.href = '#allProducts/men';
            allBreadcrumbTarget.addEventListener('click', function (ev) {
                ev.preventDefault();
                displayClothes(siteManager.maleClothes);
                let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
                productImages.forEach(img => changeImgOnHover(img));
                // clear checked filters
            })
        } else {
            womenBtn.classList.remove('selectedFilter');
            menBtn.classList.remove('selectedFilter');
        }

        // change nav style
        navListMain.forEach(el => {
            if (el.id === wholePage) {
                el.classList.add('selectedNav');
            } else {
                el.classList.remove('selectedNav');
            }
        })

    }

    // event listeners for brand, size, condition button filters - initialize them here first!

    //change filter style on click
    allFilters.forEach(function (currentFilter) {
        currentFilter.addEventListener('click', selectFilter)
    })

    function selectFilter(ev) {
        ev.preventDefault();
        allFilters.forEach(filter => filter.classList.remove('selectedFilter'));
        ev.target.parentElement.classList.add("selectedFilter");
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
        let currentUser = userStorage.getCurrentUser();
        if (currentUser) {
            loginForm.classList.remove("show");
            enterButton.style.display = "none";
            let icons = document.querySelectorAll(".registration>.afterRegistration>a");
            icons.forEach(el => el.style.display = "block");
        }
    }

    bannersController();
    brandsController();
    blogController();

    //Search by name
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

    // select female clothes
    womenBtn.addEventListener('click', function () {
        displayClothes(siteManager.femaleClothes);
        window.location.href = '#allProducts/women';

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
    menBtn.addEventListener('click', function () {
        womenBtn.classList.remove("selectedFilter");
        window.location.href = '#allProducts/men';
        displayClothes(siteManager.maleClothes)

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
        if (product !== null) {
            updateLikes();
            moveToBasketFromOverView();
            likeItemFromOverView();
        }

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
        let currentUser = userStorage.getCurrentUser();
        if (currentUser) {
            let counter = currentUser.myFavouritesCount;

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
    }

    //Desired items counter
    function updateDesiredCounter() {
        let currentUser = userStorage.getCurrentUser();


        if (currentUser) {
            let counter = currentUser.myDesiredCounter;


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
    }

    // On click like the item
    function likeItem() {
        let currentUser = userStorage.getCurrentUser();
        if (currentUser) {
            let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));

            favouriteIcon.forEach(el => el.addEventListener("click", function (e) {
                let currentUser = userStorage.getCurrentUser();
                if (currentUser.isLoggedIn) {
                    let currentItem = siteManager.allProducts.filter(el => el.id === Number(e.target.previousElementSibling.value));

                    if (currentUser.myFavourites.filter(elem => elem.id === currentItem[0].id).length > 0) {
                        userStorage.removeFromFavourite(currentItem[0]);
                        e.target.classList.remove("liked");
                        counter = JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true)[0].myFavourites.length;
                        favoritesCounter.innerHTML = counter;
                        currentUser.myFavouritesCount = counter;
                    } else {
                        userStorage.addToFavourite(currentItem[0]);
                        e.target.classList.add("liked");
                        counter = JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true)[0].myFavourites.length;
                        favoritesCounter.innerHTML = counter;
                        currentUser.myFavouritesCount = counter;
                    }

                    updatefavouriteCounter();
                }
            }));
        }
    }

    function likeItemFromOverView() {
        let currentUser = userStorage.getCurrentUser();
        if (currentUser) {
            let favouriteIcon = getById("favIcon");

            favouriteIcon.addEventListener("click", function (e) {
                let currentUser = userStorage.getCurrentUser();
                if (currentUser.isLoggedIn) {
                    let currentItem = siteManager.allProducts.filter(el => el.id === Number(e.target.previousElementSibling.value));
                    console.log(currentItem);

                    if (currentUser.myFavourites.filter(elem => elem.id === currentItem[0].id).length > 0) {
                        userStorage.removeFromFavourite(currentItem[0]);
                        e.target.classList.remove("liked");
                        counter = JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true)[0].myFavourites.length;
                        favoritesCounter.innerHTML = counter;
                        currentUser.myFavouritesCount = counter;
                    } else {
                        userStorage.addToFavourite(currentItem[0]);
                        e.target.classList.add("liked");
                        counter = JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true)[0].myFavourites.length;
                        favoritesCounter.innerHTML = counter;
                        currentUser.myFavouritesCount = counter;
                    }

                    updatefavouriteCounter();
                }
            });
        }
    }

    // Check if item in favourites and put current styles
    function updateLikes() {
        let currentUser = userStorage.getCurrentUser();
        if (currentUser) {
            let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
            if (favouriteIcon.length > 0) {
                favouriteIcon.forEach(el => {
                    if (currentUser.myFavourites.some(item => item.id == el.getAttribute("productId"))) {
                        el.classList.add("liked");
                    }
                });
            }
            let favouriteOverView = getById("favIcon");
            if (currentUser.myFavourites.some(item => item.id == favouriteOverView.getAttribute("productId"))) {
                favouriteOverView.classList.add("liked");
            }
        }
    }

    // Check if item in desired and put current styles
    function updateDesiredProd() {
        let currentUser = userStorage.getCurrentUser();
        if (currentUser) {
            let desiredBtn = document.querySelectorAll(".add-button");
            desiredBtn.forEach(el => {
                
                if (currentUser.myDesiredProd.some(item => item.id == el.value)) {
                    el.innerText = "Добавено";
                    el.classList.add("clicked");
                } else {
                    el.innerText = "Добавете";
                    el.classList.remove("clicked");
                }
            });
            let desiredBtnOverView = getById("siteBtn");

            if (desiredBtnOverView !== null) {
                if (currentUser.myDesiredProd.some(item => item.id == desiredBtnOverView.value)) {
                    desiredBtnOverView.innerText = "Добавено";
                    desiredBtnOverView.classList.add("clicked");
                } else {
                    desiredBtnOverView.innerText = "Добавете";
                    desiredBtnOverView.classList.remove("clicked");
                }
            }

        } else {
            let desiredBtn = document.querySelectorAll(".add-button");
            desiredBtn.forEach(el => {
                el.innerText = "Добавете";
                el.classList.remove("clicked");
            });
        }
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
                updateDesires();
            })
        });

        let showFavouritesBtn = getById("showFavouritesBtn");
        showFavouritesBtn.addEventListener("click", showMyFavourites);
    }

    // Update favourites page with favourites products
    function showMyFavourites() {
        window.scrollTo(0, 0);
        let currentUser = userStorage.getCurrentUser();
        let currentUserFavourites = userStorage.getCurrentUser().myFavourites;

        favouritesClothesController(currentUserFavourites);
        let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
        favouriteIcon.forEach(el => {
            if (currentUser) {
                if (currentUser.myFavourites.some(item => item.id == el.getAttribute("productId"))) {
                    el.classList.add("liked");
                }
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

        wantedProduct.forEach(el => el.addEventListener("click", function (e) {
            let currentUser = userStorage.getCurrentUser();
            if (currentUser) {
                let currentItem = siteManager.allProducts.filter(el => el.id === Number(e.target.value));

                if (currentUser.myDesiredProd.filter(elem => elem.id === currentItem[0].id).length > 0) {
                    userStorage.removeFromDesired(currentItem[0]);
                    e.target.innerHTML = "Добавете";
                    e.target.classList.remove("clicked");
                    counter = currentUser.myDesiredProd.length;
                    desiredCounter.innerHTML = counter;
                    currentUser.myDesiredCounter = counter;
                    updateDesiredCounter();
                } else {
                    userStorage.addToDesired(currentItem[0]);
                    e.target.innerHTML = "Добавено";
                    e.target.classList.add("clicked");
                    counter = currentUser.myDesiredProd.length;
                    desiredCounter.innerHTML = counter;
                    currentUser.myDesiredCounter = counter;
                    updateDesiredCounter();
                }
            }
        }));
    }

    function moveToBasketFromOverView() {
        let wantedProduct = getById("siteBtn");
        wantedProduct.addEventListener("click", function (e) {

            let currentUser = userStorage.getCurrentUser();
            if (currentUser) {
                let currentItem = siteManager.allProducts.filter(el => el.id === Number(e.target.value));
                console.log(currentItem);

                if (currentUser.myDesiredProd.filter(elem => elem.id === currentItem[0].id).length > 0) {
                    userStorage.removeFromDesired(currentItem[0]);
                    e.target.innerHTML = "Добавете";
                    e.target.classList.remove("clicked");
                    counter = currentUser.myDesiredProd.length;
                    desiredCounter.innerHTML = counter;
                    currentUser.myDesiredCounter = counter;
                    updateDesiredCounter();
                } else {
                    userStorage.addToDesired(currentItem[0]);
                    e.target.innerHTML = "Добавено";
                    e.target.classList.add("clicked");
                    counter = currentUser.myDesiredProd.length;
                    desiredCounter.innerHTML = counter;
                    currentUser.myDesiredCounter = counter;
                    updateDesiredCounter();
                }
            }
        });
    }

    //On click show the shopping-bag
    function showBasketInfo(e) {
        e.preventDefault();
        let currentUser = userStorage.getCurrentUser();
        let basket = getById("shopping-cart-content");
        basket.classList.toggle("show");

        if (currentUser.myDesiredCounter <= 0) {
            getById("emptyBag").style.display = "block";
        } else if (currentUser.myDesiredCounter > 0) {
            getById("emptyBag").style.display = "none";
            getById("fullBag").style.display = "block";
            shoppingBagController(currentUser.myDesiredProd);
            addEventForDeleting();
        }
    }

    function addEventForDeleting() {
        let deleteBtn = document.querySelectorAll(".delete");

        deleteBtn.forEach(el => el.addEventListener("click", function (e) {
            updateBasket(Number(e.target.title));

            let products = JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true)[0].myDesiredProd;
            shoppingBagController(products);
            addEventForDeleting();
        }))
    }

    function updateBasket(num) {
        userStorage.removeFromDesired(num);
        updateDesires();
    }
})();
