const { app } = require("@azure/functions");
confessionService = require("./service/confessionService");

// Confession submission endpoint
app.http("confession", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    return await confessionService.submitConfession(request);
  },
});

// Confessions fetching endpoint based on user id and category or all
app.http("confessions", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    return await confessionService.getConfessions(request);
  },
});

// Health check endpoint
app.http("healthCheck", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async () => {
    return await confessionService.healthCheck();
  },
});
