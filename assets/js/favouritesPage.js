// Update favourites page with favourites products
function showMyFavourites() {
    window.scrollTo(0, 0);

    let currentUserFavourites = userStorage.getCurrentUser().myFavourites;
    favouritesClothesController(currentUserFavourites);


    let buttons = Array.from(document.getElementsByClassName("product-photos"));
    buttons.forEach(function (currentBtn) {
        currentBtn.addEventListener('click', function (ev) {
            console.log(111, ev.target.previousElementSibling.value);
            localStorage.setItem('productId', JSON.stringify(ev.target.previousElementSibling.value));
            location.hash = '#overView';
        });
    });

    let productImages = Array.from(document.getElementsByClassName("product-img"));
    productImages.forEach(img => changeImgOnHover(img));

    moveToBasket();
    likeItem();
    updateDesires();
    updateFavourites();
}