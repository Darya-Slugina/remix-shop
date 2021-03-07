//show sort list on hover
// let sorterIcon = getById('sorterIcon');
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

// fill filter list with data

// show corresponding filter list on hover
// categories
let categoriesFilterWrapper = getById('categoriesFilterWrapper');
let categoriesFilterBox = getById('categoriesFilterBox');
categoriesFilterWrapper.addEventListener('mouseover', function () {
    displayElement(categoriesFilterBox)
})
categoriesFilterWrapper.addEventListener('mouseout', function () {
    displayNoneElement(categoriesFilterBox)
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




// Breadcrumbs links corresponding to women/men display

let finalBreadcrumbTarget = getById('final-breadcrumb-target');
let allBreadcrumbTarget = getById('all-breadcrumb-target');

//display women's clothes

const womenClothesController = function (products) {
    let containerClothesDisplay = document.getElementById('display');
    products.femaleClothes.forEach(el => el.newPrice = getNewPrice(el.price, el.discount));
    let source = document.getElementById('womenClothesDisplay-template').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(products);
    containerClothesDisplay.innerHTML = html;
    finalBreadcrumbTarget.innerHTML = 'Дамски дрехи';
    finalBreadcrumbTarget.href = '#allProducts/women';
    allBreadcrumbTarget.href = '#allProducts/women';
}

//display men's clothes

const menClothesController = function (products) {
    let containerClothesDisplay = document.getElementById('display');
    products.maleClothes.forEach(el => el.newPrice = getNewPrice(el.price, el.discount));
    let source = document.getElementById('menClothesDisplay-template').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(products);
    containerClothesDisplay.innerHTML = html;
    finalBreadcrumbTarget.innerHTML = 'Мъжки дрехи';
    finalBreadcrumbTarget.href = '#allProducts/men';
    allBreadcrumbTarget.href = '#allProducts/men';
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

