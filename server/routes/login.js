const router = require("express").Router();
const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jose = require('jose');

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET); 

    const jwt = await new jose.SignJWT({ id: user._id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') 
      .sign(secret);

    return res.status(200).json({
      message: "Login successful",
      token: jwt
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
