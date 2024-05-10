const { app } = require("@azure/functions");
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Confession submission endpoint
app.http("confessions", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const name = request.query.get("confession") || (await request.text());

      let confessionobj = {
        confession: name,
      };

      if (!confessionobj) {
        return { status: 400, body: "Please provide a confession." };
      }

      await client.connect();
      const database = client.db("confessionsdb");
      const collection = database.collection("confessions");

      await collection.insertOne(confessionobj);

      return { status: 200, body: "Confession submitted successfully." };
    } catch (error) {
      console.error("Error occurred while submitting confession:", error);
      return { status: 500, body: "Internal Server Error" };
    } finally {
      await client.close();
    }
  },
});

app.http("getConfessions", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async () => {
    try {
      await client.connect();
      const database = client.db("confessionsdb");
      const collection = database.collection("confessions");
      const confessions = await collection.find({}).toArray();
      return { status: 200, body: JSON.stringify(confessions) };
    } catch (error) {
      console.error("Error occurred while fetching confessions:", error);
      return {
        status: 500,
        body: "An error occurred while fetching confessions.",
      };
    } finally {
      await client.close();
    }
  },
});

app.http("healthCheck", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async () => {
    try {
      return { status: 200, body: "Health check successful." };
    } catch (error) {
      console.error("Error occurred while performing health check:", error);
      return { status: 500, body: "Health check failed." };
    }
  },
});
