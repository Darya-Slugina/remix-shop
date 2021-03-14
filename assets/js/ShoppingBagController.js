const shoppingBagController = function (products) {

    let oldSum = (products.reduce((acc, el) => acc + Number(el.price), 0)).toFixed(2);
    let newSum = (products.reduce((acc, el) => acc + Number(el.newPrice), 0)).toFixed(2);


    let total = {};
    total.amount = oldSum;
    total.discount = Number((newSum - oldSum).toFixed(2));
    total.sum = Number(newSum);

    products.forEach(el => el.newPrice = getNewPrice(el.price, el.discount));
    let desiredProducts = { 'desiredProducts': products };

    const source = document.getElementById("shoppingBagTempl").innerHTML;
    const source2 = document.getElementById("shoppingBagTempl2").innerHTML;

    const template = Handlebars.compile(source);
    const template2 = Handlebars.compile(source2);
    const html = template(desiredProducts);
    const html2 = template2(total);

    let container = document.getElementById("fullBag");
    let container2 = document.getElementById("cartTotal");
    container.innerHTML = html;
    container2.innerHTML = html2;
};