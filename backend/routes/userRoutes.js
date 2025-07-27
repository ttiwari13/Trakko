const express=require('express');
const { getUserProfile, updateUserProfile, changePassword }= require("../controllers/userController.js");
const {protect} = require('../middleware/auth.js');

const router = express.Router();

router.get("/me", protect, getUserProfile);
router.put("/update", protect, updateUserProfile);
router.put("/change-password", protect, changePassword);

module.exports = router; 