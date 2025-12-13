import ParseImport from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = import.meta.env.VITE_PARSE_APPLICATION_ID;
const PARSE_JAVASCRIPT_KEY = import.meta.env.VITE_PARSE_JAVASCRIPT_KEY;
const PARSE_SERVER_URL = import.meta.env.VITE_PARSE_SERVER_URL;

// @ts-ignore
const Parse = (ParseImport.User) ? ParseImport : (window.Parse || ParseImport);

if (!PARSE_APPLICATION_ID || !PARSE_JAVASCRIPT_KEY || !PARSE_SERVER_URL) {
    console.error('❌ Parse configuration missing in environment variables');
} else {
    try {
        if (typeof Parse.initialize === 'function') {
            Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
            Parse.serverURL = PARSE_SERVER_URL;
            console.log('✅ Parse Initialized Successfully');

            // Safe check for User
            if (!Parse.User) {
                console.error('❌ Parse.User is undefined. This will cause authentication errors.');
            }
        } else {
            console.error('❌ Parse.initialize is not a function.', Parse);
        }
    } catch (e) {
        console.error('❌ Error initializing Parse:', e);
    }
}

export { Parse };
