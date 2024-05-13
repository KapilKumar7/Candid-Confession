const { MongoClient } = require("mongodb");

let client;

async function connectToDatabase(uri) {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
    }
    return client.db("confessionsdb");
  } catch (error) {
    console.error("Error occurred while connecting to the database:", error);
    throw error;
  }
}

async function closeDatabaseConnection() {
  try {
    if (client) {
      await client.close();
      client = null;
    }
  } catch (error) {
    console.error("Error occurred while closing database connection:", error);
    throw error;
  }
}
module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};
