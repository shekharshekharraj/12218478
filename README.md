

# 🔗 HTTP URL Shortener Microservice

A robust and modular Node.js microservice for shortening long URLs, with built-in analytics and custom logging. Designed for Campus Hiring Evaluation – Pre-Test.

---

## 🚀 Features

- 🔐 Unique short URL generation (auto or custom shortcode)
- ⏰ Configurable URL expiry (default: 30 minutes)
- 🔁 Redirection support for short URLs
- 📊 Statistics tracking: clicks, referrer, and access timestamp
- 📦 Fully modular microservice architecture
- 📝 Custom file-based middleware logger (no console.log)

---

## 📁 Project Structure


TEST/
├── config/ # MongoDB config
├── Controllers/ # URL creation & stats controller
├── Middlewares/ # Custom logger middleware
├── Modals/ # Mongoose URL model
├── Routes/ # Routes for creation, redirection, stats
├── services/ # Shortcode generation logic
├── logs/ # Request log storage
├── .env # Environment variables
├── index.js # App entry point
├── package.json # Project metadata

snapshots

<img width="1842" height="872" alt="image" src="https://github.com/user-attachments/assets/ad6cca58-6dd7-48e4-bfcc-ee2e13db99e0" />
