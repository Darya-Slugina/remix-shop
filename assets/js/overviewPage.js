// // Select current product
function selectProduct() {
    let productId = JSON.parse(localStorage.getItem('productId'));
    product = siteManager.allProducts.find(el => el.id === Number(productId));
    productController();

    // let items = Array.from(document.getElementsByClassName("img-fluid"));
    // items.forEach(function (currentImg) {
    //     currentImg.addEventListener("click", changeImg);
    // });

    // let nav = Array.from(document.getElementsByClassName("nav-item"));
    // nav.forEach(function (currentBtn) {
    //     currentBtn.addEventListener("click", changeInfo);
    // });
    moveToBasketFromOverView();
    likeItemFromOverView();
    goBack();
    // loadEvents();
    window.scrollTo(0, 0);
}


// On click add to shopping bag from OverView page
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

// On click like the item on OverView page
function likeItemFromOverView() {
    let currentUser = userStorage.getCurrentUser();
    if (currentUser) {
        let favouriteIcon = getById("favIcon");

        favouriteIcon.addEventListener("click", function (e) {
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

                // updatefavouriteCounter();
            }
        });
    }
}

//Go back on the previous page 
function goBack() {
    let backButton = getById("goBack");
    backButton.addEventListener("click", function (e) {
        e.preventDefault();
        history.go(-1);
    })
}


function eventsAfterLoading(){
    let items = Array.from(document.getElementsByClassName("img-fluid"));
console.log("items", items);
items.forEach(function (currentImg) {
    currentImg.addEventListener("click", changeImg);
});

let nav = Array.from(document.getElementsByClassName("nav-item"));
nav.forEach(function (currentBtn) {
    currentBtn.addEventListener("click", changeInfo);
});
}

//Change big img on overViewPage on click
function changeImg(e) {
    console.log("mainImg", mainImg)
    mainImg.src = e.target.src;
}


// Show the current tab in overView page
function changeInfo(e) {
    e.preventDefault();

    let tab = Array.from(document.getElementsByClassName("nav-link"));
    tab.forEach(el => el.classList.remove("activeTab"));

    e.target.parentElement.classList.add("activeTab");
    e.target.classList.add("activeTab");



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