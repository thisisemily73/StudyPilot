import { generateStudyPlan } from "../utils/generateStudyPlan"

type StudyPlanProps = {
  tasks: {
    id: string
    title: string
    subject: string
    dueDate: string
    estimatedMinutes: number
    completed: boolean
  }[]
}

function StudyPlan({ tasks }: StudyPlanProps) {
  const plan = generateStudyPlan(tasks)

  if (plan.length === 0) {
    return (
      <div className="study-plan-empty">
        <strong>Your runway is clear.</strong>
        <span>No unfinished tasks need your attention right now.</span>
      </div>
    )
  }

  return (
    <div className="study-plan">
      {plan.map((item) => (
        <div className="study-plan-item" key={item.task.id}>
          <div className="study-plan-time">
            {item.task.estimatedMinutes} min
          </div>

          <div className="study-plan-content">
            <span className="task-subject">{item.task.subject}</span>
            <h3>{item.task.title}</h3>
            <span className="study-plan-reason">{item.reason}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StudyPlan