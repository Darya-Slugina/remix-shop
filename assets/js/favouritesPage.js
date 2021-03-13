// Update favourites page with favourites products
function showMyFavourites() {
    window.scrollTo(0, 0);
    let currentUser = userStorage.getCurrentUser();
    let currentUserFavourites = userStorage.getCurrentUser().myFavourites;

    favouritesClothesController(currentUserFavourites);
    let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
    favouriteIcon.forEach(el => {
        if (currentUser) {
            if (currentUser.myFavourites.some(item => item.id == el.getAttribute("productId"))) {
                el.classList.add("liked");
            }
        }
    });

    let buttons = Array.from(document.getElementsByClassName("product-photos"));
    buttons.forEach(function (currentBtn) {
        currentBtn.addEventListener('click', function (ev) {
            // TODO: Check what is the id;
            console.log('ID is: ', ev.target.value);
            localStorage.setItem('productId', ev.target.value);
            location.hash = '#overview';
        })
    });

    let productImages = Array.from(document.getElementsByClassName("product-img"));
    productImages.forEach(img => changeImgOnHover(img));

    moveToBasket();
    likeItem();
}