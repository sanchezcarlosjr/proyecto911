const { MongoClient } = require("mongodb");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const connectionString = process.env.URI;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, client) => {
      if (err || !client) {
        return callback(err);
      }

      db = client.db("project911");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: () => {
    return db;
  },
};
