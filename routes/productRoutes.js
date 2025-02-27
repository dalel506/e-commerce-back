const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");

// Route de recherche
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);

    const results = await Product.find({ name: { $regex: query, $options: "i" } });
    res.json(results);
  } catch (error) {
    console.error("Erreur de recherche :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
