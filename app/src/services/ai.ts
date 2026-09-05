import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function generateQuestion() {
    const prompt = `
You are StudyPilot's adaptive learning engine.

Generate one high-quality practice question for a high-school student.

The question should:
- test understanding rather than memorization when possible
- have one clearly correct answer
- be appropriate for the student's course and difficulty
- never refer to itself as AI
- avoid repeating common generic questions

Return ONLY the question.
`;

    const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "openai/gpt-oss-120b", // Updated active model ID
    });

    return completion.choices[0]?.message?.content || "";
}