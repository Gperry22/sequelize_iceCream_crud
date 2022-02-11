const colors = require("colors");

module.exports = function (req, res, next) {
  var message = `STEP 2:  You hit a ${req.method} Method for the ${req.path} Route`;

  console.log(message.red);

  next();
};
