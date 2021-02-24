let product = {};

const productController = function () {
    // Controller
    const source = document.getElementById("overViewTempl").innerHTML;
    const template = Handlebars.compile(source);

    product.newPrice = getNewPrice(product.price, product.discount);
    const html = template(product);

    let container = document.getElementById("overViewContainer");
    container.innerHTML = html;    
};