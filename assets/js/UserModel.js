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
      this.isLogged = false;
      this.currentUser = [];
      this.myFavourites = [];
      this.myDesiredProd = [];
      this.myFavouritesCount = 0;
      this.myDesiredCounter = 0;
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

      if (localStorage.getItem("login")) {
        this.isLogged = (localStorage.getItem("login") === 'true');
      }

      if (localStorage.getItem("currentUser")) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

        // check if in local storage we have key = email
        if (localStorage.getItem(this.currentUser[0].email)) {

          // get data by key
          let localStorageFavorites  = JSON.parse(localStorage.getItem(this.currentUser[0].email));

          // check if this data is not empty, and set favorites
          if (localStorageFavorites !== null) {
            this.myFavourites = localStorageFavorites;
            this.myFavouritesCount = this.myFavourites.length;
          }
        }

        // check if in local storage we have key = email1
        if (localStorage.getItem(this.currentUser[0].email+1)) {

          // get data by key
          let localStorageDesired  = JSON.parse(localStorage.getItem(this.currentUser[0].email+1));

          // check if this data is not empty, and set favorites
          if (localStorageDesired !== null) {
            this.myDesiredProd = localStorageDesired;
            this.myDesiredCounter = this.myDesiredProd.length;
          }
        }
      }
    }

    register(name, email, password, gender) {
      this.users.push(new User(name, email, password, gender));
      localStorage.setItem('users', JSON.stringify(this.users));

      let currentUser = JSON.parse(localStorage.getItem("users")).filter(el => el.email === email);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      this.myFavourites = [];
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
      this.currentUser = currentUser;

      this.myFavourites = JSON.parse(localStorage.getItem(userEmail));
      this.myFavouritesCount = this.myFavourites.length;

      this.myFavouritesCount = 0;
      if (this.myFavourites !== null && this.myFavourites !== undefined) {
        this.myFavouritesCount = this.myFavourites.length;
      }      
    }

    logout() {
      this.isLogged = false;
      this.currentUser = [];
      this.myFavourites = [];
  
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

    addToFavourite(el) {
      this.myFavourites.push(el);
      localStorage.setItem(this.currentUser[0].email, JSON.stringify(this.myFavourites));
    }

    removeFromFavourite(el) {      
      this.myFavourites = this.myFavourites.filter(item => item.id !== el.id);
      localStorage.setItem(this.currentUser[0].email, JSON.stringify(this.myFavourites));
    }

    isInFavourites(el) {
      if (this.myFavourites === undefined || this.myFavourites === null) {
        return false;
      }
  
      if (this.myFavourites.filter(element => element.id === el.id).length > 0) {
        return true;
      }
  
      return false;
    }

    addToDesired(el) {
      this.myDesiredProd.push(el);
      localStorage.setItem(this.currentUser[0].email+1, JSON.stringify(this.myDesiredProd));
    }

    removeFromDesired(el) {      
      this.myDesiredProd = this.myDesiredProd.filter(item => item.id !== el.id);
      localStorage.setItem(this.currentUser[0].email+1, JSON.stringify(this.myDesiredProd));
    }
  }

  return new UserStorage();
})();