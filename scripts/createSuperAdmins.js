import Parse from 'parse/node.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

// Read .env file
try {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });

    // Debug: Log keys found
    console.log("Found keys in .env:", Object.keys(process.env).filter(k => k.includes('PARSE') || k.includes('VITE') || k.includes('KEY')));
} catch (e) {
    console.log('Could not read .env file, checking process.env');
}

const APP_ID = process.env.VITE_PARSE_APPLICATION_ID || process.env.PARSE_APPLICATION_ID;
const JS_KEY = process.env.VITE_PARSE_JAVASCRIPT_KEY || process.env.PARSE_JAVASCRIPT_KEY;
const SERVER_URL = process.env.VITE_PARSE_SERVER_URL || process.env.PARSE_SERVER_URL;
const MASTER_KEY = process.env.VITE_PARSE_MASTER_KEY || process.env.PARSE_MASTER_KEY || process.env.MASTER_KEY; // Added VITE_ prefix check just in case

if (!APP_ID || !SERVER_URL) {
    console.error("❌ Missing credentials in .env");
    process.exit(1);
}

// Initialize Parse
Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = SERVER_URL;

const usersToCreate = [
    { name: 'Ibrahima Djigo', email: 'sydjigo@yahoo.fr' },
    { name: 'Amadou Hanne', email: 'amadouhanne490@gmail.com' },
    { name: 'Bassirou Hamedine Sy', email: 'sybassbana1@gmail.com' }
];

const commonPassword = 'my@dmin';
const role = 'super_admin';

async function createSuperAdmins() {
    console.log('--- Creating Super Admin Accounts ---');

    for (const userData of usersToCreate) {
        try {
            console.log(`Processing: ${userData.name} (${userData.email})`);

            const user = new Parse.User();
            user.set("username", userData.email); // Use email as username to ensure uniqueness/login by email
            user.set("password", commonPassword);
            user.set("email", userData.email);
            user.set("fullName", userData.name);
            user.set("full_name", userData.name);
            user.set("role", role);

            try {
                await user.signUp();
                console.log(`  ✅ Created successfully.`);
            } catch (error) {
                if (error.code === 202 || error.code === 203) {
                    console.log(`  ⚠️ User already exists. Cannot update details without Master Key.`);
                } else {
                    throw error;
                }
            }

        } catch (error) {
            console.error(`  ❌ Error processing ${userData.name}:`, error.message);
        }
    }

    console.log('--- Finished ---');
}

createSuperAdmins();
