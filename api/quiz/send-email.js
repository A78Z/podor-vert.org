import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // CORS configuration if needed, though usually same-origin on Vercel
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, score, total, results } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Podor Vert <onboarding@resend.dev>', // Users must verify domain to use custom From
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
            return res.status(400).json({ error });
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
