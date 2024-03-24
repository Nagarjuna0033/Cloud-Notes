const jwt = require("jsonwebtoken");
const JWT_TOKEN = "Arjun";
const fetchUser = (req, res, next) => {
    const token = req.header("authToken");

    if (!token) {
        res.status(401).send({ error: "Authentication failed" });
    }

    try {
        const data = jwt.verify(token, JWT_TOKEN);

        req.user = data.id;

        next();
    } catch (e) {
        res.status(401).send({ error: "Authentication failed" });
    }
};

module.exports = fetchUser;
