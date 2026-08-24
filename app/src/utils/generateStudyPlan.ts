import type { Task } from "../types/Task"

export type StudyPlanItem = {
    task: Task
    reason: string
    priority: "high" | "medium" | "low"
}

export function generateStudyPlan(
    tasks: Task[],
    maxMinutes = 120
): StudyPlanItem[] {

    const now = new Date()

    const today =
        `${now.getFullYear()}-` +
        `${String(now.getMonth() + 1).padStart(2, "0")}-` +
        `${String(now.getDate()).padStart(2, "0")}`


    const incompleteTasks =
        tasks.filter(
            (task) => !task.completed
        )


    const scoredTasks =
        incompleteTasks.map((task) => {

            const daysUntilDue =
                Math.round(
                    (
                        parseLocalDate(
                            task.dueDate
                        ).getTime()
                        -
                        parseLocalDate(
                            today
                        ).getTime()
                    )
                    /
                    (1000 * 60 * 60 * 24)
                )


            /*
             * SCORE
             */

            let score = 0


            /*
             * DUE DATE
             */

            if (daysUntilDue < 0) {

                score += 130

            } else if (daysUntilDue === 0) {

                score += 110

            } else if (daysUntilDue === 1) {

                score += 85

            } else if (daysUntilDue <= 3) {

                score += 50

            } else {

                score += 10
            }


            /*
             * ASSESSMENTS
             */

            if (
                task.type === "assessment"
            ) {

                score += 30
            }


            /*
             * DUE TIME
             */

            if (
                task.dueTime &&
                daysUntilDue <= 1
            ) {

                const [
                    hours,
                    minutes,
                ] =
                    task.dueTime
                        .split(":")
                        .map(Number)


                score +=
                    Math.max(
                        0,
                        20 -
                        (
                            hours * 60 +
                            minutes
                        ) / 60
                    )
            }


            /*
             * LONGER TASKS
             */

            score += Math.min(
                task.estimatedMinutes / 10,
                20
            )


            return {
                task,
                score,
                daysUntilDue,
            }
        })


    /*
     * HIGHEST PRIORITY FIRST
     */

    scoredTasks.sort(
        (a, b) =>
            b.score - a.score
    )


    const plan: StudyPlanItem[] = []

    let totalMinutes = 0


    /*
     * BUILD PLAN
     */

    for (
        const item of scoredTasks
    ) {

        if (
            totalMinutes +
            item.task.estimatedMinutes >
            maxMinutes
        ) {
            continue
        }


        let priority:
            StudyPlanItem["priority"]

        let reason: string


        /*
         * PRIORITY / REASON
         */

        if (
            item.daysUntilDue < 0
        ) {

            priority = "high"
            reason = "Overdue"

        } else if (
            item.daysUntilDue === 0
        ) {

            priority = "high"
            reason = "Due today"

        } else if (
            item.daysUntilDue === 1
        ) {

            priority = "high"
            reason = "Due tomorrow"

        } else if (
            item.task.type === "assessment"
        ) {

            priority = "medium"

            reason =
                item.task.assessmentType
                    ? `${capitalize(
                        item.task.assessmentType
                    )} coming up`
                    : "Assessment coming up"

        } else if (
            item.daysUntilDue <= 3
        ) {

            priority = "medium"

            reason =
                `Due in ${item.daysUntilDue} days`

        } else {

            priority = "low"
            reason = "Coming up"
        }


        plan.push({
            task: item.task,
            priority,
            reason,
        })


        totalMinutes +=
            item.task.estimatedMinutes


        if (
            totalMinutes >= maxMinutes
        ) {
            break
        }
    }


    return plan
}


/*
 * Parse YYYY-MM-DD as a LOCAL date.
 *
 * JavaScript otherwise treats
 * "YYYY-MM-DD" as UTC, which can
 * shift the date backward depending
 * on the user's timezone.
 */

function parseLocalDate(
    dateString: string
) {

    const [
        year,
        month,
        day,
    ] =
        dateString
            .split("-")
            .map(Number)


    return new Date(
        year,
        month - 1,
        day
    )
}


function capitalize(
    value: string
) {

    return (
        value.charAt(0).toUpperCase()
        +
        value.slice(1)
    )
}