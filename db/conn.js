const { MongoClient } = require("mongodb");
const connectionString = process.env.URI;
const client = new MongoClient("mongodb://localhost:27017/", {
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
