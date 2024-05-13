const { app } = require("@azure/functions");
const { MongoClient, ObjectId } = require("mongodb");
const { generateAnonymousName } = require("./utils");

const uri = process.env["MONGODB_URI"];
const client = new MongoClient(uri);

console.log(`db_uri: ${uri}`);

// Confession submission endpoint
app.http("confession", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const confess = request.query.get("confession");
      const category = request.query.get("category");
      const userId = request.query.get("userId");
      console.log(category + " " + confess);
      // const reactionAllowed = request.query.get("reactionAllowed") ;
      // const commentAllowed = request.query.get("commentAllowed") ;

      await client.connect();
      const database = client.db("confessionsdb");
      const collection = database.collection("confessions");

      let userObjectId;
      let anonymousName;

      if (
        userId === "" ||
        userId === null ||
        userId === undefined ||
        userId === "undefined" ||
        userId === "null"
      ) {
        userObjectId = new ObjectId();
        anonymousName = generateAnonymousName();
      } else {
        let existingConfession = await database
          .collection("confessions")
          .findOne({ userId: new ObjectId(userId) });
        if (existingConfession === null) {
          userObjectId = new ObjectId();
          anonymousName = generateAnonymousName();
        } else {
          userObjectId = new ObjectId(userId);
          anonymousName = existingConfession.name;
          console.log("Existing user: " + anonymousName);
        }
      }

      let confessionobj = {
        confession: confess,
        category: category,
        userId: userObjectId,
        name: anonymousName,
        // reactionAllowed: reactionAllowed,
        // commentAllowed: commentAllowed,
        timestamp: new Date(),
      };

      if (!confessionobj) {
        return { status: 400, body: "Please provide a confession." };
      }

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

// Confessions fetching endpoint based on user id and category or all
app.http("confessions", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      await client.connect();
      const database = client.db("confessionsdb");
      const collection = database.collection("confessions");
      const userId = request.query.get("userId");
      const category = request.query.get("category");

      let query = {};
      if (userId && category && userId !== "undefined" && userId !== "null") {
        query = { userId: new ObjectId(userId), category: category };
      } else if (userId && userId !== "undefined" && userId !== "null") {
        query = { userId: new ObjectId(userId) };
      } else if (category) {
        query = { category: category };
      }

      const confessions = await collection.find(query).toArray();
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

// Health check endpoint
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
