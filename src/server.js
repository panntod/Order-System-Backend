const bodyParser = require("body-parser");
const express = require(`express`);
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors({ origin: "*", credentials: true }));

const routes = require("./routes/route");
app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Server of cafe runs on port ${PORT}`);
});
