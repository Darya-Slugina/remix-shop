let slides = Array.from(Array(3), () => new Array(6));

function createCarouselList(products) {
  let counter = 0;
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 6; k++) {
      slides[j][k] = products[counter];
      counter++;
    }
  }
}

const carouselController = function () {
  // Controller
  const source = document.getElementById("carouselTempl").innerHTML;
  const template = Handlebars.compile(source);

  let obj = {
    'slidesTemplates': slides,
  };
  const html = template(obj);

  let container = document.getElementById("carouselPages");
  container.innerHTML = html;
};

// custom method for incrising the array key
Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});
