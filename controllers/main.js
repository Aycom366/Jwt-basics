const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  //check in the controller
  if (!username || !password) {
    throw new BadRequest("username or password is missing");
  }

  //normally provided by DB
  const id = new Date().getTime();

  //try to keep payload small, better exprience
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your lucky number : ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
