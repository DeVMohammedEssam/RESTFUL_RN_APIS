if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoUri: require("./keys.prod").mongoUri,
    secretOrKey: require("./keys.prod").secretOrKey
  };
} else {
  module.exports = {
    mongoUri: require("./keys.dev").mongoUri,
    secretOrKey: require("./keys.dev").secretOrKey
  };
}
