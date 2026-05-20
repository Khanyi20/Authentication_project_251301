const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({ path: __dirname + "/.env" });
const fs = require('fs');
const path = require('path');

// Fallback: if dotenv didn't populate vars, try parsing .env manually
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    try {
        const raw = fs.readFileSync(envPath, 'utf8');
        raw.split(/\r?\n/).forEach(line => {
            const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
            if (m) {
                const key = m[1];
                let val = m[2] || '';
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.slice(1, -1);
                }
                if (process.env[key] === undefined || process.env[key] === '') process.env[key] = val;
            }
        });
    } catch (e) {
        console.error('ERROR reading .env fallback:', e.message);
    }
}

const authRoutes = require("./routes/authRoutes");

const app = express();

// simple request logger
app.use((req, res, next) => {
    console.log('REQ', req.method, req.path);
    next();
});

app.use(cors());

app.use(express.json());

if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));
} else {
    console.error('ERROR: MONGO_URI not set — skipping mongoose.connect');
}

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
});