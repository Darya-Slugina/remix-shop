let product = {};

const productController = function () {

    product.new = isNewProduct(product.condition);
    product.likeNew = isLikeNewProduct(product.condition);
    product.noLabel = isNoLabelProduct(product.condition);
    product.good = isGoodProduct(product.condition);
    product.newPrice = getNewPrice(product.price, product.discount);
    product.femail = isFemail();
    const source = document.getElementById("overViewTempl").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(product);

    let container = document.getElementById("overViewContainer");
    container.innerHTML = html;   

    const source1 = document.getElementById("overViewNavigationTempl").innerHTML;
    const template1 = Handlebars.compile(source1);
    const html1 = template1(product);

    let container1 = document.getElementById("customWay");
    container1.innerHTML = html1; 
};