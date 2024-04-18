const app = require("./app");
const connectDb = require("./db/connect");
const { MONGO_URL, PORT } = require("./environment/config");

// Set port from environment
const port = PORT;

// Function to start the server and connect to the database
const start = async () => {
  try {
    await connectDb(MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  } catch (err) {
    console.log(`Failed to start the server: ${err}`);
  }
};

// Start the server
start();
