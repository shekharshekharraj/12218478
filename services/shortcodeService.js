// Function to generate a random 6-character shortcode
exports.generateShortcode = () => {
    // Characters allowed in the shortcode
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    // Generate a 6-character random string
    for (let i = 0; i < 6; i++) {
        // Pick a random character from the charset and add it to the code
        code += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Return the generated shortcode
    return code;
};
