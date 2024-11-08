const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, users } = require("../Models/userModel");

exports.register = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User(-1, email, hashedPassword);
  res.json(user);
  res.status(201).json(user);
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email == email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.name }, process.env.SECRET_KEY, {
      expiresInL: 86400,
    });
    res.json({ auth: true, token });
    res.status(200).json(token);
  } else {
    res.status(401).json({ error: "user not found" });
  }
};
