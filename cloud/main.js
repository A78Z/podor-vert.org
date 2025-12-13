Parse.Cloud.define("sendQuizResults", async (request) => {
    const { email, score, total, results } = request.params;

    if (!email) {
        throw new Parse.Error(400, "Email is required.");
    }

    // Example using a generic mailer (replace with your actual provider logic, e.g., SendGrid, Mailgun, or Parse Mail Adapter)
    console.log(`📧 Sending Quiz Results to ${email}...`);
    console.log(`Score: ${score}/${total}`);

    // Construct Email Body
    let emailBody = `<h1>Résultats du Quiz CO2</h1>`;
    emailBody += `<p>Merci d'avoir participé ! Voici vos résultats :</p>`;
    emailBody += `<h2>Score: ${score} / ${total}</h2>`;
    emailBody += `<ul>`;

    results.forEach(r => {
        const color = r.isCorrect ? 'green' : 'red';
        emailBody += `<li style="color: ${color}">`;
        emailBody += `<strong>${r.question}</strong><br/>`;
        emailBody += `Votre réponse: ${r.answer} ${r.isCorrect ? '✅' : '❌'}<br/>`;
        emailBody += `</li>`;
    });
    emailBody += `</ul>`;

    // Simulate sending email (In production, use Parse.Cloud.sendEmail or a 3rd party API)
    // await Parse.Cloud.sendEmail({
    //   to: email,
    //   subject: "Vos résultats - Quiz CO2 Podor Vert",
    //   html: emailBody
    // });

    return "Email sent successfully (simulated)";
});
