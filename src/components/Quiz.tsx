import React, { useState } from "react";
import { Parse } from '../lib/parseClient';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    question: "Quelle est la principale source de CO2 dans le monde ?",
    options: ["Transport", "Agriculture", "Industrie", "Forêts"],
    answer: "Transport",
  },
  {
    question: "Combien d'eau un arbre peut-il absorber par jour ?",
    options: ["10 litres", "50 litres", "100 litres", "200 litres"],
    answer: "50 litres",
  },
  {
    question: "Quel gaz est le plus responsable du réchauffement climatique ?",
    options: ["Oxygène", "Méthane", "CO2", "Azote"],
    answer: "CO2",
  },
  {
    question: "Planter un arbre contribue à :",
    options: ["Réduire CO2", "Polluer plus", "Réchauffer la planète", "Aucune"],
    answer: "Réduire CO2",
  },
];

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [answers, setAnswers] = useState<any[]>([]);

  const finishQuiz = async (finalScore: number, finalAnswers: any[]) => {
    if (!userEmail) return;

    // 1. Save to Back4App (Batch)
    try {
      const objects = finalAnswers.map(a => {
        const obj = new Parse.Object('QuizResponse');
        obj.set('question', a.question);
        obj.set('answer', a.answer);
        obj.set('is_correct', a.isCorrect);
        obj.set('user_email', userEmail);
        obj.set('score', finalScore); // Saving score in each row as requested
        return obj;
      });
      await Parse.Object.saveAll(objects);
      console.log('✅ Quiz responses saved');

      // 2. Send Email via Vercel API
      const responseApi = await fetch('/api/quiz/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          score: finalScore,
          total: questions.length,
          results: finalAnswers
        })
      });

      if (responseApi.ok) {
        alert(`Résultats envoyés à ${userEmail} ! 📧`);
      } else {
        console.warn('Email sending failed but score saved');
      }

    } catch (error) {
      console.error('Error finishing quiz:', error);
    }
  };

  const handleAnswer = async (option: string) => {
    const isCorrect = option === questions[current].answer;
    const newScore = isCorrect ? score + 1 : score;
    const newAnswers = [...answers, {
      question: questions[current].question,
      answer: option,
      isCorrect
    }];

    setScore(newScore);
    setAnswers(newAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
      // Trigger finish if email is present
      if (userEmail) {
        await finishQuiz(newScore, newAnswers);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {!showScore ? (
        <>
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            Question {current + 1} / {questions.length}
          </h3>
          <p className="text-gray-700 mb-6">{questions[current].question}</p>
          <div className="grid gap-4">
            {questions[current].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
              >
                {opt}
              </button>
            ))}
          </div>
          {current === 0 && (
            <div className="mt-6">
              <label className="block text-sm text-gray-600 mb-2">
                Email (optionnel pour suivre vos résultats)
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Quiz terminé ! 🎉</h2>
          <p className="text-gray-700 mb-6">
            Votre score : <span className="font-bold text-green-700">{score}</span> / {questions.length}
          </p>
          <p className="text-green-700 text-lg animate-bounce">🌱 Vous contribuez à la planète !</p>
          <button
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setAnswers([]);
              setShowScore(false);
              setUserEmail("");
            }}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
