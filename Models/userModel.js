let users = [];

class User {
  constructor(name, age, email, password) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}

module.exports = { users, User };
