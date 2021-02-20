const brandsController = function () {
    // Controller
    const source = document.getElementById("brandsTempl").innerHTML;
    const template = Handlebars.compile(source);
    const html1 = template(brands);
    const html2 = template(brandsHidden);

    let container = document.getElementById("brands");
    let container2 = document.getElementById("brands-hidden");
    container.innerHTML = html1;
    container2.innerHTML = html2;
};