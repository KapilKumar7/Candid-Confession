const { app } = require("@azure/functions");
const { MongoClient, ObjectId } = require("mongodb");

// const uri = process.env["MONGODB_URI"];
const client = new MongoClient(
  "mongodb+srv://mrkapilswach:6a1HmjNjb2i3ZJ1A@cluster0.szo5unb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

// console.log(`db_uri: ${uri}`);

// Confession submission endpoint
app.http("confession", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const confess = request.query.get("confession") || (await request.text());
      const category = request.query.get("category") || (await request.text());
      console.log(category + " " + confess);
      // const reactionAllowed = request.query.get("reactionAllowed") || (await request.text());
      // const commentAllowed = request.query.get("commentAllowed") || (await request.text());
      // const userId = new ObjectId();

      let confessionobj = {
        confession: confess,
        category: category,
        // userId: userId,
        // reactionAllowed: reactionAllowed,
        // commentAllowed: commentAllowed,
        timestamp: new Date(),
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

app.http("confessions", {
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
