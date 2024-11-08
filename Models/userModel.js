let users = [];

class User {
  constructor(age, email, password) {
    this.name = email.split("@")[0];
    this.age = age;
    this.email = email;
    this.password = password;
  }
}

module.exports = { users, User };
