function getById(id) {
    return document.getElementById(id);
}

function getNewPrice(price, discount) {
    if (hasDiscount(discount)) {
        return price;
    }
    let discNum = discount.slice(1);
    let myDisc = price * parseInt(discNum) / 100;
    let newPrice = price - myDisc;
    return newPrice.toFixed(2);
}

function hasDiscount(discount) {
    return (discount === undefined || discount === null || discount === 0 || discount === '');
}

function isOutlet(type) {
    if (type.includes("OUTLET ПРОДУКТ")) {
        return true;
    }
    return false;
}

function isNewSeason(type) {
    if (type.includes("ПРОДУКТ ОТ СЛЕДВАЩ СЕЗОН")) {
        return true;
    }
    return false;
}

function isNewProduct(condition) {
    if (condition === "Нов продукт") {
        return true;
    }
    return false;
}

function isNewProduct(condition) {
    if (condition === "Нов продукт") {
        return true;
    }
    return false;
}

function isFemail (){
    if(product.id > 20) {
        return true;
    }
    return false
}