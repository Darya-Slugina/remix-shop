const bannersController = function () {
    // Controller
    const source = document.getElementById("bannersTempl").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(banner);
  
    let container = document.getElementById("bannerSection");
    let container2 = document.getElementById("bannerSectionAllProducts");
    container.innerHTML = html;
    container2.innerHTML = html;
  };