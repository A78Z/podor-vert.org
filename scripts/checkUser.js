
import Parse from 'parse/node.js';
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

const APP_ID = process.env.VITE_PARSE_APPLICATION_ID || process.env.PARSE_APPLICATION_ID;
const JS_KEY = process.env.VITE_PARSE_JAVASCRIPT_KEY || process.env.PARSE_JAVASCRIPT_KEY;
const SERVER_URL = process.env.VITE_PARSE_SERVER_URL || process.env.PARSE_SERVER_URL;

if (!APP_ID || !SERVER_URL) {
    console.error("Missing credentials in .env");
    process.exit(1);
}

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = SERVER_URL;

async function checkUser() {
    const email = "mametine.sall@mcat.gouv.sn";
    const password = "My@dmin-mcat";

    console.log(`Checking user: ${email}`);

    try {
        const user = await Parse.User.logIn(email, password);
        console.log("LOGIN SUCCESS: User exists and password is correct.");
        console.log("Role:", user.get("role"));
    } catch (error) {
        console.error("LOGIN FAILED:", error.message);

        // Try creating if doesn't exist (error 101)
        if (error.code === 101) {
            console.log("Attempting to create user...");
            const user = new Parse.User();
            user.set("username", email);
            user.set("password", password);
            user.set("email", email);
            user.set("role", "super_admin");
            user.set("full_name", "Mametine Sall");

            try {
                await user.signUp();
                console.log("USER CREATED SUCCESSFULLY.");
            } catch (createError) {
                console.error("CREATION FAILED:", createError.message);
            }
        }
    }
}

checkUser();
