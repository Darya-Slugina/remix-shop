// Controller
(function () {
    // DOM Selectors
    // Pages
    const loginForm = getById("loginForm");
    const container = getById("headerContainer");
  
    // Inputs
    const nameInput = getById("nameInput");
    const emailInput = getById("emailInput");
    const passwordInput = getById("passwordInput");
    const emailInputReg = getById("emailInputReg");
    const passwordInputReg = getById("passwordInputReg");
  
    // Buttons
    const loginBtn = getById("loginBtn");
    const submitBtnReg = getById("submitBtnReg");
  
    // On login submit
    loginBtn.addEventListener("click", function (ev) {
      ev.preventDefault();
      const name = nameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
      const gender = genderInput.value;
  
      if (userStorage.login(name, email, password, gender)) {
        loginForm.style.display = "none";
        homePage.style.display = "block";
      }
    });
  
    submitBtnReg.addEventListener("click", function (ev) {
      ev.preventDefault();

      const name = nameInputReg.value;
      const email = emailInputReg.value;
      const password = passwordInputReg.value;
      const gender = genderInputReg.value;
  
      userStorage.register(name, email, password, gender);
    });
  })();