const express = require("express");
const user = require("../model/Users");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();

router.post(
    "/signin",
    // Feilds Valdiation
    [
        body("name", "Enter a valid Name").isLength({ min: 3 }),
        body("email", "Enter valid Email").isEmail(),
        body("password", "Password must be atleast 6 letters").isLength({
            min: 6,
        }),
    ],
    // creating new user

    async (req, res) => {
        let status = false;
        const result = validationResult(req);

        // checking result of validator

        if (!result.isEmpty()) {
            return res.send({ status, errors: result.array() });
        }

        try {
            // checking whether user exists or not

            let users = await user.findOne({ email: req.body.email });

            // if user exists sending msg

            if (users) {
                return res
                    .status(400)
                    .json({ status, error: "Email already in use" });
            }

            // creating hash for given password

            const salt = await bcrypt.genSalt(10);

            const password = await bcrypt.hash(req.body.password, salt);

            // creating user with given deatails

            let createUser = await user.create({
                name: req.body.name,
                password: password,
                email: req.body.email,
            });

            const payLoad = {
                id: createUser.id,
            };
            status = true;

            const authToken = jwt.sign(payLoad, "Arjun");
            res.json({ status, authToken });
        } catch (e) {
            // sending msg if any internal error occurs

            console.log(e);
            res.status(500).json({ error: "Internal error" });
        }
    }
);

// Login end point

router.post(
    "/login",
    [
        body("email", "Enter valid Email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        let status = false;
        const result = validationResult(req);

        // checking result of validator

        if (!result.isEmpty()) {
            status = false;
            return res.send({ status: status, errors: result.array() });
        }

        const { email, password } = req.body;

        try {
            let User = await user.findOne({ email });

            if (!User) {
                status = false;
                return res
                    .status(400)
                    .json({ status: status, error: "Invalid credentials" });
            }

            const decrypt = await bcrypt.compare(password, User.password);
            if (!decrypt) {
                status = false;
                return res
                    .status(400)
                    .json({ status: status, error: "Invalid credentials" });
            }
            const payLoad = {
                id: User.id,
            };
            status = true;
            const authToken = jwt.sign(payLoad, "Arjun");
            res.status(200).json({ status: status, authToken: authToken });
        } catch (e) {
            status = false;
            console.log(e);
            res.json({ status: status, error: "Internal error" });
        }
    }
);

router.post("/getUser", fetchUser, async (req, res) => {
    try {
        let userId = req.user;

        const User = await user.findById(userId).select("-password");
        res.send(User);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal error" });
    }
});

module.exports = router;
