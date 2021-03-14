let userStorage = (function () {

  class User {
    constructor(name, email, password, gender) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.gender = gender;
      this.isLoggedIn = false;
      this.myFavourites = [];
      this.myDesiredProd = [];
      this.myFavouritesCount = 0;
      this.myDesiredCounter = 0;
    }
  }

  class UserStorage {
    constructor() {
      this.init();
    }

    init() {

      if (localStorage.getItem("users")) {
        this.users = JSON.parse(localStorage.getItem("users"));
      } else {
        this.users = [
          new User("Olga", "123@abv.bg", "olga123", "female"),
          new User("Darya", "1234@abv.bg", "darya123", "male"),
        ];
        localStorage.setItem("users", JSON.stringify(this.users));
      }

      if (localStorage.getItem("users")) {

        if (JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true).length > 0) {

          let localStorageFavorites = JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true)[0].myFavourites;

          let currentUser = this.users.find(user => user.isLoggedIn);
          currentUser.myFavourites = localStorageFavorites;
          if (currentUser.myFavouritesCount) {
            currentUser.myFavouritesCount = localStorageFavorites.length;
          }

          let localStorageDesired = JSON.parse(localStorage.getItem("users")).filter(el => el.isLoggedIn === true)[0].myDesiredProd;

          currentUser = this.users.find(user => user.isLoggedIn);
          currentUser.myDesiredProd = localStorageDesired;
          if (currentUser.myDesiredCounter) {
            currentUser.myDesiredCounter = localStorageDesired.length;
          }

        }
      }
    }


    register(name, email, password, gender) {
      let currentUser = new User(name, email, password, gender);
      currentUser.isLoggedIn = true;
      userStorage.init();
      this.users.push(currentUser);
      localStorage.setItem('users', JSON.stringify(this.users));


      return !!currentUser;

    }

    getCurrentUser() {
      return this.users.find(user => user.isLoggedIn);
    }

    isGoodCredentials(email, password) {
      const isUserLoggedIn = this.users.some(
        user => user.email === email && user.password === password
      );
      return isUserLoggedIn;
    }

    login(email, password) {
      let currentUser = this.users.find(user => user.email === email && user.password === password);

      if (currentUser) {
        this.users.forEach(user => {
          if (user.email === email && user.password === password) {
            user.isLoggedIn = true;
          } else {
            user.isLoggedIn = false;
          }
        });

        localStorage.setItem('users', JSON.stringify(this.users));

      }

      return !!currentUser;
    }

    logout() {
      let currentUser = userStorage.getCurrentUser();
      currentUser.isLoggedIn = false;
      localStorage.setItem('users', JSON.stringify(this.users));

      localStorage.removeItem("login");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("myFavourites");
    }

    validate(email, password) {
      if (email.trim().length > 3 && password.trim().length > 3) {
        return true;
      }

      return false;
    }

    addToFavourite(item) {
      let currentUser = userStorage.getCurrentUser();
      currentUser.myFavourites.push(item);
      currentUser.myFavouritesCount = currentUser.myFavourites.length;
      localStorage.setItem('users', JSON.stringify(this.users));
    }

    removeFromFavourite(el) {
      let currentUser = userStorage.getCurrentUser();
      currentUser.myFavourites = currentUser.myFavourites.filter(item => item.id !== el.id);
      currentUser.myFavouritesCount = currentUser.myFavourites.length;
      localStorage.setItem('users', JSON.stringify(this.users));
    }

    isInFavourites(el) {
      let currentUser = userStorage.getCurrentUser();
      if (currentUser.myFavourites === undefined || currentUser.myFavourites === null || currentUser.myFavourites === []) {
        return false;
      }

      if (currentUser.myFavourites.filter(element => element.id === el.id).length > 0) {
        return true;
      }

      return false;
    }

    addToDesired(el) {
      let currentUser = userStorage.getCurrentUser();
      currentUser.myDesiredProd.push(el);
      currentUser.myDesiredCounter = currentUser.myDesiredProd.length;
      localStorage.setItem('users', JSON.stringify(this.users));
    }

    removeFromDesired(el) {
      let currentUser = userStorage.getCurrentUser();

      if (typeof el === "number" || typeof el === "string") {
        currentUser.myDesiredProd = currentUser.myDesiredProd.filter(item => item.id !== el);
        currentUser.myDesiredCounter = currentUser.myDesiredProd.length;
        localStorage.setItem('users', JSON.stringify(this.users));

      } else {

        currentUser.myDesiredProd = currentUser.myDesiredProd.filter(item => item.id !== el.id);
        currentUser.myDesiredCounter = currentUser.myDesiredProd.length;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }
  }

  return new UserStorage();
})();