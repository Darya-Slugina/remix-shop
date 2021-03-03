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
      this.currentUser = [];

      if (localStorage.getItem("users")) {
        this.users = JSON.parse(localStorage.getItem("users"));
      } else {
        this.users = [
          new User("Olga", "123@abv.bg", "olga123", "female"),
          new User("Darya", "1234@abv.bg", "darya123", "male"),
        ];
        localStorage.setItem("users", JSON.stringify(this.users));
      }

      if (localStorage.getItem("currentUser")) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (localStorage.getItem(this.currentUser[0].email)) {
          this.myFavourites = JSON.parse(localStorage.getItem(this.currentUser[0].email));
        }
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
      this.currentUser = currentUser;

      this.myFavourites = JSON.parse(localStorage.getItem(userEmail));
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



//       if (this.myFavourites[userStorage.currentUser[0].email] === undefined) {
//         this.myFavourites[userStorage.currentUser[0].email] = [];
//       }

//       let x = {};
//       x.storage = [];
//       x.storage[12] = [];
//       x.storage[12].push(el);
//       console.log(JSON.stringify(x));jhhjjl


//       this.myFavourites[userStorage.currentUser[0].email].push(el);
// console.log('before', this.myFavourites, localStorage.getItem("myFavourites"), JSON.stringify(this.myFavourites));

//       localStorage.removeItem("myFavourites");
// console.log('removed', this.myFavourites, localStorage.getItem("myFavourites"), JSON.stringify(this.myFavourites));

//       localStorage.setItem("myFavourites", JSON.stringify(this.myFavourites));
// console.log('added new', this.myFavourites,   localStorage.getItem("myFavourites"), JSON.stringify(this.myFavourites));
    }

    removeFromFavourite(el) {      
      this.myFavourites = this.myFavourites.filter(item => item.id !== el.id);
      // localStorage.removeItem("myFavourites");
      localStorage.setItem(this.currentUser[0].email, JSON.stringify(this.myFavourites));
    }

    isInFavourites(el) {
      if (this.myFavourites === undefined) {
        return false;
      }
  
      if (this.myFavourites.filter(element => element.id === el.id).length > 0) {
        return true;
      }
  
      return false;
    }
  }

  return new UserStorage();
})();