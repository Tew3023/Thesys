const router = require("express").Router();
const orderSchema = require("../models/order");

router.get("/", async (req, res) => {
  const { userId } = req.body.userId;
  try {
    const result = await orderSchema.find({ userId: userId });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
