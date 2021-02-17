function getById(id) {
    return document.getElementById(id);
}

function getNewPrice(price, discount){
    let discNum = discount.slice(1);
    let myDisc = price * parseInt(discNum) / 100;
    let newPrice = price - myDisc;
    return newPrice.toFixed(2);
}