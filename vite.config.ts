import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { Resend } from 'resend';

// Helper to parse body (Vite middlewares don't include body-parser)
const parseBody = async (req) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
  });
};

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'configure-server',
        configureServer(server) {
          server.middlewares.use('/api/quiz/send-email', async (req, res, next) => {
            if (req.method === 'POST') {
              try {
                const body = await parseBody(req);
                const { email, score, total, results } = body;

                if (!env.RESEND_API_KEY) {
                  console.error('Missing RESEND_API_KEY');
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Server misconfiguration: Missing API Key' }));
                  return;
                }

                const resend = new Resend(env.RESEND_API_KEY);

                const { data, error } = await resend.emails.send({
                  from: 'Podor Vert <onboarding@resend.dev>',
                  to: [email],
                  subject: 'Vos résultats - Quiz CO2 Podor Vert',
                  html: `
                    <h1>Résultats du Quiz CO2</h1>
                    <p>Merci d'avoir participé ! Voici vos résultats :</p>
                    <h2>Score: ${score} / ${total}</h2>
                    <ul>
                      ${results.map(r => {
                    const color = r.isCorrect ? 'green' : 'red';
                    return `<li style="color: ${color}">
                            <strong>${r.question}</strong><br/>
                            Votre réponse: ${r.answer} ${r.isCorrect ? '✅' : '❌'}<br/>
                        </li>`;
                  }).join('')}
                    </ul>
                    <p>À bientôt sur Podor Vert !</p>
                  `,
                });

                if (error) {
                  console.error('Resend error:', error);
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error }));
                  return;
                }

                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, data }));
              } catch (err) {
                console.error('Server error handling email:', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
              }
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
