const express = require("express");
const connectToDb = require("./db");
const cors = require("cors");
connectToDb();
const app = express();
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
const port = 5000;
app.use(express.json());
app.use(cors(corsOptions));

app.use("/auth", require("./routes/auth"));
app.use("/notes", require("./routes/notes"));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
