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