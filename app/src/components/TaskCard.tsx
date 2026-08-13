import type { Task } from "../types/Task"

type TaskCardProps = {
    task: Task
    onToggle: () => void
    onEdit: () => void
}

function TaskCard({
    task,
    onToggle,
    onEdit,
}: TaskCardProps) {

    return (
        <div
            className={`planner-task ${task.completed ? "completed" : ""}`}
            onClick={onToggle}
        >

            <div className="planner-task-header">

                <div className="planner-task-info">

                    <span>
                        {task.subject}
                    </span>

                    <strong>
                        {task.title}
                    </strong>

                </div>


                <small>
                    {task.estimatedMinutes} min
                </small>

                <button
                    type="button"
                    className="task-edit-button"
                    onClick={(event) => {
                        event.stopPropagation()
                        onEdit()
                    }}
                    aria-label={`Edit ${task.title}`}
                >
                    Edit
                </button>

            </div>


        </div>
    )
}

export default TaskCard