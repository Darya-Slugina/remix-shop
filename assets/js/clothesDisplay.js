//show sort list on hover
let sorterIcon = document.getElementById('sorterIcon');
let dropdownSort = document.getElementById('dropdown-sort');

sorterIcon.addEventListener('mouseover', function () {
    dropdownSort.style.display = 'block';
});

sorterIcon.addEventListener('mouseout', function () {
    dropdownSort.style.display = 'none';
});

// event listeners for sort buttons

function sortByPriceAsc(){
//    take into account which display is on - women or men
}

function sortByPriceDesc(){

}

//display women's clothes

const womenClothesController = function (products) {
    let containerClothesDisplay = document.getElementById('display');
    products.femaleClothes.forEach(el => el.newPrice = getNewPrice(el.price, el.discount));
    let source = document.getElementById('womenClothesDisplay-template').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(products);
    containerClothesDisplay.innerHTML = html;
}

//display men's clothes

const menClothesController = function (products) {
    let containerClothesDisplay = document.getElementById('display');
    products.maleClothes.forEach(el => el.newPrice = getNewPrice(el.price, el.discount));
    let source = document.getElementById('menClothesDisplay-template').innerHTML;
    let template = Handlebars.compile(source);

    let html = template(products);
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
    if(products.length > 0) {
        containerClothesDisplay.innerHTML = html;
    } else {
        containerClothesDisplay.innerHTML =  `<span class="empty-favorites">Добавяйте продукти в "Любими" и следете
        цената им и колко харесвания имат, за да прецените кога да ги купите преди всички
        останали.</span>`;
    }


}

