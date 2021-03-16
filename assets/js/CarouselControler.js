let slides;

function createCarouselList(products, limit) {
  slides = Array.from(Array(limit), () => new Array(numberOfPicturesInCarousel));

  let currentUser = userStorage.getCurrentUser();
  let counter = 0;
  for (let j = 0; j < limit; j++) {
    for (let k = 0; k < numberOfPicturesInCarousel; k++) {
      slides[j][k] = products[counter];
      slides[j][k].newPrice = getNewPrice(slides[j][k].price, slides[j][k].discount);
      slides[j][k].isOutlet = isOutlet(slides[j][k].type);
      slides[j][k].isNewSeason = isNewSeason(slides[j][k].type);
      if(currentUser){
        slides[j][k].isInFavourites = userStorage.isInFavourites(slides[j][k]);
      }
      counter++;
    }
  }
}

// Controller
const carouselController = function (page) {

  let divToNull = 'suggestions';
  let divToShow = 'recomend';
  if (page == "overView") {
    divToNull = 'recomend';
    divToShow = 'suggestions';
  }

  document.getElementById(divToNull + "-wrapper").innerHTML = "";
  const source = document.getElementById("carouselTempl").innerHTML;
  const template = Handlebars.compile(source);

  let obj = {
    'slidesTemplates': slides,
  };

  const html = template(obj);

  let container = document.getElementById(divToShow + "-wrapper");
  container.innerHTML = html;
};

// custom method for incrising the array key
Handlebars.registerHelper("inc", function (value) {
  return parseInt(value) + 1;
});