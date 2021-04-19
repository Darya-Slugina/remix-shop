// On click show Login page
function showloginForm() {
    // e.preventDefault();
    loginForm.classList.add("show");
}

// On click close Login page
function closeLoginForm() {
    // e.preventDefault();
    loginForm.classList.remove("show");
}

//// On click change Login page on Registration page
function showRegistrationForm() {
    // e.preventDefault();
    loginSlide.style.display = "none";
    registerSlide.style.display = "block";
    loginBackBtn.style.visibility = "visible";
}

// On click back to login page
function backTologinForm() {
    // e.preventDefault();
    loginSlide.style.display = "block";
    registerSlide.style.display = "none";
    loginBackBtn.style.visibility = "hidden";
}

// On click show the user subMenu with logout button
let userMenu = getById("user-button");
userMenu.addEventListener("click", function () {
    userLogoutController();
    userMenu.classList.add("clicked");
    let userSubMenu = getById("userSubMenu");
    userSubMenu.style.display = "block";
    setTimeout(function () {
        userSubMenu.style.display = "none";
        userMenu.classList.remove("clicked")
    }, 3000);

    let logOutBtn = getById("logOutBtn");
    logOutBtn.addEventListener("click", function () {
        userStorage.logout();
        enterButton.style.display = "block";
        let icons = document.querySelectorAll(".registration>.afterRegistration>a");
        icons.forEach(el => el.style.display = "none");
        userSubMenu.style.display = "none";
        let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
        favouriteIcon.forEach(el => el.classList.remove("liked"));
        updateDesires();
        updateLikes();
    })
});

//   if not logged in disable like option and option of adding in shopping bag
function desableToLike() {
    let favouriteIcon = Array.from(document.querySelectorAll(".favourite-icon"));
    favouriteIcon.forEach(el => el.addEventListener("click", function () {
        let currentUser = userStorage.getCurrentUser();
        if (!currentUser) {
            showloginForm();
        }
    }))

    let addToBagButton = Array.from(document.querySelectorAll(".add-button"));
    addToBagButton.forEach(el => el.addEventListener("click", function () {
        let currentUser = userStorage.getCurrentUser();
        if (!currentUser) {
            showloginForm();
        }
    }))
}

//  For overView page if not logged in disable like option and option of adding in shopping bag
function desableToLikefromOverView() {
    let favouriteIconOverView = getById("favIcon");
    favouriteIconOverView.addEventListener("click", function (e) {
        let currentUser = userStorage.getCurrentUser();
        if (!currentUser) {
            showloginForm();
        }
    })

    let wantedProduct = getById("siteBtn");
    wantedProduct.addEventListener("click", function (e) {
        let currentUser = userStorage.getCurrentUser();
        if (!currentUser) {
            showloginForm();
        }
    })
}

