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
        uniqueSizeOptions.forEach(size => createSizeHTML(size));
    }

    function getConditionOptions(data) {
        let allConditionOptions = data.map(el => el.condition);
        let uniqueConditionOptions = allConditionOptions.filter(onlyUnique);
        conditionFilterBox.innerHTML = '';
        uniqueConditionOptions.forEach(condition => createConditionHTML(condition));
    }

    function getBrandsOptions(data) {
        let allBrandOptions = data.map(el => el.brand);
        let uniqueBrandoptions = allBrandOptions.filter(onlyUnique);
        brandsFilterBox.innerHTML = '';
        uniqueBrandoptions.forEach(brand => createBrandHTML(brand, data));
    }


    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    getSizeOptions(data);
    getConditionOptions(data);
    getBrandsOptions(data);
}

function createSizeHTML(type) {
    let sizeBox = document.createElement('button');
    sizeBox.innerText = type;
    sizeBox.id = 'sizeBox' + type;
    sizeBox.classList.add('sizeFilterBtn');
    sizeFilterBox.append(sizeBox);

    sizeBox.addEventListener('click', function (ev) {
        ev.preventDefault();
        // let id = ev.target.id;
        if (ev.target.classList.contains('checked')) {
            ev.target.classList.remove('checked');
        } else {
            ev.target.classList.add('checked');
        }
    })
}

function createConditionHTML(condition) {
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

    conditionBox.addEventListener('change', function (ev) {
        ev.preventDefault();
        // let id = ev.target.id;
        if (ev.target.classList.contains('checked')) {
            ev.target.classList.remove('checked');
        } else {
            ev.target.classList.add('checked');
        }
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

    brandBox.addEventListener('change', function (ev) {
        ev.preventDefault();
        let target = ev.target;
        if (target.classList.contains('checked')) {
            target.classList.remove('checked');
        } else {
            target.classList.add('checked');
            displayByBrand(data, target);
        }
    })
}


function displayByBrand(data, target) {
    let dataToDisplay = data.filter();
    
}


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

