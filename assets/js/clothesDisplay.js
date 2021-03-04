//show sort list on hover
let sorterIcon = document.getElementById('sorterIcon');
let dropdownSort = document.getElementById('dropdown-sort');

sorterIcon.addEventListener('mouseover', function () {
    dropdownSort.style.display = 'block';
});

sorterIcon.addEventListener('mouseout', function () {
    dropdownSort.style.display = 'none';
});

//display women's clothes

const womenClothesController = function (products) {
    let containerClothesDisplay = document.getElementById('display');

    let source = document.getElementById('womenClothesDisplay-template').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(products);
    containerClothesDisplay.innerHTML = html;
}

//display men's clothes

const menClothesController = function (products) {
    let containerClothesDisplay = document.getElementById('display');

    let source = document.getElementById('menClothesDisplay-template').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(products);
    containerClothesDisplay.innerHTML = html;
}


//display filtered products
const filteredClothesController = function (products) {
    let containerClothesDisplay = getById('display');
    products.forEach(el => el.newPrice = getNewPrice(el.price, el.discount));
    let filteredprod = { 'filteredProducts': products};

    let source = document.getElementById('filteredClothesDisplayTempl').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(filteredprod);
    containerClothesDisplay.innerHTML = html;
}