const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const router = require("./routes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://jota:Ipwnrh43IPutwbBi@cluster0.ifdmyzp.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
