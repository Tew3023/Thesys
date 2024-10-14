const router = require("express").Router();
const orderSchema = require("../models/order");

router.get("/", async (req, res) => {
  const { userId } = req.query; 

  try {
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    console.log(userId);
    
    const result = await orderSchema.find({ userId: userId });
    
    res.status(200).json({ message: 'This is your order', result });
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
