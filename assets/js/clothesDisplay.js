//show sort list on hover
let sortDropdownWrapper = getById('sort');
let dropdownSort = getById('dropdown-sort');
let sortByPriceAscBtn = getById('sortByPriceAscBtn');
let sortByPriceDescBtn = getById('sortByPriceDescBtn');

sortDropdownWrapper.addEventListener('mouseover', function () {
    dropdownSort.style.display = 'block';
});

sortDropdownWrapper.addEventListener('mouseout', function () {
    dropdownSort.style.display = 'none';
});

// show corresponding filter list on hover
// brands
let brandsFilterWrapper = getById('brandsFilterWrapper');
let brandsFilterBox = getById('brandsFilterBox');
brandsFilterWrapper.addEventListener('mouseover', function () {
    displayElement(brandsFilterBox)
})
brandsFilterWrapper.addEventListener('mouseout', function () {
    displayNoneElement(brandsFilterBox)
})

// size
let sizeFilterWrapper = getById('sizeFilterWrapper');
let sizeFilterBox = getById('sizeFilterBox');
sizeFilterWrapper.addEventListener('mouseover', function () {
    displayElement(sizeFilterBox)
})
sizeFilterWrapper.addEventListener('mouseout', function () {
    displayNoneElement(sizeFilterBox)
})

// condition
let conditionFilterWrapper = getById('conditionFilterWrapper');
let conditionFilterBox = getById('conditionFilterBox');
conditionFilterWrapper.addEventListener('mouseover', function () {
    displayElement(conditionFilterBox)
})
conditionFilterWrapper.addEventListener('mouseout', function () {
    displayNoneElement(conditionFilterBox)
})

// price
let priceFilterWrapper = getById('priceFilterWrapper');
let priceFilterBox = getById('priceFilterBox');
priceFilterWrapper.addEventListener('mouseover', function () {
    displayElement(priceFilterBox)
})
priceFilterWrapper.addEventListener('mouseout', function () {
    displayNoneElement(priceFilterBox)
})

let allPriceBoxes = Array.from(document.querySelectorAll('#priceFilterBox input'));

allPriceBoxes.forEach(box => {
    box.addEventListener('change', function (ev) {
        ev.preventDefault();
        // let id = ev.target.id;
        if (ev.target.classList.contains('checked')) {
            ev.target.classList.remove('checked');
        } else {
            ev.target.classList.add('checked');
        }
    })
})

// fill filter list with data
function getFilterOptions(data) {
    function getSizeOptions(data) {
        let allSizeOptions = data.map(el => el.size);
        let uniqueSizeOptions = allSizeOptions.filter(onlyUnique);
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
        brandsFilterBox.innerHTML = '';
        uniqueBrandoptions.forEach(brand => createBrandHTML(brand, data));
    }

    getSizeOptions(data);
    getConditionOptions(data);
    getBrandsOptions(data);
}

function createSizeHTML(size, data) {
    let sizeBox = document.createElement('button');
    sizeBox.innerText = size;
    sizeBox.id = 'sizeBox' + size;
    sizeBox.classList.add('sizeFilterBtn');
    sizeFilterBox.append(sizeBox);

    //move to index, so it has access to changeImgOnHover
    sizeBox.addEventListener('click', function (ev) {
        ev.preventDefault();
        // let id = ev.target.id;
        if (ev.target.classList.contains('checkedSize')) {
            ev.target.classList.remove('checkedSize');
        } else {
            ev.target.classList.add('checkedSize');
        }
        displayByFilters(data);
    })
}

function createConditionHTML(condition, data) {
    let conditionWrapper = document.createElement('div');
    conditionWrapper.classList.add('conditionFilterBtn');

    let conditionBox = document.createElement('input');
    conditionBox.type = 'checkbox';
    conditionBox.id = 'checkbox' + condition;

    let conditionLabel = document.createElement('label');
    conditionLabel.for = conditionBox.id;
    conditionLabel.innerText = condition;

    conditionWrapper.append(conditionBox, conditionLabel);
    conditionFilterBox.append(conditionWrapper);

    //move to index, so it has access to changeImgOnHover
    conditionBox.addEventListener('change', function (ev) {
        ev.preventDefault();
        let target = ev.target;
        if (target.classList.contains('checkedCondition')) {
            target.classList.remove('checkedCondition');
        } else {
            target.classList.add('checkedCondition');
        }
        displayByFilters(data)
    })
}

function createBrandHTML(brand, data) {
    let brandWrapper = document.createElement('div');
    brandWrapper.classList.add('brandFilterBtn');

    let brandBox = document.createElement('input');
    brandBox.type = 'checkbox';
    brandBox.id = 'checkbox' + brand;

    let brandLabel = document.createElement('label');
    brandLabel.for = brandBox.id;
    brandLabel.innerText = brand;

    brandWrapper.append(brandBox, brandLabel);
    brandsFilterBox.append(brandWrapper);

    //move to index, so it has access to changeImgOnHover
    brandBox.addEventListener('change', function (ev) {
        ev.preventDefault();
        let target = ev.target;
        if (target.classList.contains('checkedBrand')) {
            target.classList.remove('checkedBrand');
        } else {
            target.classList.add('checkedBrand');
        }
        displayByFilters(data);
        let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
        productImages.forEach(img => changeImgOnHover(img));
    })
}

function displayByFilters(data) {
    let perfectItem = {};

    let allCheckedSizes = Array.from(document.querySelectorAll('.checkedSize'));
    let allCheckedSizesValues = allCheckedSizes.map(btn => btn.innerText);

    let allCheckedConditions = Array.from(document.querySelectorAll('.checkedCondition~label'));
    let allCheckedConditionsValues = allCheckedConditions.map(label => label.outerText);

    let allCheckedBrands = Array.from(document.querySelectorAll('.checkedBrand~label'));
    let allCheckedBrandsValues = allCheckedBrands.map(label => label.outerText);

    if (allCheckedSizesValues) {
        allCheckedSizesValues.forEach(size => {
            perfectItem.size = size;
        })
    }

    if (allCheckedConditionsValues) {
        allCheckedConditionsValues.forEach(condition => {
            perfectItem.condition = condition;
        })
    }

    if (allCheckedBrandsValues) {
        allCheckedBrandsValues.forEach(brand => {
            perfectItem.brand = brand;
        })
    }

    let dataToDisplay = data.filter(item => {
        let filter = item;
        returnValue = Object.keys(perfectItem).forEach(key => {
            if (item[key] !== perfectItem[key]) {
                filter = false;
            }
        })
        return filter;
    })
    displayClothes(dataToDisplay);
}

// display clothes
const displayClothes = function (data) {
    let containerClothesDisplay = document.getElementById('display');
    data.forEach(el => el.newPrice = getNewPrice(el.price, el.discount));

    let source = getById('clothesDisplay-template').innerHTML;
    let template = Handlebars.compile(source);
    let html = template(data);
    containerClothesDisplay.innerHTML = html;
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

