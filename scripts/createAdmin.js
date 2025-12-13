
import Parse from 'parse/node.js';

// Retrieve env vars from .env file logic often requires dotenv, 
// but here I will hardcode the keys currently visible in the codebase context 
// or I can assume they are loaded if I run with `node --env-file=.env` (Node 20+)
// or just use the values I know I have access to. 
// However, for safety, I will try to read them from process.env assuming the user runs it correctly 
// OR I will ask the text content of .env first? 
// No, I can't read .env easily without a tool. 
// I'll assume standard execution environment.
// ACTUALLY, I can't be sure `dotenv` is installed.
// I will just use the hardcoded keys found in previous logs or files?
// I see `parseClient.ts` uses `import.meta.env`.
// I will try to read `.env` with `fs` in the script to be robust.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

try {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.log('Could not read .env file, checking process.env');
}

// Adjust for VITE_ prefix if necessary, but node script usually needs standard keys.
// The .env likely has VITE_ keys.
const APP_ID = process.env.VITE_PARSE_APPLICATION_ID || process.env.PARSE_APPLICATION_ID;
const JS_KEY = process.env.VITE_PARSE_JAVASCRIPT_KEY || process.env.PARSE_JAVASCRIPT_KEY;
const SERVER_URL = process.env.VITE_PARSE_SERVER_URL || process.env.PARSE_SERVER_URL;
// MASTER KEY is needed for creating users securely usually, or we can sign up regularly?
// Admin creation usually requires Master Key to set specific roles or fields if CLP is strict.
// But wait, the user instructions didn't provide Master Key.
// I'll try to use the JS Key. If CLP prevents writing to User class, I'll need Master Key.
// Let's assume public signup is allowed or I can just use JS Key.

if (!APP_ID || !SERVER_URL) {
    console.error("Missing credentials in .env");
    process.exit(1);
}

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = SERVER_URL;

async function createAdmin() {
    const username = "syllaharouna740@gmail.com";
    const password = "my@dmin";
    const email = "syllaharouna740@gmail.com";

    try {
        const query = new Parse.Query(Parse.User);
        query.equalTo("username", username);
        const existingUser = await query.first();

        if (existingUser) {
            console.log("User already exists. Updating...");
            existingUser.set("password", password);
            existingUser.set("isAdmin", true);
            existingUser.set("role", "admin");
            // Cannot save user with existing username unless we use Master Key?
            // Actually, if we are not logged in as that user, we can't update it without Master Key usually.
            // But let's try. If it fails, I'll note it.
            // Wait, I don't have Master Key in the client side variables usually.
            // Check if .env has MASTER_KEY.
            // If not, I can only create NEW users if signup is open.

            // For now, let's try to update.
            try {
                await existingUser.save();
                console.log("Admin user updated successfully.");
            } catch (e) {
                console.error("Failed to update using JS Key. You might need Master Key.", e.message);
            }
        } else {
            const user = new Parse.User();
            user.set("username", username);
            user.set("password", password);
            user.set("email", email);
            user.set("isAdmin", true);
            user.set("role", "admin");

            await user.signUp();
            console.log("Admin user created successfully.");
        }
    } catch (error) {
        console.error("Error creating/updating admin:", error);
    }
}

createAdmin();
