(function () {

  function loginUser(email, password) {
    userStorage.login(email, password);
    loginForm.classList.remove("show");
    enterButton.style.display = "none";
    let icons = document.querySelectorAll(".registration>.afterRegistration>a");
    icons.forEach(el => el.style.display = "block");
  }

  // On login submit
  loginButton.addEventListener("click", function (ev) {
    ev.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (userStorage.isGoodCredentials(email, password)) {
      loginUser(email, password);
    } else {
      loginError.style.display = "block";
    }
  });

  let genders = Array.from(document.getElementsByClassName("radio"));

  let gender;
  genders.forEach(el => el.addEventListener("click", function (e) {
    gender = e.target.value;
  }));

  // On registration submit
  registrationButton.addEventListener("click", function (ev) {
    ev.preventDefault();

    const name = nameInputReg.value;
    const email = emailInputReg.value;
    const password = passwordInputReg.value;

    userStorage.register(name, email, password, gender);
    loginForm.classList.remove("show");

    loginUser(email, password);
  });
})();

// Logout controller
const userLogoutController = function () {
  const source = document.getElementById("userLogoutTempl").innerHTML;
  const template = Handlebars.compile(source);

  let user = JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true);
  const html = template(user[0]);

  let container = document.getElementById("userMenuContainer");
  container.innerHTML = html;
};