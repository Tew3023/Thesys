const router = require("express").Router();
const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { email, password, phone } = req.body;

  if (!email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required (email, password, phone)" });
  }

  try {
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email: email,
      password: hashedPassword,
      phone: phone
    };

    await UserSchema.create(user);

    res.status(201).json({ message: "User account created successfully" });

  } catch (error) {
    console.error("Error creating account:", error);
    res
      .status(500)
      .json({ error: "Something went wrong during the account creation process" });
  }
});

module.exports = router;
