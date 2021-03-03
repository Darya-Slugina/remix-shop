const userStorage = (function () {

  class User {
    constructor(name, email, password, gender) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.gender = gender;
    }
  }

  class UserStorage {
    constructor() {
      this.myFavourites = [];
      this.isLogged = false;

      if (localStorage.getItem("users")) {
        this.users = JSON.parse(localStorage.getItem("users"));
      } else {
        this.users = [
          new User("Olga", "123@abv.bg", "olga123", "female"),
          new User("Darya", "1234@abv.bg", "darya123", "male"),
        ];
        localStorage.setItem("users", JSON.stringify(this.users));
      }

      if (localStorage.getItem("myFavourites")) {
        this.myFavourites = JSON.parse(localStorage.getItem("myFavourites"));
      }
    }



    register(name, email, password, gender) {
      this.users.push(new User(name, email, password, gender));
      localStorage.setItem('users', JSON.stringify(this.users));

      let currentUser = JSON.parse(localStorage.getItem("users")).filter(el => el.email === email);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    isGoodCredentials(email, password) {
      const isUserLoggedIn = this.users.some(
        (user) => user.email === email && user.password === password
      );

      return isUserLoggedIn;
    }

    login(userEmail) {
      this.isLogged = true;
      localStorage.setItem("login", JSON.stringify(this.isLogged));

      let currentUser = JSON.parse(localStorage.getItem("users")).filter(el => el.email === userEmail);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    logout() {
      this.isLogged = false;
      localStorage.removeItem("login");
    }

    validate(email, password) {
      if (email.trim().length > 3 && password.trim().length > 3) {
        return true;
      }

      return false;
    }

    addToFavourite(el) {
      this.myFavourites = JSON.parse(localStorage.getItem("myFavourites"));
      this.myFavourites.push(el);
      localStorage.setItem("myFavourites", JSON.stringify(this.myFavourites));
    }

    removeFromFavourite(el) {
      localStorage.removeItem("myFavourites");
      this.myFavourites = this.myFavourites.filter(item => item.id !== el.id);
      localStorage.setItem("myFavourites", JSON.stringify(this.myFavourites));
    }

    isInFavourites(el) {
      if (this.myFavourites.filter(element => element.id === el.id).length > 0) {
        return true;
      }
      return false;
    }
  }

  return new UserStorage();
})();