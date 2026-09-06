import Groq from "groq-sdk"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export default async function handler(req: Request) {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ error: "Method not allowed" }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    }

    try {
        const { subject } = await req.json()

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content:
                        "You are StudyPilot's adaptive learning engine. Generate high-quality practice questions for high-school students. Test understanding rather than memorization when possible.",
                },
                {
                    role: "user",
                    content: `Generate one practice question for ${subject || "general academics"}. Return only the question.`,
                },
            ],
        })

        const question =
            completion.choices[0]?.message?.content || ""

        return new Response(
            JSON.stringify({ question }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    } catch (error) {
        console.error(error)

        return new Response(
            JSON.stringify({
                error: "Failed to generate question",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    }
}