
sortDropdownWrapper.addEventListener('mouseover', function () {
    dropdownSort.style.display = 'block';
});

sortDropdownWrapper.addEventListener('mouseout', function () {
    dropdownSort.style.display = 'none';
});

brandsFilterWrapper.addEventListener('mouseover', function () {
    displayElement(brandsFilterBox)
})
brandsFilterWrapper.addEventListener('mouseout', function () {
    displayNoneElement(brandsFilterBox)
})


sizeFilterWrapper.addEventListener('mouseover', function () {
    displayElement(sizeFilterBox)
})
sizeFilterWrapper.addEventListener('mouseout', function () {
    displayNoneElement(sizeFilterBox)
})


conditionFilterWrapper.addEventListener('mouseover', function () {
    displayElement(conditionFilterBox)
})
conditionFilterWrapper.addEventListener('mouseout', function () {
    displayNoneElement(conditionFilterBox)
})


priceFilterWrapper.addEventListener('mouseover', function () {
    displayElement(priceFilterBox)
})
priceFilterWrapper.addEventListener('mouseout', function () {
    displayNoneElement(priceFilterBox)
})

let allPriceBoxes = document.querySelectorAll('.priceCheckbox');

// fill filter list with data
function getFilterOptions(data) {

    function getSizeOptions(data) {
        let allSizeOptions = data.map(el => el.size);
        let uniqueSizeOptions = allSizeOptions.filter(onlyUnique);
        sortSizes(uniqueSizeOptions);
        sizeFilterBox.innerHTML = '';
        uniqueSizeOptions.forEach(size => createSizeHTML(size, data));
    }

    function getConditionOptions(data) {
        let allConditionOptions = data.map(el => el.condition);
        let uniqueConditionOptions = allConditionOptions.filter(onlyUnique);
        conditionFilterBox.innerHTML = '';
        uniqueConditionOptions.forEach(condition => createConditionHTML(condition, data));
    }

    function getBrandsOptions(data) {
        let allBrandOptions = data.map(el => el.brand);
        let uniqueBrandoptions = allBrandOptions.filter(onlyUnique);
        allBrands.innerHTML = '';
        uniqueBrandoptions.forEach(brand => createBrandHTML(brand, data));
    }

    getSizeOptions(data);
    getConditionOptions(data);
    getBrandsOptions(data);
}

// Size filters
function createSizeHTML(size) {
    let sizeBox = document.createElement('button');
    sizeBox.innerText = size;
    sizeBox.id = 'sizeBox' + size;
    sizeBox.classList.add('sizeFilterBtn');
    sizeFilterBox.append(sizeBox);

    sizeBox.addEventListener('click', function (ev) {
        ev.preventDefault();

        let elements = ev.target.parentNode.childNodes;
        elements.forEach(() => {
            ev.target.classList.toggle("checkedSize");

            let allCheckedSizes = Array.from(document.querySelectorAll('.checkedSize'));
            let allCheckedSizesValues = allCheckedSizes.map(btn => btn.innerText);

            // Update the filters in the Model
            siteManager.updateSizes(allCheckedSizesValues);

            // Print on the screen all filtered items
            displayClothes(siteManager.filteredItems);
        })
    })
}

// Condition filters
function createConditionHTML(condition) {
    let conditionWrapper = document.createElement('div');
    conditionWrapper.classList.add('conditionFilterBtn');

    let conditionBox = document.createElement('input');
    conditionBox.type = 'checkbox';
    conditionBox.id = 'checkbox' + condition;

    let conditionLabel = document.createElement('label');
    conditionLabel.htmlFor = conditionBox.id;
    conditionLabel.innerText = condition;

    conditionWrapper.append(conditionBox, conditionLabel);
    conditionFilterBox.append(conditionWrapper);

    conditionBox.addEventListener('change', function (ev) {
        ev.preventDefault();
        let target = ev.target;
        if (target.classList.contains('checkedCondition')) {
            target.classList.remove('checkedCondition');
        } else {
            target.classList.add('checkedCondition');
        }

        let allCheckedConditions = Array.from(document.querySelectorAll('.checkedCondition~label'));
        let allCheckedConditionsValues = allCheckedConditions.map(label => label.outerText);

        // Update the filters in the Model
        siteManager.updateConditions(allCheckedConditionsValues);

        // Print on the screen all filtered items
        displayClothes(siteManager.filteredItems);
    })
}

// Brands filters
function createBrandHTML(brand) {
    let brandWrapper = document.createElement('div');
    brandWrapper.classList.add('brandFilterBtn');

    let brandBox = document.createElement('input');
    brandBox.type = 'checkbox';
    brandBox.id = 'checkbox' + brand;

    let brandLabel = document.createElement('label');
    brandLabel.htmlFor = brandBox.id;
    brandLabel.innerText = brand;

    brandWrapper.append(brandBox, brandLabel);
    allBrands.append(brandWrapper);

    brandBox.addEventListener('change', function (ev) {
        ev.preventDefault();
        let target = ev.target;
        if (target.classList.contains('checkedBrand')) {
            target.classList.remove('checkedBrand');
        } else {
            target.classList.add('checkedBrand');
        }

        let allCheckedBrands = Array.from(document.querySelectorAll('.checkedBrand~label'));
        let allCheckedBrandsValues = allCheckedBrands.map(label => label.outerText);

        siteManager.updateBrands(allCheckedBrandsValues);

        // Print on the screen all filtered items
        displayClothes(siteManager.filteredItems);
    })
}

// On click add event on price options
function eventOnPriceBox() {

    let filterOptions = document.querySelectorAll(".priceCheckbox");

    filterOptions.forEach(box => {
        box.addEventListener('change', function (ev) {
            ev.preventDefault();

            if (ev.target.classList.contains('checked')) {
                ev.target.classList.remove('checked');
            } else {
                ev.target.classList.add('checked');
            }

            let allCheckedPrices = Array.from(document.querySelectorAll('.checked'));
            let allCheckedPricesValues = allCheckedPrices.map(label => label.id);
            siteManager.updatePrices(allCheckedPricesValues);

            // Print on the screen all filtered items
            displayClothes(siteManager.filteredItems);
        });
    });
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
        if (location.hash === "#overView") {
            let favouriteOverView = getById("favIcon");
            if (currentUser.myFavourites.some(item => item.id == favouriteOverView.getAttribute("productId"))) {
                favouriteOverView.classList.add("liked");
            }
        }
    } else {
        let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
        favouriteIcon.forEach(el => el.classList.remove("liked"));
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


// display clothes
const displayClothes = function (data) {
    let containerClothesDisplay = document.getElementById('display');
    data.forEach(el => el.newPrice = getNewPrice(el.price, el.discount));

    let source = getById('clothesDisplay-template').innerHTML;
    let template = Handlebars.compile(source);
    let html = template(data);
    containerClothesDisplay.innerHTML = html;

    if (!data.length) {
        let div = document.createElement("div");
        div.classList.add("filterErrorMsg");
        let img = document.createElement("img");
        img.src = "./assets/images/error-on-filtering.png";
        img.alt = "error message";
        div.append(img);
        containerClothesDisplay.append(div);
    }

    // Add event listener
    moveToBasket();
    likeItem();
    updateFavourites();
    updateDesires();


    // Add hover effect
    let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
    productImages.forEach(img => changeImgOnHover(img));

    //event for showing the product on overView
    let buttons = Array.from(document.getElementsByClassName("product-img"));
    buttons.forEach(function (currentBtn) {
        currentBtn.addEventListener('click', function (ev) {
            localStorage.setItem('productId', JSON.stringify(ev.target.previousElementSibling.value));
            location.hash = '#overView';
        })
    });
}


//display filtered products
const filteredClothesController = function (products) {
    let containerClothesDisplay = getById('display');
    products.forEach(el => el.newPrice = getNewPrice(el.price, el.discount));
    let filteredProd = { 'filteredProducts': products };

    let source = document.getElementById('filteredClothesDisplayTempl').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(filteredProd);
    containerClothesDisplay.innerHTML = html;
}

//display favourites products on favourites page
const favouritesClothesController = function (products) {

    let containerClothesDisplay = getById('favouritesListContent');
    let favouritesProd = { 'favouritesProducts': products };

    let source = document.getElementById('favouritesTempl').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(favouritesProd);
    if (products.length > 0) {
        containerClothesDisplay.innerHTML = html;
    } else {
        containerClothesDisplay.innerHTML = `<span class="empty-favorites">Добавяйте продукти в "Любими" и следете
        цената им и колко харесвания имат, за да прецените кога да ги купите преди всички
        останали.</span>`;
    }


}