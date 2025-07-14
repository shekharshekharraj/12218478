const express = require("express");
const router = express.Router();
const { createShortUrl, getShortUrlStats } = require("../Controllers/url");
const Url = require("../Modals/urlmodal");

// Route to create a new short URL
router.post("/shorturls", createShortUrl);

// Route to get statistics for a short URL by shortcode
router.get("/shorturls/:shortcode", getShortUrlStats);

// Route to handle redirection from a short URL
router.get("/:shortcode", async (req, res) => {
    // Extract shortcode from URL parameters
    const { shortcode } = req.params;

    // Find the URL document by shortcode
    const urlData = await Url.findOne({ shortcode });

    // If shortcode does not exist, return 404
    if (!urlData) {
        return res.status(404).json({ error: "Shortcode not found" });
    }

    // If the short URL has expired, return 410 Gone
    if (urlData.expiry < new Date()) {
        return res.status(410).json({ error: "Short URL expired" });
    }

    // Log the click: add referrer and location info to the clicks array
    urlData.clicks.push({
        referrer: req.get("referer") || "direct", // Use referrer header or mark as direct
        location: "IN", // Hardcoded location, can be replaced with real geolocation
    });

    // Save the updated URL document with the new click
    await urlData.save();

    // Redirect the user to the original URL
    res.redirect(urlData.originalUrl);
});

// Export the router to be used in the main app
module.exports = router;
