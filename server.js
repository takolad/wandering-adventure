const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// Turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`🌎  ==> Server now listening on PORT ${PORT}!`)
  );
});
