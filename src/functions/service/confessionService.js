const { ObjectId } = require("mongodb");
const { generateAnonymousName } = require("../utils/NameGeneratorUtils");
const Confession = require("../models/confessionModel");
const ConfessionRepository = require("../repositories/confessionRepository");
const confessionCategory = require("../utils/Enuums/confessionCategory");

// Submit a confession
async function submitConfession(request) {
  try {
    const confess = request.query.get("confession");
    const category = request.query.get("category");
    const userId = request.query.get("userId");

    if (
      category === null ||
      category === undefined ||
      category === "null" ||
      !Object.values(confessionCategory).includes(category)
    ) {
      return { status: 400, body: "Please provide a valid category." };
    }

    let userObjectId;
    let anonymousName;

    if (
      userId === "" ||
      userId === null ||
      userId === undefined ||
      userId === "null"
    ) {
      userObjectId = new ObjectId();
      anonymousName = generateAnonymousName();
    } else {
      let existingConfession = await ConfessionRepository.getConfessions({
        userId: new ObjectId(userId),
      });
      if (existingConfession.length === 0) {
        userObjectId = new ObjectId();
        anonymousName = generateAnonymousName();
      } else {
        userObjectId = new ObjectId(userId);
        anonymousName = existingConfession[0].name;
      }
    }

    const confessionData = new Confession({
      confession: confess,
      category: category,
      userId: userObjectId,
      name: anonymousName,
      timestamp: new Date(),
    });

    if (!confessionData) {
      return { status: 400, body: "Please provide a valid confession." };
    }

    await ConfessionRepository.saveConfession(confessionData);

    return { status: 200, body: "Confession submitted successfully." };
  } catch (error) {
    console.error("Error occurred while submitting confession:", error);
    return { status: 500, body: "Internal Server Error" };
  }
}

// Get confessions based on user id and category or all
async function getConfessions(request) {
  try {
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

    const confessions = await ConfessionRepository.getConfessions(query);
    return { status: 200, body: JSON.stringify(confessions) };
  } catch (error) {
    console.error("Error occurred while fetching confessions:", error);
    return {
      status: 500,
      body: "An error occurred while fetching confessions.",
    };
  }
}

// Health check Function for application
async function healthCheck() {
  try {
    return { status: 200, body: "Health check successful." };
  } catch (error) {
    console.error("Error occurred while performing health check:", error);
    return { status: 500, body: "Health check failed." };
  }
}

module.exports = {
  submitConfession,
  getConfessions,
  healthCheck,
};
