export type StudyPlanItem = {
  task: {
    id: string
    title: string
    subject: string
    dueDate: string
    estimatedMinutes: number
    completed: boolean
  }
  reason: string
  priority: "high" | "medium" | "low"
}

export function generateStudyPlan(
  tasks: StudyPlanItem["task"][],
  maxMinutes = 120
): StudyPlanItem[] {
  const today = new Date()
    .toISOString()
    .split("T")[0]

  const incompleteTasks = tasks.filter(
    (task) => !task.completed
  )

  const scoredTasks = incompleteTasks.map((task) => {
    const daysUntilDue =
      Math.ceil(
        (new Date(task.dueDate).getTime() -
          new Date(today).getTime()) /
          (1000 * 60 * 60 * 24)
      )

    let score = 0

    // Due today = highest priority
    if (daysUntilDue === 0) {
      score += 100
    } else if (daysUntilDue === 1) {
      score += 70
    } else if (daysUntilDue <= 3) {
      score += 40
    } else {
      score += 10
    }

    // Longer tasks get a small boost
    score += Math.min(task.estimatedMinutes / 10, 20)

    return {
      task,
      score,
      daysUntilDue,
    }
  })

  scoredTasks.sort(
    (a, b) => b.score - a.score
  )

  const plan: StudyPlanItem[] = []
  let totalMinutes = 0

  for (const item of scoredTasks) {
    if (
      totalMinutes + item.task.estimatedMinutes >
      maxMinutes
    ) {
      continue
    }

    let priority: StudyPlanItem["priority"]
    let reason: string

    if (item.daysUntilDue === 0) {
      priority = "high"
      reason = "Due today"
    } else if (item.daysUntilDue === 1) {
      priority = "high"
      reason = "Due tomorrow"
    } else if (item.daysUntilDue <= 3) {
      priority = "medium"
      reason = `Due in ${item.daysUntilDue} days`
    } else {
      priority = "low"
      reason = "Coming up"
    }

    plan.push({
      task: item.task,
      priority,
      reason,
    })

    totalMinutes += item.task.estimatedMinutes

    if (totalMinutes >= maxMinutes) {
      break
    }
  }

  return plan
}