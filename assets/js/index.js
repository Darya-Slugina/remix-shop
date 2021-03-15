(function () {
    window.addEventListener("DOMContentLoaded", onHashChange);
    window.addEventListener("DOMContentLoaded", loadPreviousSession);
    window.addEventListener("hashchange", onHashChange);

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


    // Create the product from array
    function createProduct(item) {
        let product = new Product(
            item.gender,
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
    loginButton.addEventListener('click', loadEvents)
    registrationButton.addEventListener("click", updateFavourites);
    registrationButton.addEventListener("click", updateDesires);
    basketIcon.addEventListener("click", showBasketInfo);


    //Router
    const navListMain = Array.from(document.querySelector('.navigation-list').children);
    const allFilters = Array.from(document.querySelectorAll('.main-category'));


    function showActivePage(page) {
        let allPages = document.querySelector('main').children;

        for (let i = 0; i < allPages.length; i++) {
            allPages[i].style.display = 'none';
        }

        page.style.display = 'block';
    }


    function router() {
        let path = location.hash.slice(1);

        let firstPage = path.split('/')[0]

        switch (firstPage) {
            case '':
                location.hash = '#home';
                break;
            case 'home':
                navListMain.forEach(nav => nav.classList.remove('selectedNav'));
                allFilters.forEach(el => el.classList.remove("selectedFilter"));
                showActivePage(homePage);
                showCarousel();
                bannersController();
                brandsController();
                blogController();
                break;

            case 'allProducts':
                showActivePage(allProductsPage);
                renderAllProducts();
                bannersController();
                break;

            case 'favourites':
                showActivePage(favouritesPage);
                showMyFavourites();
                break;

            case 'overView':
                showActivePage(overviewPage);
                selectProduct();
                showCarousel();
                break;

            default:
                showActivePage(errorPage);
        }
    }


    function onHashChange() {
        router();


        // TODO: Check what needs to be done

        // // change nav style on click
        // const navListMain = Array.from(document.querySelector('.navigation-list').children);
        // navListMain.forEach(function (currentNav) {
        //     currentNav.addEventListener('click', selectPage);
        // })

        // function selectPage(ev) {
        //     ev.preventDefault();
        //     navListMain.forEach(nav => nav.classList.remove('selectedNav'))
        //     ev.target.parentElement.classList.add('selectedNav')
        // }


        // //change filter style on click
        // const allFilters = Array.from(document.querySelectorAll('.main-category'));
        // allFilters.forEach(function (currentFilter) {
        //     currentFilter.addEventListener('click', selectFilter)
        // })

        // function selectFilter(ev) {
        //     ev.preventDefault();
        //     allFilters.forEach(filter => filter.classList.remove('selectedFilter'));
        //     ev.target.parentElement.classList.add("selectedFilter");
        // }

        // change nav style

        // if (el.id === wholePage) {
        //     el.classList.add('selectedNav');
        // } else {
        //     el.classList.remove('selectedNav');
        // }
    }



    // //change filter style on click
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
        }, 2000);

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
            updateLikes();
        })
    });

    // On click show the page with favourites products
    let showFavouritesBtn = getById("showFavouritesBtn");
    showFavouritesBtn.addEventListener("click", function () {
        location.hash = "#favourites";
        showMyFavourites();
    });

    //Search by name from main header
    srchProd.addEventListener("change", function (event) {

        siteManager.updateSearchFilter(event.target.value);
        const extension = location.hash.split('/')[1];

        // Default search by women
        if (!extension) {
            location.hash = '#allProducts/women';
        } else {
            displayClothes(siteManager.filteredItems);
        }
    });

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
        hiddenBrands.classList.add("hidden-brands-show");
        showBrands.style.display = "none";
    }

    // Show more information about us section on click
    function showMoreInfo(e) {
        e.preventDefault();
        hiddenText.classList.toggle("hidden-text-show");
        hiddenButton.classList.toggle("reverse");
    }


    // select female clothes
    womenBtn.addEventListener('click', function () {
        window.location.href = '#allProducts/women';
    })

    // select male clothes
    menBtn.addEventListener('click', function () {
        womenBtn.classList.remove("selectedFilter");
        window.location.href = '#allProducts/men';
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

    // Events after carousel loading
    function loadEvents() {

        likeItem();
        moveToBasket();
        updatefavouriteCounter();
        updateDesiredCounter();
        updateDesiredProd();

        let productImages = Array.from(document.getElementsByClassName("product-img"));
        productImages.forEach(img => changeImgOnHover(img));

        let buttons = Array.from(document.getElementsByClassName("product-img"));
        buttons.forEach(function (currentBtn) {
            currentBtn.addEventListener('click', function (ev) {
                localStorage.setItem('productId', JSON.stringify(ev.target.previousElementSibling.value));
                location.hash = '#overview';
            })
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

    // On X click delete from shopping-bag
    function addEventForDeleting() {
        let deleteBtn = document.querySelectorAll(".delete");

        deleteBtn.forEach(el => el.addEventListener("click", function (e) {
            updateBasket(Number(e.target.title));

            let products = JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true)[0].myDesiredProd;
            shoppingBagController(products);
            addEventForDeleting();
        }))
    }

    // Update items in the basket
    function updateBasket(num) {
        userStorage.removeFromDesired(num);
        updateDesires();
    }
})();
