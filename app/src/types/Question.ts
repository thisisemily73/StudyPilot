export type Question = {
    id: string
    subjectId: string
    topic: string
    difficulty: 1 | 2 | 3 | 4 | 5

    question: string

    options: string[]

    correctAnswer: number

    explanation: string
}