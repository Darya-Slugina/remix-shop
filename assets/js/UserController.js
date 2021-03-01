(function () {
    const loginForm = getById("loginForm");
  
    // Inputs
    const emailInput = getById("emailInput");
    const passwordInput = getById("passwordInput");
    const nameInputReg = getById("nameInputReg");
    const emailInputReg = getById("emailInputReg");
    const passwordInputReg = getById("passwordInputReg");
    const loginError = getById("loginError");
  
    // Buttons
    const loginButton = getById("loginButton");
    const registrationButton = getById("registrationButton");
  
    // On login submit
    loginButton.addEventListener("click", function (ev) {
      ev.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;
  
      if (userStorage.login(email, password)) {
        loginForm.classList.remove("show");
      } else {
        loginError.style.display = "block";
      }
    });

    let genders = Array.from(document.getElementsByClassName("radio"));
   
      let gender;
      genders.forEach(el => el.addEventListener("click", function(e){
        gender = e.target.value;
      }));
  
    registrationButton.addEventListener("click", function (ev) {
      ev.preventDefault();

      const name = nameInputReg.value;
      const email = emailInputReg.value;
      const password = passwordInputReg.value;
  
      userStorage.register(name, email, password, gender);
      loginForm.classList.remove("show");
    });
  })();