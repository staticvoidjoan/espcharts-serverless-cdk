const mongoose = require("mongoose");
const uri = "mongodb+srv://shametijoan:mafia2001@staticvoidjoan.duwyxmk.mongodb.net/espcharts?retryWrites=true&w=majority"
let conn = null;
const mongoURI = uri;
module.exports = connectDatabase = async () => {
  try {
    if (conn == null) {
      console.log("Creating new connection to database...");
      console.log(mongoURI);
      conn = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      return conn;
    }
    console.log("Connection already established, reusing the connection...");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
