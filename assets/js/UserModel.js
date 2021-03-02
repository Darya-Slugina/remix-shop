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
    }

    register(name, email, password, gender) {
      this.users.push(new User(name, email, password, gender));
      localStorage.setItem('users', JSON.stringify(this.users));
    }

    isGoodCredentials(email, password) {
      const isUserLoggedIn = this.users.some(
        (user) => user.email === email && user.password === password
      );

      return isUserLoggedIn;
    }

    login(){
      this.isLogged = true;
      localStorage.setItem("login", JSON.stringify(this.isLogged));
    }

    validate(email, password) {
      if (email.trim().length > 3 && password.trim().length > 3) {
        return true;
      }

      return false;
    }

    addToFavourite(el) {
      this.myFavourites.push(el);
      localStorage.setItem("myFavourites", JSON.stringify(this.myFavourites));
    }

    removeFromFavourite(el) {
      localStorage.removeItem("myFavourites");
      this.myFavourites =  this.myFavourites.filter(item => item.id !== el.id);
      localStorage.setItem("myFavourites", JSON.stringify(this.myFavourites));
    }
  }

  return new UserStorage();
})();