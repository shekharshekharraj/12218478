const Url = require("../Modals/urlmodal");
const { generateShortcode } = require("../services/shortcodeService");

// Controller to create a new short URL
exports.createShortUrl = async (req, res) => {
    // Extract URL, validity, and optional shortcode from request body
    const { url, validity = 30, shortcode } = req.body;

    // Check if original URL is provided
    if (!url) {
        return res.status(400).json({ error: "Original URL is required" });
    }

    // Generate a shortcode if not provided
    const code = shortcode || generateShortcode();

    // Set expiry date (currently set to 24 hours from now)
    const expiryDate = new Date(Date.now() + 60 * 60 * 24);

    try {
        // Check if the shortcode already exists in the database
        const existing = await Url.findOne({ shortcode: code });
        if (existing) {
            return res.status(409).json({ error: "Shortcode already exists" });
        }

        // Create and save the new short URL entry
        const shortUrl = await Url.create({
            originalUrl: url,
            shortcode: code,
            expiry: expiryDate,
        });

        // Respond with the generated short link and expiry date
        return res.status(201).json({
            shortLink: `${req.protocol}://${req.get("host")}/${code}`,
            expiry: expiryDate.toISOString(),
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Controller to get statistics for a short URL
exports.getShortUrlStats = async (req, res) => {
    // Extract shortcode from request parameters
    const { shortcode } = req.params;

    try {
        // Find the URL document by shortcode
        const urlData = await Url.findOne({ shortcode });

        // If not found, respond with 404
        if (!urlData) {
            return res.status(404).json({ error: "Shortcode not found" });
        }

        // Respond with URL statistics
        res.status(200).json({
            originalUrl: urlData.originalUrl,
            createdAt: urlData.createdAt,
            expiry: urlData.expiry,
            totalClicks: urlData.clicks.length,
            clickDetails: urlData.clicks,
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ error: "Internal server error" });
    }
};
