import type { Task } from "../types/Task"

export type ReviewItem = {
    task: Task
    daysAgo: number
}


export function getTodaysReview(
    tasks: Task[],
    today = new Date()
): ReviewItem[] {

    const todayKey =
        today.toISOString().split("T")[0]

    const todayTime =
        new Date(todayKey).getTime()


    const completedTasks = tasks
        .filter((task) => task.completed)
        .map((task) => {

            const completedDate =
                new Date(task.dueDate)

            const completedTime =
                completedDate.getTime()

            const daysAgo =
                Math.floor(
                    (todayTime - completedTime) /
                    (1000 * 60 * 60 * 24)
                )

            return {
                task,
                daysAgo,
            }
        })
        .filter(
            (item) =>
                item.daysAgo >= 1 &&
                item.daysAgo <= 7
        )


    return completedTasks
        .sort(
            (a, b) =>
                b.daysAgo - a.daysAgo
        )
        .slice(0, 3)
}