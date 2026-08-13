import { useTasks } from "../context/TaskContext"
import { formatUpcomingDate, daysUntil } from "../utils/dateUtils"

function UpcomingTasks() {

    const { tasks } = useTasks()

    const upcomingTasks = tasks
        .filter((task) => !task.completed)
        .sort(
            (a, b) =>
                new Date(a.dueDate).getTime() -
                new Date(b.dueDate).getTime()
        )

    return (
        <section
            className="upcoming"
            id="upcoming"
        >

            <div className="upcoming-header">

                <div>
                    <span className="planner-label">
                        UPCOMING
                    </span>

                    <h2>
                        Further ahead.
                    </h2>

                    <p>
                        Keep an eye on what's coming.
                    </p>
                </div>

            </div>


            <div className="upcoming-list">

                {upcomingTasks.map((task) => (

                    <div
                        className="upcoming-task"
                        key={task.id}
                    >

                        <div className="upcoming-date">

                            <strong>
                                {formatUpcomingDate(task.dueDate)}
                            </strong>

                            <span>
                                {daysUntil(task.dueDate)}
                            </span>

                        </div>


                        <div className="upcoming-divider" />


                        <div className="upcoming-info">

                            <span>
                                {task.subject}
                            </span>

                            <strong>
                                {task.title}
                            </strong>

                        </div>


                        <div className="upcoming-time">

                            {task.estimatedMinutes} min

                        </div>

                    </div>

                ))}

            </div>

        </section>
    )
}

export default UpcomingTasks