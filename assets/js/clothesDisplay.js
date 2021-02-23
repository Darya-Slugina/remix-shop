//show sort list on hover
let sorterIcon = document.getElementById('sorterIcon');
let dropdownSort = document.getElementById('dropdown-sort');

sorterIcon.addEventListener('mouseover', function () {
    dropdownSort.style.display = 'block';
});

sorterIcon.addEventListener('mouseout', function () {
    dropdownSort.style.display = 'none';
});


//display clothes 
const clothesController = function (products) {
    let containerClothesDisplay = document.getElementById('display');

    let source = document.getElementById('clothesDisplay-template').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(products);
    containerClothesDisplay.innerHTML = html;
}

