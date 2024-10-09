const router = require('express').Router();
const jose = require('jose');

router.get('/', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    let authToken = '';
    
    if (authHeader) {
      authToken = authHeader.split(' ')[1]; 
    } else {
      return res.status(401).json({ error: "No authorization token provided" });
    }
    const { payload } = await jose.jwtVerify(authToken, new TextEncoder().encode(process.env.JWT_SECRET));

    res.status(200).json({ payload });
    
  } catch (error) {
    console.error("Error verifying token:", error);
    
    if (error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED' || error.name === 'JWTExpired') {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
